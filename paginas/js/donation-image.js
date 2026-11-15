(() => {
  const fileInput = document.getElementById("imagemArquivo");
  const urlInput = document.getElementById("imagem");
  const preview = document.getElementById("imagemPrevia");
  const status = document.getElementById("imagemStatus");
  const remove = document.getElementById("removerImagem");
  let version = 0;
  let pending = Promise.resolve(null);
  let selected = false;
  function clear() {
    version++;
    selected = false;
    pending = Promise.resolve(null);
    fileInput.value = "";
    urlInput.disabled = false;
    preview.removeAttribute("src");
    preview.hidden = true;
    remove.hidden = true;
    status.textContent = "";
  }
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) { clear(); return; }
    const current = ++version;
    selected = true;
    urlInput.disabled = true;
    preview.hidden = true;
    remove.hidden = false;
    status.textContent = "Preparando imagem...";
    pending = (async () => {
      try {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || !file.size || file.size > 10 * 1024 * 1024) {
          throw new Error("Escolha JPG, PNG ou WebP de até 10 MB.");
        }
        const data = await compressDonationImage(file);
        if (current !== version) return null;
        preview.src = data;
        preview.hidden = false;
        status.textContent = "Imagem pronta. Ela será salva ao cadastrar a doação.";
        return { data };
      } catch (error) {
        if (current !== version) return null;
        status.textContent = error.message;
        return { error: error.message };
      }
    })();
  });
  remove.addEventListener("click", clear);
  window.donationImage = {
    clear,
    async getValue() {
      if (selected) {
        const current = version;
        const result = await pending;
        if (current !== version || !result) throw new Error("A imagem mudou durante o envio. Confira a seleção e tente novamente.");
        if (result.error) throw new Error(result.error);
        return result.data;
      }
      const raw = urlInput.value.trim();
      try {
        const url = new URL(raw);
        if (!["http:", "https:"].includes(url.protocol)) throw new Error();
        return url.href;
      } catch { throw new Error("Selecione uma foto ou informe uma URL válida da imagem."); }
    }
  };
})();
