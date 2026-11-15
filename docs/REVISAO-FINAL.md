# Revisão pontual — Projeto Caridade

Data: 15/11/2026. Alterações locais; sem publicação nesta revisão.

## O que foi alterado

1. Login: bloqueio de envio duplicado, validação antes da chamada ao Firebase e reativação dos botões após erro.
2. E-mail: remoção de espaços nas pontas no login, cadastro e recuperação. Senhas são preservadas exatamente como digitadas.
3. Mensagens: erros de credencial, rede, excesso de tentativas e conta desativada em português; mensagem genérica de recuperação sem confirmar a existência de uma conta.
4. Cadastro: bloqueio de duplicidade e nova tentativa após falha; evita mostrar simultaneamente erro de campo vazio e formato inválido.
5. Interface: contraste corrigido nas mensagens, foco visível para navegação pelo teclado e rolagem sem animação para quem prefere movimento reduzido. Layout, fotos e paleta preservados.
6. Carregamento: sobreposição de autenticação com classe exclusiva, sem transformar avisos de listagem do perfil em uma tela bloqueante. Anúncio acessível e prevenção de sobreposições duplicadas.
7. Perfil: nome e e-mail passam a refletir a conta autenticada. Dados pessoais fixos foram substituídos por “não informado”; sem sessão, a página retorna ao login.

## Validação

Execute na raiz:

    node tests/run.cjs
    node tests/home.cjs
    node tests/auth.cjs

São 31 testes automatizados aprovados (15 gerais, 5 da Home e 11 de autenticação). Firebase é simulado nesses testes. Verificação no navegador local: formulário carregou, e-mail inválido exibiu mensagem legível e botões permaneceram bloqueados. Não foram feitos cadastro, envio de recuperação ou gravações reais no banco.

O login utiliza signInWithEmailAndPassword do Firebase. E-mail fictício com formato válido pode ser cadastrado sem provar que a caixa postal existe; isso não representa validação de posse do e-mail. Referência: https://firebase.google.com/docs/auth/web/password-auth

Não é possível afirmar “100% funcional”: faltam entrada com conta de teste, manutenção da sessão após recarregar, saída real e validação da recuperação numa caixa acessível. A credencial de teste ainda não foi fornecida. As regras efetivas do Firestore e a configuração do console não foram inspecionadas.

## Próximas melhorias sugeridas, sem alteração ampla nesta revisão

- Vincular doações e solicitações ao UID. Atualmente o perfil consulta itens requisitados globalmente; não representa histórico pessoal.
- Validar regras do Firestore com o console ou arquivos de regras do projeto.
- Revisar renderização de dados por innerHTML em produtos e perfil para evitar inserção de HTML não confiável.
- Integrar os formulários institucionais e identificar conteúdo ilustrativo. Não apresentar tais recursos como serviços concluídos.
- Atualizar e unificar as versões do SDK Firebase numa etapa própria, com testes de integração.

## Exigências do professor

| Tópico | Material e pendências |
| --- | --- |
| Apresentação final | Demonstrar navegação, cadastro/login e doações apenas nos fluxos previamente validados. Explicar limitações. |
| Código no GitHub | Repositório confirmado: https://github.com/matheusArthur/site-caridade . README com execução local já existe. Alterações desta revisão ainda locais. |
| Portfólio GitHub Pages | Página docs/index.html já existe. Página complementar de entrega final preparada em docs/entrega-final.html. Ativação do Pages e URL pública ainda precisam ser confirmadas. |
| Vídeo até 10 minutos | Roteiro abaixo; gravação e link final pendentes. |

## Roteiro do vídeo (9min30s)

- 0:00–0:50: apresentação do autor e problema atendido: aproximar doadores de pessoas que precisam de apoio.
- 0:50–1:40: público e proposta de valor: centralizar itens e iniciativas num site acessível.
- 1:40–3:10: demonstrar login e cadastro com conta de teste validada, sem expor senha ou tokens.
- 3:10–4:40: navegar pela Home, categorias e detalhes de um item; explicar o caminho para doar.
- 4:40–6:10: demonstrar cadastro e consulta de uma doação identificada como teste, se as regras e gravação tiverem sido validadas; caso contrário, explicar o fluxo sem alegar sucesso real.
- 6:10–7:00: mostrar os ajustes discretos de validação, mensagens, teclado e perfil.
- 7:00–8:00: explicar HTML/CSS/JavaScript, Firebase Authentication e Firestore; mostrar os testes e distinguir simulação de integração real.
- 8:00–8:50: abrir repositório e portfólio publicado, quando disponível; mostrar instruções de execução.
- 8:50–9:30: impacto esperado, limitações atuais e próximos passos. Não atribuir números de impacto ou feedback de usuários sem evidências.
