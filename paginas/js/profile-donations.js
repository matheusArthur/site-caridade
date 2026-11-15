(() => {
  const container = document.getElementById("itensDoados");
  let generation = 0;
  function notice(text) {
    container.replaceChildren();
    const p = document.createElement("p");
    p.className = "loading";
    p.textContent = text;
    container.appendChild(p);
  }
  const dateValue = value => value && typeof value.toMillis === "function"
    ? value.toMillis() : value instanceof Date ? value.getTime() : 0;
  firebase.auth().onAuthStateChanged(async user => {
    const version = ++generation;
    if (!user) { notice("Entre na sua conta para ver suas doações."); return; }
    notice("Carregando suas doações...");
    try {
      const snapshot = await firebase.firestore().collection("produtos")
        .where("doadorUid", "==", user.uid).get();
      if (version !== generation) return;
      const items = [];
      snapshot.forEach(doc => {
        const item = doc.data();
        if (item.doadorUid === user.uid) items.push({ id: doc.id, ...item });
      });
      items.sort((a, b) => dateValue(b.criadoEm) - dateValue(a.criadoEm));
      if (!items.length) { notice("Você ainda não tem doações vinculadas à sua conta."); return; }
      container.replaceChildren();
      items.slice(0, 4).forEach(item => {
        const card = document.createElement("div");
        card.className = "donated-card";
        const unavailable = () => {
          card.replaceChildren();
          const p = document.createElement("p");
          p.className = "donation-image-unavailable";
          p.textContent = "Imagem indisponível";
          card.appendChild(p);
        };
        try {
          if (!item.imagem || typeof item.imagem !== "string") throw new Error("Sem imagem");
          const embedded = item.imagem.length <= 600000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(item.imagem);
          const url = new URL(item.imagem, document.baseURI);
          if (!embedded && !["http:", "https:"].includes(url.protocol)) throw new Error("URL inválida");
          const img = document.createElement("img");
          img.alt = item.titulo || "Item doado por você";
          img.loading = "lazy";
          img.addEventListener("error", unavailable, { once: true });
          img.src = url.href;
          card.appendChild(img);
        } catch { unavailable(); }
        container.appendChild(card);
      });
    } catch {
      if (version === generation) notice("Não foi possível carregar suas doações. Recarregue a página para tentar novamente.");
    }
  });
})();
