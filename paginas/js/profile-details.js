(() => {
  const form = document.getElementById("profile-details-form");
  const fields = document.getElementById("profile-details-fields");
  const phone = document.getElementById("profile-phone");
  const region = document.getElementById("profile-region");
  const participation = document.getElementById("profile-participation");
  const status = document.getElementById("profile-details-status");
  const cancel = document.getElementById("profile-details-cancel");
  let generation = 0;
  let loadedUid = null;
  let busy = false;
  let saved = { phone: "", region: "", participation: "" };
  function restore() {
    phone.value = saved.phone;
    region.value = saved.region;
    participation.value = saved.participation;
  }
  function current(version, uid) {
    return version === generation && firebase.auth().currentUser?.uid === uid;
  }
  function errorText(error) {
    if (error.code === "permission-denied") return "Sem permissão para acessar seus dados. Confira as regras de userProfiles no Firestore.";
    if (error.code === "resource-exhausted") return "O limite de uso do Firestore foi atingido. Tente novamente mais tarde.";
    return "Não foi possível concluir. Verifique sua conexão e tente novamente.";
  }
  firebase.auth().onAuthStateChanged(async user => {
    const version = ++generation;
    loadedUid = null;
    busy = false;
    fields.disabled = true;
    saved = { phone: "", region: "", participation: "" };
    restore();
    form.setAttribute("aria-busy", "false");
    status.textContent = user ? "Carregando seus dados..." : "Entre na sua conta para editar o perfil.";
    if (!user) return;
    try {
      const snapshot = await firebase.firestore().collection("userProfiles").doc(user.uid).get({ source: "server" });
      if (!current(version, user.uid)) return;
      const data = snapshot.exists ? snapshot.data() : {};
      saved = {
        phone: typeof data.phone === "string" ? data.phone : "",
        region: typeof data.region === "string" ? data.region : "",
        participation: typeof data.participation === "string" ? data.participation : ""
      };
      restore();
      loadedUid = user.uid;
      fields.disabled = false;
      status.textContent = "";
    } catch (error) {
      if (current(version, user.uid)) status.textContent = errorText(error) + " Recarregue a página para carregar os dados antes de editar.";
    }
  });
  cancel.addEventListener("click", () => {
    if (busy || !loadedUid) return;
    restore();
    status.textContent = "Alterações descartadas.";
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    if (busy || !user || user.uid !== loadedUid) return;
    const data = { phone: phone.value.trim(), region: region.value.trim(), participation: participation.value.trim() };
    const digits = data.phone.replace(/\D/g, "");
    if (data.phone.length > 30 || (data.phone && (!/^[\d+().\s-]+$/.test(data.phone) || digits.length < 7 || digits.length > 15))) {
      status.textContent = "Informe um telefone válido com DDD, ou deixe o campo vazio.";
      phone.focus();
      return;
    }
    if (data.region.length > 100 || data.participation.length > 80) {
      status.textContent = "Use até 100 caracteres na região e 80 na participação.";
      return;
    }
    const version = generation;
    busy = true;
    fields.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.textContent = "Salvando seus dados...";
    try {
      await firebase.firestore().collection("userProfiles").doc(user.uid).set({
        ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      if (!current(version, user.uid)) return;
      saved = data;
      restore();
      status.textContent = "Dados salvos na sua conta.";
    } catch (error) {
      if (current(version, user.uid)) status.textContent = errorText(error) + " Suas alterações foram mantidas para tentar novamente.";
    } finally {
      if (current(version, user.uid)) {
        busy = false;
        fields.disabled = false;
        form.setAttribute("aria-busy", "false");
      }
    }
  });
})();
