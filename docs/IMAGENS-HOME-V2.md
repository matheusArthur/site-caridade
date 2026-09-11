# Refinamento visual — Home e imagens

Ferramenta: geração de imagens integrada (image_gen), sem API/CLI externa. As seis cenas são imagens ilustrativas geradas por IA, não registros de ações reais do projeto. Os arquivos finais estão em `paginas/img/`.

## Alterações

- Home reformulada com composição editorial, nova foto principal, quatro opções interativas de contribuição, cartões visuais, etapas expansíveis e links de ação.
- Animações discretas respeitam a preferência por movimento reduzido. As opções de contribuição aceitam setas, Home e End no teclado.
- Sete banners específicos deixaram de usar i1.jpg. As dez páginas institucionais passaram a escolher imagens diferentes de cabeçalho.
- Novas fotos em contato, voluntariado, parcerias, transparência e perguntas frequentes. Imagem de impacto existente passou a ser utilizada.
- As funcionalidades de autenticação e gravação de doações foram preservadas. Nenhuma publicação foi realizada.

## Prompts finais e arquivos

### comunidade-jardim-v2.png

**Arquivo:** `paginas/img/comunidade-jardim-v2.png`

**Prompt:** Use case: photorealistic-natural. Fotografia editorial horizontal 3:2 para o destaque de um site brasileiro de solidariedade. Um pequeno grupo diverso de adultos voluntários em uma horta comunitária urbana brasileira, conversando e passando uma caixa de hortaliças frescas de uma pessoa para outra. Enquadramento espontâneo médio-aberto, pessoas principalmente no centro e à direita, rostos naturais e mãos anatomicamente corretas. Luz suave de fim de tarde, tons terracota, verde sálvia e creme, textura fotográfica realista, ambiente simples e cuidado. Alegria discreta, autonomia e cooperação. Sem texto, marcas, logotipos, números ou marca-d'água. Uma única foto, não colagem.

### cozinha-solidaria-v2.png

**Arquivo:** `paginas/img/cozinha-solidaria-v2.png`

**Prompt:** Use case: photorealistic-natural. Fotografia editorial horizontal 3:2 para site de caridade brasileiro. Três adultos diversos preparando refeições em uma cozinha comunitária arejada, uma pessoa cortando legumes e outra colocando comida em recipientes reutilizáveis sobre bancada limpa. Composição espontânea documental, plano médio, luz natural lateral, tons quentes de terracota, creme, verdes naturais. Sensação de colaboração e dignidade, detalhes realistas, mãos anatomicamente corretas. Sem texto, logotipos, marcas ou marca-d'água. Uma única fotografia, não colagem.

### roupas-organizadas-v2.png

**Arquivo:** `paginas/img/roupas-organizadas-v2.png`

**Prompt:** Use case: photorealistic-natural. Fotografia editorial horizontal 3:2 para site brasileiro de solidariedade. Voluntária adulta e voluntário adulto organizando casacos de várias cores em um cabideiro e dobrando roupas sobre uma mesa de madeira em centro comunitário. Cena claramente diferente de entrega de alimentos, foco nas roupas bem cuidadas e colaboração, pessoas naturais em plano médio. Luz de janela, tons terracota, creme e verde sálvia, fotografia documental realista e acolhedora. Sem texto legível, logotipos, marcas ou marca-d'água. Uma fotografia única, não colagem.

### acolhimento-conversa-v2.png

**Arquivo:** `paginas/img/acolhimento-conversa-v2.png`

**Prompt:** Use case: photorealistic-natural. Fotografia editorial horizontal 3:2 para página de contato de projeto social brasileiro. Duas mulheres adultas de idades distintas conversando de igual para igual em uma mesa de centro comunitário luminoso, uma delas ouvindo com atenção, mãos relaxadas, um copo de água e planta ao lado. Cena de acolhimento respeitoso sem sofrimento encenado. Composição documental realista, ambiente simples com paredes creme, detalhes verde sálvia e terracota, luz natural suave, rostos e mãos naturais. Sem palavras legíveis, sem logotipos ou marca-d'água. Uma única foto.

### parceria-coleta-v2.png

**Arquivo:** `paginas/img/parceria-coleta-v2.png`

**Prompt:** Use case: photorealistic-natural. Fotografia editorial horizontal 3:2 de solidariedade e parceria local no Brasil. Pequeno comerciante adulto entregando uma caixa de suprimentos sem rótulos a uma voluntária adulta diante de um comércio de bairro com plantas, uma bicicleta de carga ao fundo. Plano médio-aberto, gesto de cooperação natural, cidade brasileira contemporânea, luz de manhã, paleta creme, tijolo e verde sálvia, realismo fotográfico. Não mostrar letreiros legíveis nem marcas, sem logotipos e sem marca-d'água. Uma foto única, não colagem.

### organizacao-transparencia-v2.png

**Arquivo:** `paginas/img/organizacao-transparencia-v2.png`

**Prompt:** Use case: photorealistic-natural. Fotografia editorial horizontal 3:2 para site de projeto social, tema organização e transparência. Vista em ângulo superior de mesa de madeira onde três adultos voluntários conferem caixas de doações pequenas, um caderno com linhas indistintas, lápis e etiquetas em branco. Mostrar parcialmente mãos naturais e braços, não depender de rostos. Composição clara, organizada e visualmente distinta, luz suave de janela, cores creme, verde sálvia e pequenos detalhes terracota. Fotografia realista, nenhum texto ou número legível, sem marcas, sem logotipos ou marca-d'água. Uma única fotografia.

## Verificações executadas

- 15 testes anteriores aprovados após a integração das imagens.
- 5 testes adicionais da Home aprovados: troca de conteúdo, links, estados acessíveis, navegação por teclado e imagens referenciadas no CSS.
- Navegador: troca de opção por clique e tecla End, abertura de etapa expansível e inspeção visual em desktop.
- Viewport móvel de 390 × 844: conferência da composição e ausência de rolagem horizontal, com menu aberto e fechado.
- Banner e imagem de destaque distintos confirmados na página de parcerias.
- Nenhuma operação de banco ou publicação foi realizada.


## Padronização final da Home

Ajuste final solicitado: a Home agora reutiliza o padrão das páginas institucionais (banner com foto e sobreposição, Poppins, botões coral, fundo branco e rodapé compartilhado). A composição foi reduzida a duas seções, mantendo as opções de contribuição e os cartões com novas imagens. As etapas expansíveis e os elementos decorativos da versão anterior foram removidos.
