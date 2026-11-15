const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const script=fs.readFileSync(path.resolve(__dirname,'../paginas/html/doacao.html'),'utf8').match(/<script>\s*([\s\S]*?)<\/script>/)[1];
function setup(){
 let handler,observer;const writes=[];const auth={currentUser:null,onAuthStateChanged:fn=>observer=fn};
 const button={disabled:false};const status={textContent:''};let reset=false;
 const nodes={formProduto:{addEventListener:(e,fn)=>handler=fn,querySelector:()=>button,reset:()=>reset=true},status,produtos:{innerHTML:''}};
 for(const id of ['titulo','descricao','categoria','imagem','regiao','valor'])nodes[id]={value:id==='valor'?'':'teste'};
 vm.runInNewContext(script,{document:{getElementById:id=>nodes[id],querySelectorAll:()=>[]},firebase:{auth:()=>auth,firestore:()=>({collection:()=>({get:async()=>({empty:true}),add:async data=>writes.push(data)})})},window:{},Date,setTimeout(){}});
 return {button,status,writes,submit:()=>handler({preventDefault(){}}),restore(user){auth.currentUser=user;observer(user)},reset:()=>reset};
}
(async()=>{
 const x=setup();const pending=x.submit();assert.equal(x.button.disabled,true);assert.match(x.status.textContent,/Confirmando/);assert.equal(x.writes.length,0);await x.submit();x.restore({uid:'doador-real'});await pending;await new Promise(setImmediate);assert.equal(x.writes.length,1);assert.equal(x.writes[0].doadorUid,'doador-real');assert.equal(x.writes[0].valor,'0,00');assert.equal(x.reset(),true);assert.equal(x.button.disabled,false);console.log('PASS Aguarda sessão, impede duplicidade e salva doação gratuita com UID');
 const y=setup();const anonymous=y.submit();y.restore(null);await anonymous;assert.equal(y.writes.length,0);assert.equal(y.reset(),false);assert.equal(y.button.disabled,false);assert.match(y.status.textContent,/seus dados foram mantidos/);console.log('PASS Sessão ausente preserva dados e libera nova tentativa');
})().catch(e=>{console.error(e);process.exitCode=1});
