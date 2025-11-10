# 📸 Guia de Captura Manual de Screenshots

Como o Puppeteer não consegue conectar ao Local by Flywheel com SSL, vamos capturar manualmente.

## ⚡ Método Rápido (15 minutos)

### 1. Preparar navegador

1. Abra **Chrome** ou **Firefox**
2. Pressione **F12** para abrir DevTools
3. Clique no ícone de **dispositivo móvel** (Responsive Design Mode)
4. Configure resolução: **1920 x 1080**
5. Zoom: **100%**

### 2. Lista de screenshots necessárias

Acesse: `https://idblocksy.local/wp-admin/admin.php?page=wc_product_creator`

#### Screenshot 1: Interface inicial
- **Arquivo:** `01-interface-inicial.png`
- **O que mostrar:** Página inicial com botões Criar/Atualizar
- **Ferramenta:** cmd+shift+4 (Mac) ou Win+Shift+S (Win)

#### Screenshot 2: Modo Criar
- **Arquivo:** `02-modo-criar.png`
- **Ação:** Clicar no radio "Criar Novo Produto"
- **O que mostrar:** Campos "Nome" e "Thumbnail ID" visíveis

#### Screenshot 3: Produto Base
- **Arquivo:** `03-produto-base.png`
- **Ação:** Digite `15710` no campo "ID do produto base"
- **O que mostrar:** Campo preenchido

#### Screenshot 4: Conteúdo Carregado
- **Arquivo:** `04-conteudo-carregado.png`
- **Ação:** Clique em "Carregar conteúdo do produto base"
- **Aguarde:** ~3 segundos
- **O que mostrar:** Grids de Fields e Rows preenchidos

#### Screenshot 5: Grid de Fields
- **Arquivo:** `05-fields-grid.png`
- **Ação:** 
  1. Scroll até o grid de Fields
  2. Digite "texto" na busca
- **O que mostrar:** Fields filtrados

#### Screenshot 6: Grid de Rows
- **Arquivo:** `06-rows-grid.png`
- **Ação:**
  1. Limpe a busca de Fields
  2. Scroll até grid de Rows
  3. Expanda o primeiro card (clique no nome)
- **O que mostrar:** Card expandido com campo "Texto"

#### Screenshot 7: Editor de Posição
- **Arquivo:** `07-editor-posicao.png`
- **Ação:**
  1. No card expandido, edite:
     - X: `43,50`
     - Y: `52,00`
- **O que mostrar:** Inputs editados

#### Screenshot 8: Offset Global
- **Arquivo:** `08-offset-global.png`
- **Ação:**
  1. Scroll até "Offset Global"
  2. Digite:
     - X: `-0,5`
     - Y: `1,25`
- **O que mostrar:** Painel com valores preenchidos

#### Screenshot 9: Offset Aplicado
- **Arquivo:** `09-offset-aplicado.png`
- **Ação:** Clique em "Aplicar Offset a Todas as Rows"
- **Aguarde:** ~1 segundo
- **O que mostrar:** Grid de Rows com valores atualizados

#### Screenshot 10: Modo Atualizar
- **Arquivo:** `10-modo-atualizar.png`
- **Ação:**
  1. Scroll para o topo
  2. Clique no radio "Atualizar Produtos Existentes"
  3. Digite IDs: `123, 456, 789`
- **O que mostrar:** Modo Atualizar ativo

#### Screenshot 11: Preview
- **Arquivo:** `11-preview.png`
- **Ação:** Clique em "✨ Gerar prévia" (se disponível)
- **Aguarde:** ~2 segundos
- **O que mostrar:** Preview visual do produto

#### Screenshot 12: Botão Aplicar
- **Arquivo:** `12-botao-aplicar.png`
- **Ação:** Scroll até o final
- **O que mostrar:** Botão "Criar Novo Produto" ou "Atualizar Produtos"

---

## 💾 Salvar screenshots

Salve todas em:
```
public/screenshots/
```

---

## 🎨 Opcional: Otimizar imagens

Após capturar todas:

```bash
cd public/screenshots/

# Comprimir (precisa ter imagemagick)
for img in *.png; do
  convert "$img" -quality 85 -strip "optimized-$img"
done
```

Ou use ferramentas online:
- https://tinypng.com/
- https://squoosh.app/

---

## ✅ Checklist

- [ ] 01-interface-inicial.png
- [ ] 02-modo-criar.png
- [ ] 03-produto-base.png
- [ ] 04-conteudo-carregado.png
- [ ] 05-fields-grid.png
- [ ] 06-rows-grid.png
- [ ] 07-editor-posicao.png
- [ ] 08-offset-global.png
- [ ] 09-offset-aplicado.png
- [ ] 10-modo-atualizar.png
- [ ] 11-preview.png
- [ ] 12-botao-aplicar.png

---

**Tempo estimado:** 15-20 minutos
