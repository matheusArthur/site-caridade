const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../paginas');let count=0;
function test(name,fn){fn();count++;console.log('PASS '+name)}
const elements={};let focused;
const tabs=['alimentos','roupas','higiene','tempo'].map(name=>({dataset:{giving:name},id:'tab-'+name,attributes:{},handlers:{},setAttribute(k,v){this.attributes[k]=v},addEventListener(k,f){this.handlers[k]=f},focus(){focused=this.id}}));
const panel={attributes:{},setAttribute(k,v){this.attributes[k]=v}};elements['giving-panel']=panel;
const get=id=>elements[id]??={textContent:'',src:'',href:''};
const context=vm.createContext({document:{querySelectorAll:selector=>selector==='[data-giving]'?tabs:[],getElementById:get},window:{matchMedia:()=>({matches:true})}});
vm.runInContext(fs.readFileSync(path.join(root,'js/home-interactions.js'),'utf8'),context);
test('As quatro opções atualizam foto, texto, ação e estado acessível',()=>{
 for(const tab of tabs){tab.handlers.click();assert.equal(panel.attributes['aria-labelledby'],tab.id);assert.equal(tabs.filter(t=>t.attributes['aria-selected']==='true').length,1);assert.equal(tab.tabIndex,0);assert.ok(get('giving-title').textContent.length>10);assert.ok(fs.existsSync(path.resolve(root,'html',get('giving-photo').src)));assert.equal(get('giving-link').href,tab.dataset.giving==='tempo'?'voluntariado.html':'doacao.html')}
});
function key(tab,key){let prevented=false;tab.handlers.keydown({key,preventDefault(){prevented=true}});return prevented}
test('Seta direita volta à primeira opção após a última',()=>{assert.equal(key(tabs[3],'ArrowRight'),true);assert.equal(focused,'tab-alimentos')});
test('Seta esquerda volta à última opção antes da primeira',()=>{key(tabs[0],'ArrowLeft');assert.equal(focused,'tab-tempo')});
test('Home e End selecionam os extremos; Tab mantém comportamento nativo',()=>{key(tabs[2],'Home');assert.equal(focused,'tab-alimentos');key(tabs[0],'End');assert.equal(focused,'tab-tempo');assert.equal(key(tabs[3],'Tab'),false)});
test('Todas as imagens locais referenciadas em CSS existem',()=>{
 for(const file of fs.readdirSync(path.join(root,'css')))if(file.endsWith('.css'))for(const match of fs.readFileSync(path.join(root,'css',file),'utf8').matchAll(/url\(["']?([^"')]+)["']?\)/g)){const url=match[1];if(/^(?:https?:|data:)/.test(url))continue;assert.ok(fs.existsSync(path.resolve(root,'css',url.split('?')[0])),file+': '+url)}
});
console.log(`\n${count} testes da Home aprovados. Interações verificadas em DOM simulado; sem operações no Firebase.`);
