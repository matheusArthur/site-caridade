# Foto anexada na doação

Na página Doar item, use “Foto do item” para escolher um arquivo. A prévia aparece após o preparo. A foto só é gravada quando a doação é cadastrada com sucesso.

- JPG, PNG ou WebP, entrada de até 10 MB.
- Compressão em JPEG até 800 pixels no lado maior, mantendo proporção e sem ampliar fotos pequenas.
- Até 600.000 caracteres na imagem codificada; dados completos do item limitados a 800.000 bytes para manter margem abaixo do limite de documento do Firestore.
- URL preservada como alternativa para itens novos e compatibilidade com antigos.
- Foto anexada aparece nas listagens e detalhes, e no histórico da própria conta.
- Falhas preservam os dados para nova tentativa. Imagem inválida ou grande demais não é enviada.

Não foi ativado Firebase Storage ou plano pago. A imagem ocupa armazenamento e transferência do Firestore e está sujeita às franquias do projeto. Esta solução é destinada ao volume pequeno do projeto acadêmico.

As regras atuais de produtos informadas pelo responsável permitem escrita desse campo; não foi necessária outra regra para o anexo. Essa permissão ampla permanece uma pendência de segurança separada.

Implementação local, sem publicação. Testes automatizados usam imagens/canvas e Firebase simulados. O envio real deve ser confirmado pelo responsável com uma doação de teste. Atualize a página com Ctrl+F5 antes de testar.
