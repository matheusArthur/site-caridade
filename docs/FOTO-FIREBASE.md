# Foto de perfil pelo Firestore

A integração local usa Firestore, sem Firebase Storage e sem ativação de plano pago. O uso segue as franquias e limites do projeto Firebase; não há promessa de uso ilimitado gratuito.

## Implementação

- Entrada: JPG, PNG ou WebP até 5 MB.
- Compressão no navegador: JPEG, lado maior até 256 pixels, no máximo 200.000 caracteres em base64.
- Documento: `profilePhotos/{UID}`, campos `photoData` e `updatedAt` (timestamp do servidor).
- Carregamento após autenticar: leitura do documento da própria conta, sem usar chave global de localStorage nem Firebase Storage.
- Sucesso só é informado após confirmação da gravação do Firestore.
- Visual preservado. Fotos locais antigas devem ser selecionadas novamente uma vez.

## Regras: etapa pendente

Abra Firebase → Firestore Database → Regras. Antes de publicar, preserve uma cópia das regras existentes.

O arquivo `firestore-fotos.rules` é um TRECHO para adicionar dentro de `match /databases/{database}/documents { ... }`, ao lado das regras das demais coleções. Não substitua as regras inteiras por esse trecho: isso pode impedir o funcionamento das doações.

As regras usam o UID para restringir acesso. Regras amplas existentes, como `match /{document=**}` com acesso liberado, também precisam ser avaliadas, porque permissões sobrepostas se somam. Envie as regras atuais para que seja possível preparar o conjunto final sem adivinhar permissões dos produtos.

Não é necessário criar manualmente a coleção nem documentos: o primeiro salvamento autorizado cria o documento da foto.

Opcional: crie uma isenção de indexação de campo único para `photoData` na coleção `profilePhotos`, pois a imagem não é usada em filtros ou ordenação. A integração não depende dessa otimização.

## Testar após publicar as regras

1. Entre na versão local atualizada com uma conta de teste.
2. Abra Perfil, selecione a imagem e aguarde “Foto salva na sua conta”.
3. Saia e entre novamente: a foto deve ser recuperada.
4. Confira em outro navegador com a mesma conta.
5. Entre com outra conta: ela não deve herdar a foto.
6. No simulador de regras, confirme que uma conta diferente não pode ler nem escrever o documento da primeira conta.

## Verificação realizada

45 testes aprovados: 14 de foto, 15 gerais, 11 de autenticação e 5 da Home. Firestore e canvas simulados; regras publicadas e gravação real ainda não verificadas. Nenhuma publicação ou alteração remota de regra foi feita.

Referências: https://firebase.google.com/docs/firestore/quotas e https://firebase.google.com/docs/firestore/security/rules-conditions .

O antigo arquivo `docs/storage-profile.rules` pertence à proposta anterior com Storage e não deve ser usado nesta implementação.
