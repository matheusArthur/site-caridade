const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const script=fs.readFileSync(path.resolve(__dirname,'../paginas/js/profile-donations.js'),'utf8');
let count=0;
async function test(name,fn){await fn();count++;console.log('PASS '+name)}
function setup(){
 const element=tag=>({tag,children:[],handlers:{},textContent:'',replaceChildren(){this.children=[]},appendChild(child){this.children.push(child)},addEventListener(name,fn){this.handlers[name]=fn}});
 const container=element('div');let observer;const reads=[];const state={items:[],fail:false};
 const query = { async get() {
   if(state.delay) await state.delay;
   if(state.fail) throw Error('offline');
   return {forEach:fn=>state.items.forEach(item=>fn({id:item.id,data:()=>item}))};
 }};
 const collection = {where(field,op,uid){reads.push({field,op,uid});return query}};
 const firebase={auth:()=>({onAuthStateChanged:fn=>observer=fn}),firestore:()=>({collection(name){assert.equal(name,'produtos');return collection}})};
 vm.runInNewContext(script,{document:{getElementById:()=>container,createElement:element,baseURI:'http://localhost/html/perfil.html'},firebase,URL,Date});
 return {container,reads,state,login:user=>observer(user)};
}
(async()=>{
 await test('Exibe somente imagens do doador conectado, sem preço ou botão',async()=>{const x=setup();x.state.items=[{id:'a',doadorUid:'A',imagem:'https://example.com/item.jpg',titulo:'Meu item',valor:'999'},{id:'b',doadorUid:'B',imagem:'https://example.com/outro.jpg'}];await x.login({uid:'A'});assert.equal(x.reads[0].field,'doadorUid');assert.equal(x.reads[0].uid,'A');assert.equal(x.container.children.length,1);const card=x.container.children[0];assert.equal(card.children.length,1);assert.equal(card.children[0].tag,'img');assert.equal(card.children[0].alt,'Meu item');assert.doesNotMatch(JSON.stringify(card),/999|button/)});
 await test('Ordena recentes e limita a quatro imagens',async()=>{const x=setup();x.state.items=Array.from({length:6},(_,i)=>({id:String(i),doadorUid:'A',imagem:'https://example.com/'+i,titulo:String(i),criadoEm:{toMillis:()=>i}}));await x.login({uid:'A'});assert.equal(x.container.children.length,4);assert.equal(x.container.children[0].children[0].alt,'5')});
 await test('Sem doações, mostra mensagem sem cartões vazios',async()=>{const x=setup();await x.login({uid:'A'});assert.match(x.container.children[0].textContent,/ainda não tem doações/)});
 await test('Sem login, não consulta produtos e limpa fotos',async()=>{const x=setup();await x.login(null);assert.equal(x.reads.length,0);assert.match(x.container.children[0].textContent,/Entre na sua conta/)});
 await test('Falha de rede aparece sem cartões de exemplo',async()=>{const x=setup();x.state.fail=true;await x.login({uid:'A'});assert.match(x.container.children[0].textContent,/Não foi possível/)});
 await test('URL inválida e foto quebrada exibem aviso',async()=>{const x=setup();x.state.items=[{doadorUid:'A',imagem:'javascript:alert(1)'},{doadorUid:'A',imagem:'https://example.com/foto.jpg'}];await x.login({uid:'A'});assert.match(x.container.children[0].children[0].textContent,/Imagem indisponível/);const card=x.container.children[1];card.children[0].handlers.error();assert.match(card.children[0].textContent,/Imagem indisponível/)});
 await test('Resposta atrasada não restaura fotos depois do logout',async()=>{const x=setup();let release;x.state.delay=new Promise(r=>release=r);x.state.items=[{doadorUid:'A',imagem:'https://example.com/a.jpg'}];const pending=x.login({uid:'A'});await x.login(null);release();await pending;assert.match(x.container.children[0].textContent,/Entre na sua conta/)});
 console.log(count+' testes de histórico aprovados com Firebase simulado.');
})().catch(error=>{console.error(error);process.exitCode=1});
