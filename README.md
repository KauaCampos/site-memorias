# Como usar esse site

Esse site foi feito pra você editar sem precisar saber programar — só precisa
trocar texto e arquivos em dois lugares. Tudo abaixo está em português.

## 1. O que editar

Existe **apenas um arquivo que importa pro conteúdo**: `dados.js`

Abra ele com qualquer editor de texto (Bloco de Notas, VS Code, etc) e
preencha os campos. Ele já vem com instruções dentro, em comentários.

Seções do `dados.js`:
1. **capa** — nomes de vocês e a frase de abertura
2. **contador** — data em que vocês começaram a namorar (o site calcula o
   tempo automaticamente, sempre atualizado)
3. **timeline** — os marcos da relação (adicione quantos quiser, copiando
   o formato de um item já existente)
4. **cartas** — as páginas do "livro" que ela vai virando
5. **galeria** — mosaico de fotos soltas
6. **fechamento** — mensagem final

## 2. Onde colocar as fotos

Salve suas fotos dentro da pasta `assets/fotos/`. Já existem fotos de
exemplo lá (quadrados coloridos) — é só **substituir pelo mesmo nome**
(ex: `capa.jpg`) ou usar nomes novos e atualizar o caminho no `dados.js`.

Dica: comprima as fotos antes (use https://squoosh.app, é grátis) pra elas
carregarem rápido no celular dela. Algo em torno de 200-400KB por foto já
fica com ótima qualidade.

## 3. Como testar no seu computador antes de enviar

Você precisa de um servidor local simples (não dá pra abrir o `index.html`
direto no navegador por clique duplo, porque ele carrega outros arquivos).

Se tiver Python instalado, abra o terminal dentro da pasta do site e rode:

```
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador.

Se tiver VS Code, é mais fácil ainda: instale a extensão "Live Server" e
clique com botão direito no `index.html` → "Open with Live Server".

## 4. Como publicar de verdade (pra ela acessar pelo iPhone)

A forma mais simples e gratuita é o **GitHub Pages** ou a **Vercel** —
você já usa essas ferramentas no RastroLog e no seu portfólio, então o
processo é o mesmo:

1. Suba essa pasta inteira pra um repositório no GitHub
2. Ative o GitHub Pages (Settings → Pages → Branch: main) **ou** importe o
   repositório na Vercel
3. Você vai receber um link tipo `https://seunome.github.io/surpresa` ou
   `https://surpresa.vercel.app`
4. Envie esse link pra ela

## 5. Como ela "instala" o site como app no iPhone

Não existe app na App Store aqui — em vez disso, qualquer site pode ser
"instalado" na tela inicial do iPhone e abrir em tela cheia, sem barra de
navegador, com ícone próprio. Esse site já está configurado pra isso
(arquivo `manifest.json`). O passo a passo pra ela:

1. Abrir o link no **Safari** (tem que ser Safari, não funciona no Chrome do iPhone)
2. Tocar no ícone de compartilhar (quadrado com seta pra cima)
3. Tocar em "Adicionar à Tela de Início"
4. Pronto — vai aparecer um ícone na tela dela, exatamente como um app

## 6. Estrutura de arquivos (caso queira entender ou ajustar o visual)

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
