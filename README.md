# Projeto Caridade

Aplicação web acadêmica para apresentar iniciativas solidárias e permitir cadastro, consulta e requisição de itens para doação. O frontend utiliza HTML, CSS e JavaScript; Firebase Authentication gerencia o acesso e Cloud Firestore armazena os produtos.

## Começar

Requisitos: navegador moderno e Python 3 para o servidor local. Node.js é necessário apenas para executar a suíte de testes. Não há etapa de compilação nem dependências npm.

Na pasta raiz do projeto:

```shell
python -m http.server 5500 --directory paginas
```

Abra `http://localhost:5500`. O arquivo inicial encaminha para o login. Use um servidor HTTP em vez de abrir o HTML diretamente, pois o menu é carregado com `fetch`. Encerre o servidor com Ctrl+C.

## Funcionamento

1. O usuário abre o login e pode seguir para Criar conta ou recuperar sua senha.
2. O Firebase Authentication recebe os dados de autenticação. Após o login, o navegador segue para `home.html`.
3. O menu leva às páginas institucionais e aos fluxos de doação.
4. Em Doar itens, o formulário envia os dados à coleção `produtos` do Firestore. Em falha, conserva os dados para nova tentativa.
5. A listagem filtra itens por categoria. A tela de detalhes permite registrar requisição ou incrementar interesse, conforme o tipo.

Esses fluxos dependem da configuração e das regras do Firebase. Os testes executados não realizaram gravações reais. Consulte as limitações antes de demonstrar funcionalidades como concluídas.

## Configuração do Firebase

O código está configurado para o projeto `caridade-6464e`. Para usar esse projeto, é necessário acesso autorizado ao seu console e serviços ativos. Para utilizar outro projeto:

1. Crie/registre um aplicativo web no seu próprio projeto Firebase.
2. Ative Authentication com o provedor Email/Password.
3. Crie o banco Cloud Firestore e configure suas regras de autorização conforme os papéis e dados permitidos. As regras efetivas não estão versionadas neste repositório. Não use regras que liberem escrita irrestrita para resolver erros de permissão.
4. Substitua a configuração web em `paginas/js/firebase-init.js` e nas configurações embutidas de `produtos.html`, `produtosDetalhe.html` e `perfil.html`. O projeto ainda precisa unificar essas configurações.
5. Confira os domínios autorizados do Authentication e os endereços usados nas ações de recuperação. Adicione o domínio publicado quando necessário ao fluxo de autenticação utilizado.
6. Verifique login, recuperação e operações de banco com uma conta de teste e registros identificados como teste.

A configuração web do Firebase é usada no navegador; credenciais administrativas e chaves privadas não devem ser colocadas no frontend. A autorização é responsabilidade das regras do serviço, não do sigilo da configuração web.

## Dados atuais

Coleção principal: `produtos`.

| Campo | Uso observado |
| --- | --- |
| `titulo`, `descricao` | Textos do item |
| `categoria` | `roupa`, `casa`, `comida` ou `dinheiro` |
| `imagem` | URL da imagem |
| `regiao` | Localização textual |
| `valor` | Texto numérico opcional; não representa pagamento processado |
| `criadoEm` | Data enviada pelo cliente e armazenada como timestamp |
| `requisitado` | Booleano definido pela requisição |
| `contador` | Quantidade de manifestações de interesse em alimentos |
| `tipo` | Campo opcional lido pelos detalhes; a categoria é usada como alternativa |

O ID do documento identifica o item. Não há associação de proprietário ou requisitante por UID no fluxo atual. A foto de perfil fica em `localStorage`, na chave `fotoPerfil`, e não é sincronizada com a conta.

## Organização

```text
paginas/
  index.html       Entrada para publicação
  html/            Telas e fragmento menu.html
  css/             Estilos
  js/              Autenticação, navegação e scripts auxiliares
  img/             Imagens locais
docs/
  index.html       Página preparada para GitHub Pages
  diagramas.svg    Arquitetura, fluxo e dados
  ENTREGA-7.md     Avaliação, cinco melhorias e limitações
  resultados-testes.txt
tests/
  run.cjs          Testes sem dependências externas
autentificacao/    Arquivos legados, fora da publicação estática
```

Há scripts embutidos em algumas telas. Nem todo arquivo da pasta `js` é carregado pela aplicação atual. Por exemplo, `doacao.js` é legado; a página `doacao.html` contém o fluxo ativo.

## Testes

```shell
node tests/run.cjs
```

A suíte retorna código de saída diferente de zero em falha. Inclui validação, regras de cadastro, sucesso/falha de doação com Firebase simulado, sintaxe e referências HTML locais. As simulações não substituem testes de integração no Firebase.

Para inspecionar a documentação localmente:

```shell
python -m http.server 5501 --directory docs
```

Abra `http://localhost:5501`. O relatório completo está em [Entrega 7](docs/ENTREGA-7.md).

## Publicação posterior

**Aplicação / Netlify:** envie apenas o conteúdo da pasta `paginas` para o projeto existente, na tela Deploys. O `index.html` precisa ficar no primeiro nível. O pacote `site-publicacao.zip` contém essa estrutura. O endereço conhecido é https://creative-taffy-2ff166.netlify.app ; esta revisão não foi publicada.

**Documentação / GitHub Pages:** envie as alterações ao repositório, mantenha os arquivos de documentação em `docs` e configure Settings → Pages → Deploy from a branch → `main` → `/docs`. Confira o endereço fornecido pela plataforma ao terminar. Não há necessidade de publicar a aplicação novamente no GitHub Pages.

Depois de publicar, faça uma verificação em janela anônima: entrada pelo domínio, imagens, navegação, login e regras do banco. Para retornar à versão anterior no Netlify, utilize o histórico de deploys. Preserve uma cópia dos arquivos anteriores antes de atualizar.

## Limitações

Formulários institucionais sem integração, perfil sem isolamento por usuário, operações de requisição sem controle transacional, renderização de dados em HTML e regras do banco não verificadas são limitações conhecidas. Veja a seção 5 do relatório. Não há integração de pagamentos implementada nem estudo com participantes externos nesta entrega.

O vídeo da apresentação será produzido pelo responsável pelo projeto.

## Atualização visual da Home e das imagens

A Home segue o padrão visual das páginas institucionais, com banner fotográfico, botões coral, opções interativas de contribuição (alimentos, roupas, higiene e tempo) e cartões simples com fotografias. Seis imagens ilustrativas foram geradas e integradas ao tema de solidariedade; os banners das páginas foram diversificados.

Os arquivos, prompts e verificações estão em [Refinamento visual](docs/IMAGENS-HOME-V2.md). Execute também `node tests/home.cjs` para verificar as novas interações e referências de imagens nos estilos. Esta atualização continua local, sem publicação.

## Referências oficiais

- [Publicação manual no Netlify](https://docs.netlify.com/deploy/create-deploys/)
- [Configurar a origem do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Autenticação por email e senha no Firebase](https://firebase.google.com/docs/auth/web/password-auth)
