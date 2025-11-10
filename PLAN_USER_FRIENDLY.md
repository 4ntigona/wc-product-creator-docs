# 📝 Planejamento: Documentação User-Friendly

> Branch: `docs/user-friendly`  
> Objetivo: Criar documentação acessível para usuários não-técnicos (cliente final)

---

## 🎯 Princípios Norteadores

### ✅ O que FAZER:
- Usar linguagem simples e direta
- Explicar com exemplos visuais (screenshots reais)
- Focar em **o que fazer** e não **como funciona tecnicamente**
- Usar analogias do mundo real ("como copiar e colar no Word")
- Incluir casos de uso reais do negócio (ID Bags)
- Antecipar dúvidas comuns

### ❌ O que EVITAR:
- Jargão técnico: "AJAX", "endpoint", "meta keys", "payload", "nonce"
- Arquitetura de código: transformações, sanitizadores, etc.
- Referências a desenvolvimento: PHP, JavaScript, hooks, etc.
- Assumir conhecimento prévio de WordPress ou WooCommerce

---

## 📂 Estrutura de Conteúdo

```
src/content/docs/
├── index.mdx (Homepage simplificada)
├── comecando/
│   ├── o-que-faz.mdx
│   ├── requisitos.mdx
│   └── primeiro-acesso.mdx
├── tutoriais/
│   ├── criar-primeira-bolsa.mdx (com Steps + screenshots)
│   ├── atualizar-varias.mdx
│   ├── mudar-posicoes.mdx
│   ├── usar-preview.mdx
│   └── ajuste-rapido.mdx
├── dicas/
│   ├── quando-usar-cada-modo.mdx
│   ├── organizar-gravacoes.mdx
│   └── evitar-erros.mdx
└── ajuda/
    ├── problemas-comuns.mdx
    └── perguntas-frequentes.mdx
```

---

## 📄 Páginas Detalhadas

### Homepage (index.mdx)

**Tom:** Acolhedor, direto, sem floreios

**Conteúdo:**
```mdx
---
title: Bem-vindo!
description: Aprenda a duplicar e personalizar suas bolsas ID Bags
template: splash
hero:
  tagline: Crie novas versões das suas bolsas em minutos, sem complicação.
  actions:
    - text: Começar agora
      link: /comecando/o-que-faz/
      icon: right-arrow
      variant: primary
---

## O que você vai aprender

<CardGrid>
  <Card title="🎒 Criar nova bolsa" icon="document">
    Copie um modelo e faça as personalizações que quiser.
  </Card>
  <Card title="♻️ Atualizar várias" icon="refresh">
    Mude as gravações de várias bolsas de uma vez.
  </Card>
  <Card title="📐 Ajustar posições" icon="setting">
    Mova os textos e símbolos para onde precisar.
  </Card>
  <Card title="👀 Ver antes de aplicar" icon="preview">
    Confira como vai ficar antes de salvar.
  </Card>
</CardGrid>
```

---

### Começando / O que faz (comecando/o-que-faz.mdx)

**Objetivo:** Explicar em **30 segundos** o que o plugin faz

**Conteúdo:**
```mdx
---
title: O que este plugin faz?
description: Entenda em 1 minuto
---

Imagine que você tem uma **bolsa modelo** (tipo ID Bags - Base) com todas as gravações configuradas:

- Textos personalizados
- Símbolos
- Cores dourada, prateada, natural...

Este plugin permite que você **copie esse modelo** e crie novas versões rapidamente.

## Exemplo prático

Você tem:
- **ID Bags - Base** com gravação "ANA" em dourado

Quer criar:
- **ID Bags - Rosa** com a **mesma** gravação
- **ID Bags - Azul** com a **mesma** gravação

**Sem o plugin:** Você teria que configurar tudo manualmente em cada bolsa (20 minutos cada).

**Com o plugin:** Você cria as duas novas bolsas em 2 minutos.

---

## Duas formas de usar

### Modo Criar 🆕
Use quando você quer **criar uma bolsa nova** copiando de um modelo.

**Exemplo:** Criar "ID Bags - Rosa" baseada em "ID Bags - Base"

### Modo Atualizar ♻️
Use quando você quer **modificar bolsas que já existem**.

**Exemplo:** Mudar a posição da gravação em 10 bolsas de uma vez

---

:::tip[Dica rápida]
Se você só precisa criar **uma bolsa nova**, use o **Modo Criar**.

Se você precisa mudar **várias bolsas de uma vez**, use o **Modo Atualizar**.
:::
```

