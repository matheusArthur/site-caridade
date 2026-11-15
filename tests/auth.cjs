const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const root=require('path').resolve(__dirname,'../paginas/js')+'/';
let total=0;
async function test(name,fn){await fn();total++;console.log('PASS '+name)}
function setup(file='index.js'){
 const elements={},get=id=>elements[id]??={value:'',disabled:false,style:{},addEventListener(){}};
 const calls=[],alerts=[];let resolve,reject,observer;
 const auth={onAuthStateChanged(fn){observer=fn},signInWithEmailAndPassword(...args){calls.push(['login',...args]);return new Promise((a,b)=>{resolve=a;reject=b})},sendPasswordResetEmail(email){calls.push(['reset',email]);return new Promise((a,b)=>{resolve=a;reject=b})},createUserWithEmailAndPassword(...args){calls.push(['register',...args]);return new Promise((a,b)=>{resolve=a;reject=b})}};
 const c=vm.createContext({window:{location:{},addEventListener(){}},document:{getElementById:get},firebase:{apps:[{}],auth:()=>auth},console,alert:m=>alerts.push(m),showLoading(){},hideLoading(){}});c.window.firebase=c.firebase;
 vm.runInContext(fs.readFileSync(root+'validations.js','utf8'),c);vm.runInContext(fs.readFileSync(root+file,'utf8'),c);
 return {c,get,calls,alerts,resolve:()=>resolve(),reject:code=>reject({code}),observer:user=>observer(user)};
}
const flush=()=>new Promise(setImmediate);
(async()=>{
 await test('Login inválido não chama Firebase',async()=>{const x=setup();await x.c.login();assert.equal(x.calls.length,0)});
 await test('Login normaliza e-mail, preserva senha e impede envio duplicado',async()=>{const x=setup();x.get('email').value=' teste@example.com ';x.get('password').value=' senha ';const p=x.c.login();x.c.login();await flush();assert.deepEqual(x.calls,[['login','teste@example.com',' senha ']]);assert.equal(x.get('login-button').disabled,true);x.resolve();await p;assert.equal(x.c.window.location.href,'../html/home.html');assert.equal(x.get('login-button').disabled,false)});
 for(const code of ['auth/invalid-credential','auth/network-request-failed','auth/too-many-requests'])await test('Falha permite nova tentativa: '+code,async()=>{const x=setup();x.get('email').value='teste@example.com';x.get('password').value='senha';const p=x.c.login();await flush();x.reject(code);await p;assert.equal(x.alerts.length,1);assert.equal(x.get('login-button').disabled,false);assert.equal(x.c.window.location.href,undefined)});
 await test('Conta restaurada redireciona à Home',async()=>{const x=setup();await flush();x.observer({uid:'teste'});assert.equal(x.c.window.location.href,'../html/home.html')});
 await test('Recuperação bloqueia endereço inválido',()=>{const x=setup();x.get('email').value='invalido';x.c.recoverPassword();assert.equal(x.calls.length,0)});
 await test('Recuperação normaliza e-mail e impede requisições repetidas',async()=>{const x=setup();x.get('email').value=' teste@example.com ';const p=x.c.recoverPassword();x.c.recoverPassword();await flush();assert.deepEqual(x.calls,[['reset','teste@example.com']]);x.resolve();await p;assert.match(x.alerts[0],/Se houver uma conta/);assert.equal(x.get('recover-password-button').disabled,false)});
 await test('Recuperação após erro libera nova tentativa',async()=>{const x=setup();x.get('email').value='teste@example.com';const p=x.c.recoverPassword();await flush();x.reject('auth/network-request-failed');await p;assert.equal(x.get('recover-password-button').disabled,false)});
 await test('Campo vazio mostra apenas erro obrigatório',()=>{const x=setup();x.c.toggleEmailErrors();assert.equal(x.get('email-required-error').style.display,'block');assert.equal(x.get('email-invalid-error').style.display,'none')});
 await test('Cadastro impede duplicidade e permite tentar após falha',async()=>{const x=setup('register.js');x.get('email').value=' teste@example.com ';x.get('password').value=x.get('confirmPassword').value='123456';const p=x.c.register();x.c.register();assert.deepEqual(x.calls,[['register','teste@example.com','123456']]);x.reject('auth/network-request-failed');await p;assert.equal(x.get('register-button').disabled,false)});
 console.log(total+' testes de autenticação aprovados com Firebase simulado.');
})().catch(e=>{console.error(e);process.exitCode=1});
