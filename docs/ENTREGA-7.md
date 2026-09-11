# WEB APP — ENTREGA 7: Testes e Refinamento

**Projeto:** Caridade  
**Responsável pelo projeto:** Matheus Arthur  
**Versão avaliada:** código local baseado no commit `81ae4f5`, com os refinamentos descritos abaixo.  
**Data da avaliação:** 10/09/2026 (America/Sao_Paulo)  
**Escopo:** avaliação técnica, testes automatizados, inspeção de usabilidade, cinco melhorias, documentação e preparação para publicação. A atualização das hospedagens foi adiada pelo responsável. O vídeo será produzido pelo responsável.

## 1. Executar testes automatizados e de usabilidade

### Método e ambiente

Os testes automatizados usam Node.js, sem instalar dependências. O arquivo `tests/run.cjs` executa a validação de email, regras de cadastro, fluxo de gravação de doações com Firebase simulado, análise de sintaxe e verificação de referências locais nos arquivos HTML. A saída integral está em `docs/resultados-testes.txt`.

Para repetir, execute na raiz do projeto:

```shell
node tests/run.cjs
```

**Resultado:** 15 testes aprovados, sem falhas na execução registrada.

| Grupo | Quantidade | Resultado |
| --- | ---: | --- |
| Email inválido: vazio, sem arroba, sem domínio completo, espaços e duas arrobas | 6 | Aprovados |
| Email válido com endereço adicional `+teste` | 1 | Aprovado |
| Cadastro: senha curta, confirmação divergente, campos válidos e botão habilitado | 4 | Aprovados |
| Doação: sucesso e falha; bloqueio de duplicidade, reativação do botão e preservação dos dados | 2 | Aprovados com Firebase simulado |
| Sintaxe dos scripts locais e dos scripts embutidos em HTML | 1 | Aprovado |
| Existência dos arquivos referenciados por links e recursos HTML locais | 1 | Aprovado |

### Inspeção de usabilidade executada

Foi realizada uma inspeção guiada no navegador, com interface desktop e viewport móvel de 390 × 844 pixels. Esta atividade é uma avaliação técnica por tarefas, **não uma pesquisa com participantes externos**. Não foram inventados depoimentos, tempos de execução ou métricas de satisfação.

| Tarefa | Evidência observada | Resultado |
| --- | --- | --- |
| Abrir o endereço raiz local | Redirecionamento automático para `html/index.html` | Aprovado |
| Digitar email inválido no login | Mensagem de email inválido e botão Entrar desabilitado | Aprovado |
| Corrigir o email e preencher a senha | Botões Entrar e Recuperar senha habilitados | Aprovado |
| Visualizar o login em celular | Formulário, título e botões legíveis; imagem lateral removida nessa largura | Aprovado na largura testada |
| Abrir Doações e usar Tab | Foco alcançou o link Doar itens | Aprovado |
| Fechar submenu com Escape | Estado recolhido e foco devolvido ao botão | Aprovado |
| Abrir e fechar o menu móvel | Alternância do menu e de `aria-expanded`; Escape devolveu foco ao botão | Aprovado |

### Limites dos resultados

Os testes de Firebase simulam respostas e não confirmam autenticação real, regras do Firestore, envio de email, disponibilidade da rede ou persistência no projeto em produção. Nenhuma conta de teste foi criada e nenhuma doação real foi gravada nesta avaliação. Verificar a existência dos recursos locais não confirma a disponibilidade de serviços externos. A inspeção não equivale a uma certificação de acessibilidade nem cobre todos os aparelhos e navegadores.

Para complementar com usuários, proponha três tarefas: criar uma conta de teste, encontrar uma categoria de doação e cadastrar um item de teste. Registre dificuldade, conclusão e sugestão de cada participante, com consentimento. Não apresente essa etapa como executada enquanto não houver participantes.

## 2. Refinar a interface e experiência do usuário

As cinco melhorias foram priorizadas por impedirem o acesso, dificultarem tarefas frequentes ou deixarem o usuário sem resposta. As decisões se baseiam em problemas encontrados no código e na inspeção, não em feedback externo inexistente.

