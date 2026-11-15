// Avatares pequenos para respeitar o limite de tamanho dos documentos Firestore.
function compressProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    reader.onload = () => {
      const picture = new Image();
      picture.onerror = () => reject(new Error("O arquivo não é uma imagem válida."));
      picture.onload = () => {
        try {
          if (!picture.naturalWidth || !picture.naturalHeight) throw new Error("Imagem inválida.");
          const scale = Math.min(1, 256 / Math.max(picture.naturalWidth, picture.naturalHeight));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(picture.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(picture.naturalHeight * scale));
          const context = canvas.getContext("2d");
          if (!context) throw new Error("Seu navegador não conseguiu preparar a foto.");
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(picture, 0, 0, canvas.width, canvas.height);
          for (const quality of [0.8, 0.65, 0.5]) {
            const data = canvas.toDataURL("image/jpeg", quality);
            if (data.startsWith("data:image/jpeg;base64,") && data.length <= 200000) {
              resolve(data);
              return;
            }
          }
          throw new Error("Não foi possível reduzir a foto. Escolha uma imagem menor.");
        } catch (error) { reject(error); }
      };
      picture.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
