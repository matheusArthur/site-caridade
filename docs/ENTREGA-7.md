# Projeto Caridade — Testes e Melhorias

**Autor:** Matheus Arthur

Nesta etapa, fiz ajustes para melhorar o funcionamento do site e facilitar seu uso, mantendo a identidade visual do projeto.

## 1. Testes realizados

Utilizei testes automáticos para conferir:

- Validação do e-mail e dos campos de cadastro.
- Regras de preenchimento da senha.
- Cadastro de doações com respostas de sucesso e erro.
- Bloqueio de envios repetidos.
- Existência dos arquivos usados nas páginas.
- Funcionamento das opções interativas da Home.

Na etapa inicial, os 15 testes gerais e os cinco testes da Home passaram. Os testes com Firebase utilizaram respostas simuladas, sem confirmar o funcionamento do banco real.

Para executar os testes principais:

    node tests/run.cjs
    node tests/home.cjs

## 2. Melhorias no site

### Acesso à página inicial

Ajustei a entrada pelo endereço principal para abrir a página de login automaticamente.

### Login e cadastro

Melhorei a identificação dos campos, a validação durante o preenchimento e as mensagens de erro. Também incluí proteção contra envios repetidos e suporte ao envio pelo teclado.

### Uso no celular

Ajustei os espaços e a organização do login em telas pequenas, deixando os campos e botões mais fáceis de visualizar.

### Menu de navegação

Melhorei a abertura dos menus, a indicação da página atual e a navegação pelo teclado. Os submenus podem ser fechados com a tecla Escape.

### Cadastro de doações

Adicionei mensagens de andamento, sucesso e erro. Quando ocorre uma falha, os dados preenchidos são mantidos para uma nova tentativa.

Também corrigi a verificação da conta antes de salvar e passei a vincular as novas doações ao usuário que as cadastrou.

### Fotos dos produtos

Incluí a opção de anexar uma foto do aparelho, com prévia antes do envio. A imagem é reduzida para ocupar menos espaço, mantendo a proporção. A opção de usar um link continua disponível.

### Perfil do usuário

Adicionei o salvamento da foto e a edição de contato, região e participação. O perfil também passou a mostrar as fotos das novas doações feitas pela própria conta, sem valores.

## 3. Imagens e página inicial

Adicionei seis imagens ilustrativas geradas por IA para representar ações de solidariedade e organizei seu uso nas páginas.

Na Home, mantive o padrão visual do restante do site, com imagens, botões em coral e opções interativas de contribuição. Simplifiquei a organização e retirei elementos que deixavam a página carregada.

## 4. Publicação e documentação

Organizei uma apresentação do projeto para o GitHub Pages e um README com informações sobre o site, as tecnologias utilizadas e as instruções de execução.

- Site: https://creative-taffy-2ff166.netlify.app
- Repositório: https://github.com/matheusArthur/site-caridade

## 5. Próximos ajustes

- Integrar os formulários que ainda não enviam dados.
- Separar o histórico de itens adquiridos por usuário.
- Melhorar as permissões de acesso aos produtos.
- Revisar a segurança da exibição dos dados e das solicitações de itens.