### Melhoria 1 — Entrada pelo endereço principal

**Antes:** o arquivo inicial estava apenas em `paginas/html/index.html`; abrir a raiz da pasta publicada resultava em página não encontrada.  
**Refinamento:** criação de `paginas/index.html` com encaminhamento relativo e link alternativo para o login.  
**Benefício:** o visitante pode usar o endereço principal sem precisar acrescentar manualmente `/html/index.html`. O navegador ainda poderá mostrar esse caminho após o encaminhamento.  
**Validação:** acesso à raiz do servidor local abriu a página de login.

### Melhoria 2 — Login adaptado ao celular

**Antes:** a página de login não possuía a configuração de viewport; a imagem lateral ocupava espaço antes do formulário em telas pequenas.  
**Refinamento:** adição do viewport, apresentação compacta abaixo de 600 pixels, remoção da imagem decorativa nessa largura e ajustes de espaçamento.  
**Benefício:** os campos e as ações principais ficam mais fáceis de visualizar e tocar.  
**Validação:** inspeção visual em 390 × 844 pixels, com os campos e os três botões visíveis.

### Melhoria 3 — Preenchimento e validação de login/cadastro

**Antes:** o login utilizava eventos de teclado e o cadastro dependia da mudança de foco; os rótulos do login não estavam ligados aos campos e a validação de email aceitava alguns textos inválidos. Os botões principais não eram botões de envio do formulário.  
**Refinamento:** validação no evento `input`, rótulos associados, preenchimento automático, campos obrigatórios, regiões de aviso e envio sem recarregar a página. A expressão de email passou a validar o valor completo. O login recebeu título e explicação.  
**Benefício:** retorno mais rápido durante a digitação, melhor identificação dos campos e suporte ao envio pelo teclado.  
**Validação:** testes automatizados de email/cadastro e interação com o login no navegador. O envio real ao Firebase não foi realizado.

### Melhoria 4 — Menu acessível por teclado

**Antes:** o acionador móvel era uma `div`, os estados dos submenus não eram informados e existiam dois scripts concorrentes de navegação.  
**Refinamento:** botão nativo, `aria-expanded`, identificação da página atual, foco visível, fechamento por Escape e ocultação do menu móvel fechado. O menu passou a usar somente `menu.js`; os rótulos foram ajustados para Início e Sair.  
**Benefício:** navegação mais previsível por teclado, toque e tecnologia assistiva.  
**Validação:** abertura, Tab e Escape no navegador; alternância do menu móvel. O comportamento visual de hover foi substituído pela abertura explícita do submenu.

### Melhoria 5 — Retorno confiável no cadastro de doações

**Antes:** o fluxo dependia de variáveis globais geradas por IDs; `status` conflita com uma propriedade do navegador. Não havia tratamento de falha na gravação e era possível enviar repetidamente durante uma operação.  
**Refinamento:** leitura explícita dos campos, mensagem de andamento, bloqueio temporário do botão, aviso de sucesso ou falha, preservação dos campos em erro e reativação para nova tentativa. A imagem usa campo de URL e o valor aceita centavos e não aceita negativos pela validação HTML. A listagem apresenta mensagem quando a leitura falha.  
**Benefício:** o usuário entende o resultado da operação e pode tentar novamente sem perder o preenchimento.  
**Validação:** testes com sucesso e erro simulados; os testes verificam que duas tentativas simultâneas produzem apenas uma chamada de gravação.

## 3. Hospedar a aplicação em um servidor

**Hospedagem existente:** https://creative-taffy-2ff166.netlify.app  
**Estado desta entrega:** a versão refinada está preparada localmente. Não foi enviada ao Netlify, conforme a orientação de publicar depois. O endereço existente não constitui evidência de que os novos arquivos já estão no ar.

