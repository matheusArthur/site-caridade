# Projeto Caridade

Desenvolvi o Projeto Caridade para aproximar pessoas que querem doar de quem precisa de apoio. O site reúne informações sobre iniciativas solidárias e permite cadastrar e consultar itens para doação.

## Funcionalidades

- Criação de conta, login e recuperação de senha.
- Cadastro e consulta de doações por categoria.
- Foto do item por arquivo ou link, com prévia e redução do tamanho da imagem.
- Perfil com foto salva na conta e edição de contato, região e participação.
- Histórico com até quatro fotos das novas doações da própria conta, sem valores.

## Melhorias realizadas

Melhorei as mensagens dos formulários, o uso no celular e a navegação pelo teclado. Também corrigi a verificação da conta ao doar e bloqueei envios repetidos. As mudanças mantiveram o padrão visual do site.

## Tecnologias

Utilizei HTML, CSS e JavaScript nas páginas. O Firebase Authentication cuida das contas e o Cloud Firestore salva os dados e as imagens pequenas.

## Como executar

Com Python 3 instalado, execute na pasta do projeto:

```bash
python -m http.server 5500 --directory paginas
```

Abra [localhost:5500](http://localhost:5500). Não abra os arquivos HTML diretamente.

As contas e o salvamento dependem da configuração do Firebase e das permissões do banco. Para usar outro projeto Firebase, atualize `paginas/js/firebase-init.js` e as configurações ainda presentes nas páginas de produtos e detalhes. Habilite o acesso por e-mail e senha e configure as regras das coleções `produtos`, `profilePhotos` e `userProfiles`.

## Organização

- `paginas`: arquivos do site.
- `docs`: apresentação, manual e informações sobre as melhorias.
- `tests`: testes automáticos do código.

## Testes

Com Node.js instalado, execute:

```bash
node tests/run.cjs
node tests/home.cjs
```

Os testes usam respostas simuladas do Firebase e não substituem a verificação com uma conta real.

## Documentação

- [Apresentação do projeto](docs/index.html)
- [Manual](docs/manual.html)
- [Testes e melhorias](docs/relatorio.html)
- [Home e imagens](docs/visual.html)

Para abrir essas páginas localmente, execute `python -m http.server 5501 --directory docs` e acesse [localhost:5501](http://localhost:5501).

## Links

- [Repositório no GitHub](https://github.com/matheusArthur/site-caridade)
- [Login na hospedagem Netlify](https://creative-taffy-2ff166.netlify.app/html/index.html)

## Próximos ajustes

Alguns formulários ainda não enviam dados. O histórico de itens adquiridos precisa ser separado por usuário, e as permissões dos produtos precisam de melhorias. O campo de valor é informativo; o site não processa pagamentos.
