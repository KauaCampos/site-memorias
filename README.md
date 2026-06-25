Como "instalar" o site como app no iPhone

Não existe app na App Store aqui — em vez disso, qualquer site pode ser
"instalado" na tela inicial do iPhone e abrir em tela cheia, sem barra de
navegador, com ícone próprio. Esse site já está configurado pra isso
(arquivo `manifest.json`). O passo a passo pra ela:

1. Abrir o link no **Safari** (tem que ser Safari, não funciona no Chrome do iPhone)
2. Tocar no ícone de compartilhar (quadrado com seta pra cima)
3. Tocar em "Adicionar à Tela de Início"
4. Pronto — vai aparecer um ícone na tela dela, exatamente como um app

Estrutura de arquivos (caso queira entender ou ajustar o visual)

```
index.html          → estrutura da página
global.css           → cores, tipografia, variáveis
componentes.css      → estilo de cada seção (capa, timeline, livro, etc)
app.js               → lógica que lê dados.js e monta a página
dados.js             → ONDE VOCÊ EDITA TUDO
manifest.json        → configuração de "app instalável"
icons/               → ícone do app na tela inicial (pode trocar por uma foto de vocês, 192x192 e 512x512 px)
assets/fotos/        → onde ficam as fotos
```

Qualquer ajuste de cor ou fonte fica em `global.css`, nas variáveis no
topo do arquivo (`--terracota`, `--tinta`, etc). Se quiser mudar a fonte,
troque o nome no `@import` do Google Fonts e nas variáveis `--fonte-display`
e `--fonte-corpo`.
