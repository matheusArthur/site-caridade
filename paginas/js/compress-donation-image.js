function compressDonationImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Não foi possível ler a foto. Selecione novamente."));
    reader.onload = () => {
      const picture = new Image();
      picture.onerror = () => reject(new Error("O arquivo não é uma imagem válida. Escolha outra foto."));
      picture.onload = () => {
        try {
          if (!picture.naturalWidth || !picture.naturalHeight) throw new Error("Imagem inválida.");
          const scale = Math.min(1, 800 / Math.max(picture.naturalWidth, picture.naturalHeight));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(picture.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(picture.naturalHeight * scale));
          const context = canvas.getContext("2d");
          if (!context) throw new Error("Seu navegador não conseguiu preparar a imagem.");
          context.fillStyle = "#fff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(picture, 0, 0, canvas.width, canvas.height);
          for (const quality of [0.85, 0.75, 0.65, 0.55, 0.45]) {
            const result = canvas.toDataURL("image/jpeg", quality);
            if (/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(result) && result.length <= 600000) {
              resolve(result);
              return;
            }
          }
          throw new Error("A foto ficou grande demais. Escolha uma imagem mais leve.");
        } catch (error) { reject(error); }
      };
      picture.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
