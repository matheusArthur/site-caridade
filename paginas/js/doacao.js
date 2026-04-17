// PREVIEW IMAGEM
document.getElementById("imagem").addEventListener("input", function() {
  const preview = document.getElementById("preview");
  preview.src = this.value;
  preview.style.display = "block";
});


// CARREGAR PRODUTOS
let listaProdutos = [];

function carregarProdutos() {
  const container = document.getElementById("produtos");

  db.collection("produtos").get().then((querySnapshot) => {
    listaProdutos = [];

    querySnapshot.forEach((doc) => {
      listaProdutos.push(doc.data());
    });

    renderProdutos(listaProdutos);
  });
}

function renderProdutos(lista) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  lista.forEach(item => {
    const card = `
      <div class="card-item">
        <img src="${item.imagem}">
        <div class="card-content">
          <h3>${item.titulo}</h3>
          <p>${item.descricao}</p>
          <span class="badge">${item.categoria}</span>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}


// FILTRO
document.getElementById("filtro").addEventListener("keyup", (e) => {
  const termo = e.target.value.toLowerCase();

  const filtrados = listaProdutos.filter(p =>
    p.titulo.toLowerCase().includes(termo) ||
    p.descricao.toLowerCase().includes(termo)
  );

  renderProdutos(filtrados);
});


// CADASTRO
document.getElementById("formProduto").addEventListener("submit", function(e){
  e.preventDefault();

  const titulo = titulo.value;
  const descricao = descricao.value;
  const categoria = categoria.value;
  const imagem = imagem.value;

  db.collection("produtos").add({
    titulo,
    descricao,
    categoria,
    imagem,
    criadoEm: new Date()
  }).then(() => {
    status.innerText = "✅ Produto cadastrado!";
    formProduto.reset();
    document.getElementById("preview").style.display = "none";
    carregarProdutos();
  });
});

carregarProdutos();