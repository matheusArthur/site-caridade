(() => {
  const input = document.getElementById("inputFoto");
  const image = document.getElementById("fotoPerfil");
  const status = document.getElementById("foto-status");
  const fallback = "../img/avatar-padrao.svg";
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  let activeUid = null;
  let busy = false;
  let generation = 0;
  const validPhoto = value => typeof value === "string" && value.length <= 200000
    && /^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(value);
  const sameSession = (version, uid) => version === generation
    && firebase.auth().currentUser?.uid === uid;
  const message = error => ({
    "permission-denied": "Sem permissão para acessar a foto. Confira as regras do Firestore no Firebase.",
    "unauthenticated": "Sua sessão expirou. Entre novamente.",
    "unavailable": "Sem conexão com o Firebase. Verifique sua internet e tente novamente.",
    "resource-exhausted": "O limite de uso do Firestore foi atingido. Tente novamente mais tarde."
  }[error.code] || "Não foi possível concluir. Confira a conexão e tente novamente.");

  image.addEventListener("error", () => {
    if (image.getAttribute("src") !== fallback) {
      image.src = fallback;
      status.textContent = "Não foi possível exibir a foto. Escolha a imagem novamente.";
    }
  });

  firebase.auth().onAuthStateChanged(async user => {
    const version = ++generation;
    activeUid = user ? user.uid : null;
    busy = false;
    image.src = fallback;
    input.disabled = true;
    input.value = "";
    input.setAttribute("aria-busy", "false");
    status.textContent = "";
    if (!user) return;
    busy = true;
    status.textContent = "Carregando sua foto...";
    try {
      const snapshot = await firebase.firestore().collection("profilePhotos").doc(user.uid).get({ source: "server" });
      if (!sameSession(version, user.uid)) return;
      const photo = snapshot.exists ? snapshot.data().photoData : null;
      if (validPhoto(photo)) image.src = photo;
      status.textContent = photo && !validPhoto(photo) ? "Foto inválida. Selecione uma nova imagem." : "";
    } catch (error) {
      if (sameSession(version, user.uid)) status.textContent = message(error);
    } finally {
      if (sameSession(version, user.uid)) {
        busy = false;
        input.disabled = false;
      }
    }
  });

  input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file || busy) return;
    const user = firebase.auth().currentUser;
    if (!user || user.uid !== activeUid) {
      status.textContent = "Entre na sua conta para salvar a foto.";
      return;
    }
    if (!allowedTypes.includes(file.type) || file.size === 0 || file.size > 5 * 1024 * 1024) {
      status.textContent = "Escolha uma imagem JPG, PNG ou WebP de até 5 MB.";
      input.value = "";
      return;
    }
    const version = ++generation;
    busy = true;
    input.disabled = true;
    input.setAttribute("aria-busy", "true");
    status.textContent = "Preparando e salvando foto na sua conta...";
    try {
      const photoData = await compressProfilePhoto(file);
      if (!sameSession(version, user.uid)) return;
      if (!validPhoto(photoData)) throw new Error("Foto inválida.");
      await firebase.firestore().collection("profilePhotos").doc(user.uid).set({
        photoData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      if (!sameSession(version, user.uid)) return;
      image.src = photoData;
      status.textContent = "Foto salva na sua conta. Ela será carregada nos próximos acessos.";
    } catch (error) {
      if (sameSession(version, user.uid)) status.textContent = message(error);
    } finally {
      if (sameSession(version, user.uid)) {
        busy = false;
        input.disabled = false;
        input.setAttribute("aria-busy", "false");
        input.value = "";
      }
    }
  });
})();
