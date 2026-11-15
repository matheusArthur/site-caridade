# Foto nos itens de doação

Adicionei ao site a opção de escolher uma foto do celular ou computador ao cadastrar uma doação. Antes de enviar, o usuário consegue visualizar a imagem.

- Aceita fotos JPG, PNG e WebP de até 10 MB.
- Reduz a imagem para até 800 pixels, mantendo sua proporção e ocupando menos espaço.
- Mantém a opção de usar um link de imagem.
- Mostra a foto na lista de doações, nos detalhes do item e no histórico de quem doou.
- Mantém os dados preenchidos caso aconteça algum erro, permitindo tentar novamente.

As imagens são salvas no Firestore, sem utilizar o Firebase Storage ou ativar um plano pago. O uso continua sujeito aos limites gratuitos do serviço.

Também criei testes automáticos com respostas simuladas. As permissões de acesso aos produtos ainda precisam de melhorias para aumentar a segurança do projeto.
