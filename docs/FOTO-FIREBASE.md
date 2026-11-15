# Foto de perfil pelo Firestore

Adicionei ao perfil a opção de salvar uma foto vinculada à conta do usuário. Assim, a imagem pode ser recuperada nos próximos acessos, inclusive em outro navegador.

Utilizei o Firestore, sem precisar ativar o Firebase Storage ou contratar um plano pago, respeitando os limites gratuitos do serviço.

## Funcionamento

- Aceita imagens JPG, PNG e WebP de até 5 MB.
- Reduz a foto para até 256 pixels, mantendo sua proporção.
- Salva a imagem na conta do usuário.
- Carrega a foto após o login.
- Mostra a confirmação somente depois que o salvamento é concluído.
- Mantém o visual do perfil e apresenta mensagens em caso de erro.

As fotos salvas anteriormente apenas no navegador precisam ser selecionadas novamente.

## Organização e acesso

Cada foto é salva na coleção `profilePhotos`, em um documento identificado pelo código do usuário.

Preparei regras para permitir que cada conta leia e altere somente a própria foto. Essas regras precisam estar publicadas no Firestore para controlar o acesso corretamente.

O documento é criado no primeiro salvamento, sem precisar cadastrá-lo manualmente.

## Testes realizados

Os 45 testes dessa etapa passaram, incluindo verificações de foto, cadastro, login e Home. Os testes utilizaram respostas simuladas do Firebase.

Para conferir o funcionamento real, o teste consiste em salvar uma foto, sair da conta e entrar novamente. Também é importante verificar se outra conta não recebe a mesma imagem.

## Limites de uso

As fotos ocupam espaço no Firestore e seguem os limites do projeto. A redução do tamanho das imagens ajuda a diminuir o armazenamento e a quantidade de dados transferidos.