Para atualizar o mesmo projeto, abra seu painel no Netlify, entre em Deploys e envie a pasta `paginas` completa ou o arquivo `site-publicacao.zip`. Não envie a raiz inteira do repositório. Após a publicação, abra o endereço principal em uma janela anônima e confira entrada, estilos, navegação e funcionalidades com sua conta de teste. Mantenha o projeto ativo durante a avaliação.

## 4. Criar página no GitHub Pages

**Página preparada:** `docs/index.html`. Inclui objetivos, funcionalidades, arquitetura, fluxo de uso, modelo atual dos dados, as cinco melhorias, os resultados e links para a documentação.

Os diagramas representam o código observado, incluindo suas limitações. Não existe vínculo implementado entre o documento de doação e o usuário doador/requisitante; o diagrama não inventa esse relacionamento.

**Publicação adiada:** os arquivos estão prontos, mas ainda precisam ser enviados ao repositório e o GitHub Pages precisa ser ativado. Na configuração de Pages do repositório, selecione publicação a partir de uma branch, `main` e a pasta `/docs`. Depois da conclusão, verifique o endereço informado pelo GitHub. O endereço esperado é `https://matheusarthur.github.io/site-caridade/`; sua disponibilidade não foi confirmada nesta entrega.

## 5. Finalizar a documentação completa

O `README.md` explica instalação, execução, testes, configuração do Firebase, estrutura dos arquivos, uso e publicação. Esta página registra a avaliação e as cinco melhorias. `docs/index.html` apresenta o projeto visualmente; os diagramas estão em `docs/diagramas.svg`.

### Limitações existentes encontradas

- Contato, voluntariado e solicitação de ajuda possuem interfaces institucionais sem integração de envio confirmada; o botão de contato não possui ação implementada.
- O perfil consulta produtos requisitados globalmente, sem filtragem por usuário; a foto é salva apenas no navegador, via `localStorage`.
- A requisição de itens não usa transação para impedir concorrência entre pessoas, e o contador de interesse não garante um registro único por usuário.
- Alguns cartões interpolam conteúdo do Firestore em HTML. A renderização segura desse conteúdo e a validação das regras do banco continuam pendentes de uma revisão específica.
- As regras de autorização do Firestore não estão presentes no repositório e não foram verificadas no console. A proteção de uma tela no cliente não substitui regras no banco.
- Há versões diferentes do SDK Firebase e arquivos legados que não representam funcionalidades ativas. `js/doacao.js` não é carregado pela página atual de doação; o fluxo ativo está embutido no HTML. `transaction.js` depende de um serviço ausente e não comprova um sistema de pagamentos.
- Textos de histórico confiável, dados institucionais e contatos genéricos não foram comprovados por dados reais. Não há processamento de pagamento demonstrado.

Esses itens não invalidam as correções registradas, mas impedem afirmar que todas as funcionalidades da aplicação foram concluídas ou homologadas para produção.

## 6. Produzir uma apresentação em vídeo

Conforme combinado, a gravação e a edição do vídeo de até 10 minutos ficam com o responsável pelo projeto. Esta entrega fornece a documentação e os testes para apoiar a demonstração; nenhum vídeo foi produzido.

## Complemento — Imagens e Home

Após a avaliação inicial, foram adicionadas seis fotografias ilustrativas geradas por IA, redistribuídas as imagens de cabeçalho e reformulada a Home com opções de contribuição interativas, cartões visuais, etapas expansíveis e animações discretas. Os 15 testes anteriores continuam aprovados; cinco testes adicionais da Home verificam troca de conteúdo, teclado e referências de imagens. Veja [Refinamento visual](IMAGENS-HOME-V2.md) para os prompts, arquivos e verificações. A atualização não foi publicada.


## Padronização final da Home

Ajuste final solicitado: a Home agora reutiliza o padrão das páginas institucionais (banner com foto e sobreposição, Poppins, botões coral, fundo branco e rodapé compartilhado). A composição foi reduzida a duas seções, mantendo as opções de contribuição e os cartões com novas imagens. As etapas expansíveis e os elementos decorativos da versão anterior foram removidos.