---

### Tutorial / Criar Primeira Bolsa (tutoriais/criar-primeira-bolsa.mdx)

**Objetivo:** Guia passo-a-passo com screenshots reais

**Conteúdo:**
```mdx
---
title: Criar sua primeira bolsa
description: Passo a passo completo com imagens
---

import { Steps } from '@astrojs/starlight/components';

Vamos criar uma nova bolsa chamada **"ID Bags - Rosa"** baseada no modelo **"ID Bags - Base"**.

---

<Steps>

1. **Abra o plugin**

   No painel do WordPress, vá em **Produtos** → **Product Creator**.

   ![Interface inicial](../../../screenshots/01-interface-inicial.png)

2. **Escolha o modo "Criar"**

   Clique no botão **"Criar Novo Produto"**.

   ![Modo Criar selecionado](../../../screenshots/02-modo-criar.png)

3. **Escolha o modelo base**

   No campo **"ID do produto base"**, digite o número da bolsa modelo.

   **Dica:** Para encontrar o ID, abra a bolsa modelo e olhe na URL:
   ```
   /wp-admin/post.php?post=15710&action=edit
                           ^^^^^
                           Este é o ID
   ```

   ![Produto base preenchido](../../../screenshots/03-produto-base.png)

4. **Carregue as gravações**

   Clique no botão azul **"Carregar conteúdo do produto base"**.

   Aguarde alguns segundos. Você verá duas listas:
   - **Campos** (textos, símbolos, cores)
   - **Linhas** (posições das gravações)

   ![Conteúdo carregado](../../../screenshots/04-conteudo-carregado.png)

5. **Escolha o que copiar** (opcional)

   Por padrão, tudo será copiado. Mas você pode desmarcar itens que **não** quer copiar.

   **Exemplo:** Se você não quer o campo "Símbolo", desmarque a caixinha dele.

6. **Dê um nome para a nova bolsa**

   No campo **"Nome do novo produto"**, digite:
   ```
   ID Bags - Rosa
   ```

7. **Escolha a imagem**

   No campo **"ID da thumbnail"**, digite o ID da foto da bolsa rosa.

   **Dica:** Você pode encontrar o ID na biblioteca de mídia.

8. **Clique em "Criar Novo Produto"**

   Pronto! A nova bolsa foi criada com todas as gravações copiadas.

   Você verá uma mensagem de sucesso com um link para editar a nova bolsa.

</Steps>

---

## ✅ Pronto!

Agora você tem uma nova bolsa **"ID Bags - Rosa"** com todas as personalizações da bolsa base.

**Próximo passo:** [Aprender a mudar posições das gravações](/tutoriais/mudar-posicoes/)
```

---

### Tutorial / Mudar Posições (tutoriais/mudar-posicoes.mdx)

**Objetivo:** Ensinar a editar apenas X e Y

