const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'../paginas');let count=0;
async function test(name,fn){await fn();console.log('PASS '+name);count++;}
function context(file){const elements={};const get=id=>elements[id]??={value:'',style:{},disabled:true};const c=vm.createContext({document:{getElementById:get},firebase:{auth:()=>({onAuthStateChanged:()=>{}})},window:{location:{}},console});vm.runInContext(fs.readFileSync(path.join(root,'js/validations.js'),'utf8'),c);vm.runInContext(fs.readFileSync(path.join(root,'js',file),'utf8'),c);return {c,get};}
(async()=>{
 const c=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(root,'js/validations.js'),'utf8'),c);
 for(const value of ['', 'a', 'a@b', 'a b@c.com', 'x@y.com lixo', 'a@@b.com'])await test('Rejeita email: '+JSON.stringify(value),()=>assert.equal(c.validateEmail(value),false));
 await test('Aceita email válido',()=>assert.equal(c.validateEmail('nome+teste@example.com'),true));
 const r=context('register.js');r.get('email').value='teste@example.com';r.get('password').value='12345';r.get('confirmPassword').value='12345';
 await test('Cadastro rejeita senha curta',()=>assert.equal(r.c.isFormValid(),false));
 r.get('password').value='123456';await test('Cadastro rejeita confirmação divergente',()=>assert.equal(r.c.isFormValid(),false));
 r.get('confirmPassword').value='123456';await test('Cadastro aceita campos válidos',()=>assert.equal(r.c.isFormValid(),true));
 await test('Cadastro habilita botão após validação',()=>{r.c.toggleRegisterButtonDisable();assert.equal(r.get('register-button').disabled,false)});
 const donation=fs.readFileSync(path.join(root,'html/doacao.html'),'utf8').match(/<script>\s*([\s\S]*?)<\/script>/)[1];
 async function donationCase(fail){let calls=0,handler,reset=false;const button={disabled:false};const nodes={formProduto:{addEventListener:(e,fn)=>handler=fn,querySelector:()=>button,reset:()=>reset=true},status:{textContent:''},produtos:{innerHTML:'',textContent:''}};for(const id of ['titulo','descricao','categoria','imagem','regiao','valor'])nodes[id]={value: id==='valor'?'0':' teste '};const ctx=vm.createContext({document:{getElementById:id=>nodes[id],querySelectorAll:()=>[]},firebase:{firestore:()=>({collection:()=>({add:data=>{calls++;assert.equal(data.titulo,'teste');return fail?Promise.reject(new Error('offline')):Promise.resolve()},get:()=>Promise.resolve({empty:true})})})},window:{},setTimeout:()=>{},Date});vm.runInContext(donation,ctx);handler({preventDefault(){}});handler({preventDefault(){}});assert.equal(button.disabled,true);await new Promise(resolve=>setImmediate(resolve));assert.equal(calls,1);assert.equal(button.disabled,false);assert.equal(reset,!fail);assert.match(nodes.status.textContent,fail?/Não foi possível salvar/:/sucesso/);}
 await test('Doação salva, informa sucesso e impede duplicidade (Firebase simulado)',()=>donationCase(false));
 await test('Doação preserva dados e permite nova tentativa após falha (Firebase simulado)',()=>donationCase(true));
 await test('Sintaxe de todos os scripts locais e embutidos',()=>{for(const f of fs.readdirSync(path.join(root,'js')))if(f.endsWith('.js'))new vm.Script(fs.readFileSync(path.join(root,'js',f),'utf8'));for(const f of fs.readdirSync(path.join(root,'html')))if(f.endsWith('.html'))for(const m of fs.readFileSync(path.join(root,'html',f),'utf8').matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);});
 await test('Links e recursos HTML locais existem',()=>{for(const f of fs.readdirSync(path.join(root,'html')))if(f.endsWith('.html'))for(const m of fs.readFileSync(path.join(root,'html',f),'utf8').matchAll(/(?:href|src)="([^"]+)"/g)){const url=m[1];if(/^(https?:|#|\$|data:|mailto:|tel:)/.test(url)||url.includes('${'))continue;assert.ok(fs.existsSync(path.resolve(root,'html',url.split(/[?#]/)[0])),f+': '+url);}});
 console.log(`\n${count} testes aprovados. Testes simulados não validam permissões ou gravações reais no Firebase.`);
})().catch(e=>{console.error(e);process.exitCode=1});
