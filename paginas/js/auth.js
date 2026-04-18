// ../js/auth.js

window.logout = function () {
  firebase.auth().signOut()
    .then(() => {
      console.log("Logout realizado com sucesso");
      // NÃO precisa redirecionar aqui
      // o auth-guard já faz isso automaticamente
    })
    .catch((error) => {
      console.error("Erro ao sair:", error);
      alert("Erro ao sair");
    });
};