# Configuração do Mermaid

## Status
❌ Mermaid não configurado - diagramas aparecem como código texto

## Solução

### Opção A: @beoe/rehype-mermaid (Recomendado)

**Vantagens:**
- Renderização SSG (melhor performance)
- SVG inline
- Suporte dark mode nativo

**Instalação:**
```bash
npm install @beoe/rehype-mermaid
```

**Configuração:**
No `astro.config.mjs`, descomente:
```javascript
import rehypeMermaid from '@beoe/rehype-mermaid';

export default defineConfig({
  markdown: {
    rehypePlugins: [
      [rehypeMermaid, {
        strategy: 'inline-svg',
        dark: true,
      }],
    ],
  },
  // ... resto
});
```

---

### Opção B: remark-mermaidjs (Alternativa)

**Instalação:**
```bash
npm install remark-mermaidjs
```

**Configuração:**
No `astro.config.mjs`, descomente:
```javascript
import remarkMermaid from 'remark-mermaidjs';

export default defineConfig({
  markdown: {
    remarkPlugins: [
      [remarkMermaid, {
        darkMode: true,
      }],
    ],
  },
  // ... resto
});
```

---

## Teste

Após instalar e configurar, reinicie o dev server:

```bash
npm run dev
```

Acesse qualquer página com diagramas:
- `/arquitetura/visao-geral/`
- `/funcionalidades/sistema-preview/`
- `/guias/atualizando-produtos/`

Os blocos Mermaid devem renderizar como diagramas visuais, não como código.

---

## Troubleshooting

### Erro: "Cannot find module '@beoe/rehype-mermaid'"

**Causa:** Pacote não instalado

**Solução:**
```bash
npm install @beoe/rehype-mermaid
```

---

### Erro: "Invalid plugin"

**Causa:** Sintaxe incorreta no config

**Solução:** Verificar que está usando array:
```javascript
rehypePlugins: [
  [rehypeMermaid, { /* options */ }]  // ✅ Array dentro de array
]
```

---

### Diagramas não aparecem

**Causa:** Plugin não aplicado ou blocos mal formatados

**Verificação:**
1. Console do browser mostra erros?
2. HTML gerado contém `<svg>` ou ainda `<pre class="mermaid">`?
3. Blocos estão com sintaxe correta?

**Bloco correto:**
````markdown
```mermaid
graph TD
    A --> B
```
````

---

## Arquivos com Mermaid

- `src/content/docs/arquitetura/visao-geral.mdx` (3 diagramas)
- `src/content/docs/funcionalidades/sistema-preview.mdx` (1 diagrama)
- `src/content/docs/guias/atualizando-produtos.mdx` (1 diagrama)
- `src/content/docs/funcionalidades/edicao-somente-posicao.mdx` (1 diagrama)
- `src/content/docs/guias/ajuste-global.mdx` (1 diagrama)

Total: **8 diagramas** precisam funcionar.
