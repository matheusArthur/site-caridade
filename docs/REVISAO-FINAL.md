# Melhorias no Projeto Caridade

Fiz ajustes no login, no cadastro e no perfil para facilitar o uso do site, mantendo seu visual.

## Alterações realizadas

- Impedi envios repetidos enquanto o formulário está sendo processado.
- Ajustei a validação do e-mail para desconsiderar espaços no início e no final.
- Melhorei as mensagens de erro, com explicações em português.
- Permiti uma nova tentativa após falhas, reativando os botões.
- Organizei os avisos para evitar mensagens repetidas no mesmo campo.
- Melhorei o contraste das mensagens e a identificação do foco ao navegar pelo teclado.
- Corrigi o aviso de carregamento para não bloquear outras áreas do perfil.
- Ajustei o perfil para mostrar o nome e o e-mail da conta conectada, em vez de dados fixos.

## Testes realizados

Nesta etapa, os 31 testes automáticos passaram:

- 15 testes gerais.
- 5 testes da Home.
- 11 testes de login e cadastro.

Também conferi no navegador a exibição do formulário, as mensagens de e-mail inválido e o comportamento dos botões.

Os testes automáticos utilizaram respostas simuladas do Firebase. Eles ajudam a verificar o código, mas não substituem os testes com uma conta e o banco reais.

Para executar:

    node tests/run.cjs
    node tests/home.cjs
    node tests/auth.cjs

## Próximos ajustes

- Separar as solicitações de itens por usuário.
- Revisar as permissões de acesso ao banco.
- Melhorar a segurança da exibição dos dados dos produtos.
- Integrar os formulários que ainda não enviam informações.
- Organizar as versões do Firebase utilizadas no projeto.