**Conteúdo:**
```mdx
---
title: Mudar posição das gravações
description: Mova textos e símbolos para onde quiser
---

Às vezes, a gravação fica um pouco fora do lugar. Você pode ajustar a posição facilmente.

---

## O que você pode mudar

:::caution[Importante]
Você só pode mudar **onde** a gravação aparece (posição X e Y).

**Não é possível** mudar:
- Tamanho da fonte
- Cor
- Largura/altura
- Rotação

Essas configurações são **herdadas** da bolsa modelo.
:::

---

## Ajustar uma gravação específica

<Steps>

1. **Carregue o conteúdo** da bolsa base (como no tutorial anterior)

2. **Encontre a linha que quer mover**

   Role até a seção **"Rows disponíveis"**.

   Clique no cartão da linha. Por exemplo: **"Linha 0: Texto"**

   ![Grid de Rows](../../../screenshots/06-rows-grid.png)

3. **Edite os valores**

   Você verá dois campos:
   - **X** (posição horizontal - esquerda/direita)
   - **Y** (posição vertical - cima/baixo)

   ![Editor de posição](../../../screenshots/07-editor-posicao.png)

4. **Digite os novos valores**

   **Exemplo:**
   - X: `43,50` (vírgula como separador decimal)
   - Y: `52,00`

   **Dica:** Números maiores movem para a direita/baixo. Números menores movem para esquerda/cima.

5. **Aplique as mudanças**

   Role até o final e clique em **"Criar Novo Produto"** ou **"Atualizar Produtos"**.

</Steps>

---

## Mover TODAS as gravações de uma vez

Se você quer ajustar **todas** as linhas pelo mesmo valor (exemplo: mover tudo 1cm para a esquerda), use o **Offset Global**.

<Steps>

1. **Role até "Offset Global"**

   ![Painel de Offset Global](../../../screenshots/08-offset-global.png)

2. **Digite o valor do ajuste**

   **Exemplo:** Para mover tudo 0,5cm para a esquerda e 1,25cm para cima:
   - X: `-0,5` (negativo = esquerda)
   - Y: `1,25` (positivo = cima)

3. **Clique em "Aplicar Offset a Todas as Rows"**

   Todas as linhas serão ajustadas automaticamente.

   ![Offset aplicado](../../../screenshots/09-offset-aplicado.png)

</Steps>

---

## 🎯 Dicas práticas

- **Teste com valores pequenos:** Comece com `0,5` ou `1,0` e veja o resultado
- **Use a vírgula:** O plugin aceita `0,5` ou `0.5` (ambos funcionam)
- **Confira antes de aplicar:** Use o [Preview](/tutoriais/usar-preview/) para ver como vai ficar

---

**Próximo tutorial:** [Como usar o Preview](/tutoriais/usar-preview/)
```

---

## 🎨 Componentes Visuais

### Cards informativos
```mdx
<Card title="✅ Quando usar" icon="approve-check">
  Use o Modo Criar quando você quer fazer uma bolsa nova do zero.
</Card>

<Card title="⚠️ Atenção" icon="warning">
  Você não pode mudar cores ou tamanhos. Apenas posições.
</Card>
```

### Asides (caixas de destaque)
```mdx
:::tip[Dica de produtividade]
Salve os IDs dos seus produtos base num documento. Assim você não precisa procurar toda vez.
:::

:::caution[Cuidado]
Sempre teste numa bolsa de teste antes de aplicar em produtos reais.
:::

:::note[Saiba mais]
Quer entender como funciona tecnicamente? Veja a [documentação técnica](https://github.com/4ntigona/wc-product-creator-docs).
:::
```

### Steps (passos numerados)
```mdx
<Steps>
1. Primeiro passo
2. Segundo passo
3. Terceiro passo
</Steps>
```

---

## 📊 Métricas de Sucesso

### Objetivo: Usuário consegue criar primeira bolsa em **< 5 minutos**

**Como medir:**
- Tempo médio de leitura do tutorial
- Taxa de conclusão do tutorial
- Feedbacks/dúvidas da cliente

---

## 🚀 Próximas Etapas (após Phase 2)

### Phase 3: Escrever conteúdo
1. **Homepage** (index.mdx)
2. **Começando** (3 páginas)
3. **Tutoriais** (5 páginas) ← **PRIORIDADE**
4. **Dicas** (3 páginas)
5. **Ajuda** (2 páginas)

### Phase 4: Refinamento
1. Atualizar `astro.config.mjs` sidebar (remover seções técnicas)
2. Revisar linguagem (eliminar jargões residuais)
3. Testar navegação completa
4. Obter feedback da cliente
5. Ajustes finais

---

**Status atual:** ✅ Phase 1 completa (setup + automação screenshots)  
**Próximo passo:** Phase 2 - Executar `npm run screenshots`
