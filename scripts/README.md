# 📸 Screenshot Automation Script

Captura automática de screenshots da interface do **WC Product Creator Plugin** usando dados reais do produto **ID Bags - Base (15710)**.

## ✅ Pré-requisitos

- **Node.js** v18+ e npm
- **WordPress local** em execução (Local by Flywheel, XAMPP, MAMP, etc.)
- **Credenciais de admin** do WordPress
- **Produto base configurado** (ID Bags - Base, produto 15710)

## 🚀 Como usar

### 1. Configurar credenciais

Antes de executar, **edite** o arquivo `scripts/capture-screenshots.js` e ajuste:

```javascript
const CONFIG = {
  baseURL: 'http://id-blocksy.local', // ⚠️ URL do seu ambiente local
  username: 'admin',                   // ⚠️ Seu usuário WordPress
  password: 'password',                // ⚠️ Sua senha WordPress
  baseProductID: '15710',              // ID do produto ID Bags
  // ...
};
```

### 2. Executar captura

```bash
# Captura única (12 screenshots)
npm run screenshots

# Modo watch (re-executa ao salvar o script)
npm run screenshots:watch
```

### 3. Verificar saída

Screenshots salvos em: **`public/screenshots/`**

```
public/screenshots/
├── 01-interface-inicial.png
├── 02-modo-criar.png
├── 03-produto-base.png
├── 04-conteudo-carregado.png
├── 05-fields-grid.png
├── 06-rows-grid.png
├── 07-editor-posicao.png
├── 08-offset-global.png
├── 09-offset-aplicado.png
├── 10-modo-atualizar.png
├── 11-preview.png
└── 12-botao-aplicar.png
```

## 📋 Screenshots capturadas

| #  | Nome do arquivo             | Descrição                                                      |
|----|-----------------------------|----------------------------------------------------------------|
| 1  | `01-interface-inicial.png`  | Página principal mostrando modos Criar/Atualizar              |
| 2  | `02-modo-criar.png`         | Modo "Criar Novo Produto" com campos nome e thumbnail         |
| 3  | `03-produto-base.png`       | ID do produto base (15710) preenchido                          |
| 4  | `04-conteudo-carregado.png` | Grids com 15 campos e 9 linhas carregados                      |
| 5  | `05-fields-grid.png`        | Grid de Fields com busca ativa por "texto"                     |
| 6  | `06-rows-grid.png`          | Grid de Rows com card expandido (campo Texto + badge cores)   |
| 7  | `07-editor-posicao.png`     | Editor de posição X/Y (43,50 e 52,00)                          |
| 8  | `08-offset-global.png`      | Painel de Offset Global (X=-0,5 e Y=1,25)                      |
| 9  | `09-offset-aplicado.png`    | Grid após aplicar offset (valores atualizados)                 |
| 10 | `10-modo-atualizar.png`     | Modo "Atualizar" com IDs de produtos alvo (123, 456, 789)     |
| 11 | `11-preview.png`            | Preview visual do produto com gravações posicionadas           |
| 12 | `12-botao-aplicar.png`      | Botão final "Criar Novo Produto" pronto                        |

## 🛠️ Dados reais utilizados

### Produto Base
- **ID**: 15710
- **Nome**: ID Bags - Base
- **Fields**: 15 campos (texto, símbolos, cores, tamanhos)
- **Rows**: 9 linhas de layout com coordenadas reais

### IDs de campos (do `_wapf_fieldgroup.txt`)
```javascript
fieldIDs: {
  addCustomization: '66c3a36cbc096',  // "Adicionar personalização?"
  customizationType: '66c340da6ea57', // Tipo (Texto/Símbolo/etc)
  text: '66bfc001dc47c',              // Campo de texto
  symbol: '66c36162c3f1d',            // Símbolo (35 opções)
  fontSize: '66c5233939291',          // Tamanho da fonte
  color: '66c36e8b53437',             // Cor da gravação
  // ... (ver arquivo completo)
}
```

### 35 Símbolos disponíveis
- Insetos: libélula, abelha, borboleta
- Plantas: palmeira, abacaxi
- Corações: outline, infinito, amour, cheio, com mãos
- Frases: my_love, for_ever, true_love, only_you, eu_te_amo, etc.
- Times de futebol: Vasco, Botafogo, Fluminense, Flamengo, Corinthians, SPFC, Palmeiras, Santos

### 5 Cores de gravação
- 🥇 **Dourada** (`#E5C973`)
- 🥈 **Prateada** (`#B2B2B2`)
- 🟤 **Natural** (`#552806`)
- ⚫ **Preta** (`#000000`)
- ⚪ **Relevo seco** (sem cor)

## 🔧 Troubleshooting

### Erro: "Cannot connect to Chrome"
```bash
# Reinstale o Puppeteer
npm install puppeteer --force
```

### Erro: "Login failed"
- Verifique credenciais no `CONFIG`
- Confirme que o WordPress está rodando
- Teste login manual no navegador

### Erro: "Element not found"
- Plugin pode não ter carregado completamente
- Aumente `CONFIG.timeouts.wait` de `2000` para `3000`
- Verifique se o produto 15710 existe

### Screenshots em branco
- Aguarde mais tempo antes de capturar
- Use `fullPage: true` no `saveScreenshot()` se necessário
- Verifique se seletor CSS está correto

## 📦 Dependências

```json
{
  "puppeteer": "^24.29.1",  // Browser automation
  "fs-extra": "^11.3.2"     // File operations
}
```

## 🎯 Próximos passos

Após capturar:

1. **Otimizar imagens**: comprimir sem perder qualidade
   ```bash
   # Usando ImageOptim (macOS) ou TinyPNG
   ```

2. **Usar nos tutoriais**: incluir nos arquivos `.mdx` da documentação
   ```mdx
   ![Interface inicial](../../../screenshots/01-interface-inicial.png)
   ```

3. **Atualizar quando necessário**: re-executar `npm run screenshots` após mudanças na UI

---

**Nota**: Este script é **idempotente** – pode ser executado múltiplas vezes e sobrescreverá as imagens existentes.
