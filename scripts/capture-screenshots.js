/**
 * Automated Screenshot Capture - WC Product Creator Plugin
 * 
 * Captura screenshots automáticas da interface do plugin usando dados reais
 * do produto ID Bags - Base (produto 15710) com 35 símbolos e 13 layout rows.
 * 
 * Uso: node scripts/capture-screenshots.js
 */

import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const CONFIG = {
  // Production environment
  baseURL: 'https://idbags.top',
  
  // Frontend password (password-protected site)
  frontendPassword: 'idtop.bags',
  
  // WordPress admin credentials
  username: 'rivera',
  password: 'elvira666',
  
  // Produto real: ID Bags - Base
  baseProductID: '15710',
  
  // IDs de campos reais (do _wapf_fieldgroup.txt)
  fieldIDs: {
    addCustomization: '66c3a36cbc096', // "Adicionar personalização?"
    customizationType: '66c340da6ea57', // Tipo de personalização (Texto/Símbolo/etc)
    text: '66bfc001dc47c', // Campo de texto
    textLength: '66d1fb8f8c05d', // Comprimento do texto
    textShort: '66d1fbe67b2f0', // Texto central (curto)
    textMedium: '66d1fc10735fa', // Texto central (médio)
    textLong: '66d1fc1ef2eef', // Texto central (longo)
    symbol: '66c36162c3f1d', // Símbolo selecionado
    fontSize: '66c5233939291', // Tamanho da fonte
    color: '66c36e8b53437', // Cor da gravação
  },
  
  // Opções reais (slugs dos campos)
  options: {
    // Adicionar personalização
    yes: 'qq8fm', // "+"
    no: '6mppf', // "_"
    
    // Tipos de personalização
    text: 'ash2j', // "Texto"
    symbol: 'kc6za', // "Símbolo"
    textWithStars: '8w5pt', // "★ Texto ★"
    textWithHearts: 'zlt50', // "♥ Texto ♥"
    
    // Comprimento do texto
    short: 'gmr28', // "Curto (até 3 caracteres)"
    medium: 'g52t7', // "Médio (até 5 caracteres)"
    long: 'vfzf8', // "Longo (até 8 caracteres)"
    
    // Símbolos populares (de 35 símbolos disponíveis)
    symbols: {
      dragonfly: '7li5x', // libélula
      bee: '0vwfz', // abelha
      butterfly: '7rr4g', // borboleta
      palm: '2n11z', // palmeira
      pineapple: '6xvnw', // abacaxi
      heartOutline: 'cr87i', // coracao_outline
      heartInfinity: 'bz98m', // coracao_infinito
      heartAmour: 'w8tq2', // coracao_amour
      heartFilled: 'tormg', // coracao_cheio
      peace: '60avk', // paz
      infinity: 'zm9sw', // infinito
      airplane: 'mrk9h', // aviao
    },
    
    // Tamanhos de fonte
    fontStandard: 'rvgmx', // "Padrão (6,8mm)"
    fontSmall: 'nfzgo', // "Pequena (4,8mm)"
    
    // Cores
    colors: {
      gold: 'e9gpo', // "Dourada" #E5C973
      silver: '2zkj7', // "Prateada" #B2B2B2
      natural: 'w3l79', // "Natural" #552806
      black: 'vb7jp', // "Preta" #000000
      dryRelief: 'dgbnt', // "Relevo seco" (sem cor)
    },
  },
  
  // Diretório de saída das screenshots
  outputDir: path.join(__dirname, '..', 'public', 'screenshots'),
  
  // Viewport settings
  viewport: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2, // Retina display for better quality
  },
  
  // Timeouts (em ms)
  timeouts: {
    navigation: 30000,
    wait: 2000,
    ajax: 5000,
  },
};

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Aguarda um tempo específico
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Log colorido para terminal
 */
const log = {
  info: (msg) => console.log(`\x1b[36mℹ ${msg}\x1b[0m`),
  success: (msg) => console.log(`\x1b[32m✓ ${msg}\x1b[0m`),
  error: (msg) => console.log(`\x1b[31m✗ ${msg}\x1b[0m`),
  step: (msg) => console.log(`\x1b[33m→ ${msg}\x1b[0m`),
};

/**
 * Salva screenshot com nome organizado
 */
async function saveScreenshot(page, name, description) {
  const filename = `${name}.png`;
  const filepath = path.join(CONFIG.outputDir, filename);
  
  await page.screenshot({
    path: filepath,
    fullPage: false, // Captura apenas viewport (mais rápido e relevante)
  });
  
  log.success(`Screenshot salvo: ${filename}`);
  log.info(`  Descrição: ${description}`);
  
  return filepath;
}

/**
 * Espera AJAX completar (aguarda requests de rede)
 */
async function waitForAjax(page, timeout = CONFIG.timeouts.ajax) {
  try {
    await page.waitForNetworkIdle({ timeout });
  } catch (err) {
    log.info('Network idle timeout - continuando...');
  }
}

// ============================================================================
// SETUP & TEARDOWN
// ============================================================================

/**
 * Inicializa browser e página
 */
async function setupBrowser() {
  log.info('Inicializando browser Puppeteer...');
  
  const browser = await puppeteer.launch({
    headless: 'new', // Volta para modo headless
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    ignoreHTTPSErrors: false,
  });
  
  const page = await browser.newPage();
  
  // Define viewport
  await page.setViewport(CONFIG.viewport);
  
  // Define user agent realista
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );
  
  log.success('Browser inicializado');
  
  return { browser, page };
}

/**
 * Lida com password protection do WordPress (se houver)
 */
async function handlePasswordProtection(page) {
  log.step('Verificando password protection...');
  
  try {
    // Aguarda formulário de senha com o seletor correto
    await page.waitForSelector('#password_protected_pass', { 
      timeout: 3000 
    });
    
    log.info('Site protegido por senha - inserindo...');
    
    // Preenche o campo de senha
    await page.type('#password_protected_pass', CONFIG.frontendPassword);
    
    // Procura botão de submit (próximo ao campo de senha)
    const submitBtn = await page.$('input[type="submit"]') || 
                      await page.$('button[type="submit"]') ||
                      await page.$('form input[value]'); // Qualquer input no form
    
    if (submitBtn) {
      // Clica e aguarda a rede ficar idle (sem esperar navegação formal)
      await Promise.all([
        submitBtn.click(),
        page.waitForNetworkIdle({ timeout: 10000 }).catch(() => log.warn('Network idle timeout, continuando...')),
      ]);
      await new Promise(r => setTimeout(r, 3000)); // Espera 3s para redirect completo
      log.success('Password aceito');
    } else {
      // Se não achar botão, tenta dar Enter no campo
      await page.keyboard.press('Enter');
      await page.waitForNetworkIdle({ timeout: 10000 }).catch(() => {});
      await new Promise(r => setTimeout(r, 3000));
      log.success('Password enviado via Enter');
    }
  } catch (error) {
    // Sem password protection ou já autenticado
    log.info('Sem password protection ou já autenticado');
  }
}

/**
 * Faz login no WordPress admin
 */
async function loginToWordPress(page) {
  log.step('Fazendo login no WordPress...');
  
  // Navega direto para admin (sem password protection)
  const loginURL = `${CONFIG.baseURL}/wp-admin`;
  
  try {
    await page.goto(loginURL, {
      waitUntil: 'load',
      timeout: CONFIG.timeouts.navigation,
    });
    
    // Aguarda extra para garantir que carregou
    await sleep(CONFIG.timeouts.wait);
    
  } catch (error) {
    log.error(`Erro ao carregar página de login: ${error.message}`);
    log.info('Tentando continuar mesmo com erro...');
  }
  
  // Aguarda o formulário de login ou página admin
  try {
    await page.waitForSelector('#user_login, body.wp-admin', { timeout: 5000 });
  } catch (error) {
    log.error('Nem formulário de login nem admin page encontrados');
    throw error;
  }
  
  // Verifica se já está logado
  const isLoggedIn = await page.evaluate(() => {
    return document.body.classList.contains('wp-admin');
  });
  
  if (isLoggedIn) {
    log.info('Já está logado no WordPress');
    return;
  }
  
  // Verifica se formulário de login existe
  const hasLoginForm = await page.$('#user_login');
  if (!hasLoginForm) {
    log.error('Formulário de login não encontrado');
    throw new Error('Login form not found');
  }
  
  // Preenche formulário de login
  await page.type('#user_login', CONFIG.username);
  await page.type('#user_pass', CONFIG.password);
  await page.click('#wp-submit');
  
  // Aguarda navegação após login
  await page.waitForNavigation({
    waitUntil: 'networkidle2',
    timeout: CONFIG.timeouts.navigation,
  });
  
  log.success('Login realizado com sucesso');
}

/**
 * Navega para a página do plugin
 */
async function navigateToPluginPage(page) {
  log.step('Navegando para a página do plugin...');
  
  // CORRIGIDO: hífen, não underscore!
  const pluginURL = `${CONFIG.baseURL}/wp-admin/admin.php?page=wc-product-creator`;
  
  log.info(`URL do plugin: ${pluginURL}`);
  
  // Navega direto para a página do plugin
  await page.goto(pluginURL, {
    waitUntil: 'networkidle2',
    timeout: CONFIG.timeouts.navigation,
  });
  
  await sleep(CONFIG.timeouts.wait);
  
  // Verifica se página carregou corretamente
  const hasPermissionError = await page.evaluate(() => {
    const body = document.body.textContent || '';
    return body.includes('Sem permissão') || body.includes('não tem permissão');
  });
  
  if (hasPermissionError) {
    log.error('❌ ERRO: Página mostra mensagem de permissão!');
    throw new Error('Sem permissão para acessar a página do plugin. Verifique se o usuário tem role Administrator.');
  }
  
  log.success('Página do plugin carregada');
}

// ============================================================================
// SCREENSHOT SCENARIOS
// ============================================================================

/**
 * Captura 1: Interface inicial do plugin
 */
async function capture01_PluginInterface(page) {
  log.step('[1/12] Capturando interface inicial...');
  
  await navigateToPluginPage(page);
  
  await saveScreenshot(
    page,
    '01-interface-inicial',
    'Página principal do plugin mostrando modos Criar/Atualizar'
  );
  
  await sleep(CONFIG.timeouts.wait);
}

/**
 * Captura 2: Modo "Criar" selecionado
 */
async function capture02_CreateMode(page) {
  log.step('[2/12] Capturando modo Criar...');
  
  // Seleciona modo "Criar"
  await page.evaluate(() => {
    const radioCreate = document.querySelector('input[name="mode"][value="create"]');
    if (radioCreate) radioCreate.click();
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  await saveScreenshot(
    page,
    '02-modo-criar',
    'Modo "Criar Novo Produto" selecionado com campos de nome e thumbnail'
  );
}

/**
 * Captura 3: Seletor de produto base
 */
async function capture03_ProductSelector(page) {
  log.step('[3/12] Capturando seletor de produto base...');
  
  // Preenche ID do produto base
  await page.evaluate((productID) => {
    const input = document.querySelector('#base_product_id');
    if (input) {
      input.value = productID;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, CONFIG.baseProductID);
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  await saveScreenshot(
    page,
    '03-produto-base',
    'ID do produto base (15710 - ID Bags) preenchido'
  );
}

/**
 * Captura 4: Conteúdo carregado (fields & rows)
 */
async function capture04_LoadedContent(page) {
  log.step('[4/12] Capturando conteúdo carregado...');
  
  // Clica no botão "Carregar conteúdo"
  await page.evaluate(() => {
    const btn = document.querySelector('#load-content-btn');
    if (btn) btn.click();
  });
  
  // Aguarda AJAX completar
  await waitForAjax(page);
  await sleep(CONFIG.timeouts.wait);
  
  await saveScreenshot(
    page,
    '04-conteudo-carregado',
    'Grids de Fields e Rows carregados do produto base com 15 campos e 9 linhas de layout'
  );
}

/**
 * Captura 5: Grid de Fields com busca
 */
async function capture05_FieldsGrid(page) {
  log.step('[5/12] Capturando grid de Fields com busca...');
  
  // Scroll até o grid de fields
  await page.evaluate(() => {
    const fieldsGrid = document.querySelector('#fields-grid');
    if (fieldsGrid) {
      fieldsGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  // Faz busca por "texto"
  await page.evaluate(() => {
    const searchInput = document.querySelector('#fields-grid input[type="search"]');
    if (searchInput) {
      searchInput.value = 'texto';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  await saveScreenshot(
    page,
    '05-fields-grid',
    'Grid de Fields com busca ativa filtrando por "texto"'
  );
}

/**
 * Captura 6: Grid de Rows com cards expandidos
 */
async function capture06_RowsGrid(page) {
  log.step('[6/12] Capturando grid de Rows...');
  
  // Limpa busca anterior
  await page.evaluate(() => {
    const searchInput = document.querySelector('#fields-grid input[type="search"]');
    if (searchInput) {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  // Scroll até o grid de rows
  await page.evaluate(() => {
    const rowsGrid = document.querySelector('#rows-grid');
    if (rowsGrid) {
      rowsGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  // Expande primeiro card (row 0)
  await page.evaluate(() => {
    const firstDetails = document.querySelector('#rows-grid details');
    if (firstDetails) firstDetails.open = true;
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  await saveScreenshot(
    page,
    '06-rows-grid',
    'Grid de Rows com card expandido mostrando campo "Texto" e badge de cores'
  );
}

/**
 * Captura 7: Editor de posição de uma row
 */
async function capture07_RowEditor(page) {
  log.step('[7/12] Capturando editor de posição...');
  
  // Garante que row 0 está expandida
  await page.evaluate(() => {
    const firstDetails = document.querySelector('#rows-grid details');
    if (firstDetails) firstDetails.open = true;
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  // Edita valores de X e Y
  await page.evaluate(() => {
    const rowCard = document.querySelector('#rows-grid details[open]');
    if (!rowCard) return;
    
    const xInput = rowCard.querySelector('input[data-key="x"]');
    const yInput = rowCard.querySelector('input[data-key="y"]');
    
    if (xInput) {
      xInput.value = '43,50';
      xInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    if (yInput) {
      yInput.value = '52,00';
      yInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  await saveScreenshot(
    page,
    '07-editor-posicao',
    'Editor de posição com valores X e Y editáveis (43,50 e 52,00)'
  );
}

/**
 * Captura 8: Painel de Offset Global
 */
async function capture08_GlobalOffset(page) {
  log.step('[8/12] Capturando painel de Offset Global...');
  
  // Scroll até o painel de offset
  await page.evaluate(() => {
    const offsetPanel = document.querySelector('#global-offset');
    if (offsetPanel) {
      offsetPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  // Preenche valores de offset
  await page.evaluate(() => {
    const xOffset = document.querySelector('#offset-x');
    const yOffset = document.querySelector('#offset-y');
    
    if (xOffset) {
      xOffset.value = '-0,5';
      xOffset.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    if (yOffset) {
      yOffset.value = '1,25';
      yOffset.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  await saveScreenshot(
    page,
    '08-offset-global',
    'Painel de Offset Global com valores X=-0,5 e Y=1,25 para ajustar todas as rows de uma vez'
  );
}

/**
 * Captura 9: Aplicar Offset (visualização após aplicar)
 */
async function capture09_OffsetApplied(page) {
  log.step('[9/12] Capturando offset aplicado...');
  
  // Clica no botão "Aplicar Offset"
  await page.evaluate(() => {
    const applyBtn = document.querySelector('#apply-offset-btn');
    if (applyBtn) applyBtn.click();
  });
  
  await sleep(CONFIG.timeouts.wait);
  
  // Scroll de volta para o grid de rows para mostrar mudanças
  await page.evaluate(() => {
    const rowsGrid = document.querySelector('#rows-grid');
    if (rowsGrid) {
      rowsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  await saveScreenshot(
    page,
    '09-offset-aplicado',
    'Grid de Rows após aplicar offset global - valores X/Y atualizados'
  );
}

/**
 * Captura 10: Modo "Atualizar" com múltiplos produtos
 */
async function capture10_UpdateMode(page) {
  log.step('[10/12] Capturando modo Atualizar...');
  
  // Scroll de volta ao topo
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(CONFIG.timeouts.wait / 2);
  
  // Seleciona modo "Atualizar"
  await page.evaluate(() => {
    const radioUpdate = document.querySelector('input[name="mode"][value="update"]');
    if (radioUpdate) radioUpdate.click();
  });
  
  await sleep(CONFIG.timeouts.wait);
  
  // Preenche IDs dos produtos alvo
  await page.evaluate(() => {
    const targetInput = document.querySelector('#target_product_ids');
    if (targetInput) {
      targetInput.value = '123, 456, 789';
      targetInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  await saveScreenshot(
    page,
    '10-modo-atualizar',
    'Modo "Atualizar Produtos Existentes" com IDs de produtos alvo (123, 456, 789)'
  );
}

/**
 * Captura 11: Preview do produto (simulação)
 */
async function capture11_Preview(page) {
  log.step('[11/12] Capturando preview...');
  
  // Scroll até área de preview (se existir)
  await page.evaluate(() => {
    const previewContainer = document.querySelector('#preview-container');
    if (previewContainer) {
      previewContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  // Clica no botão de preview (se disponível)
  const previewBtnExists = await page.evaluate(() => {
    const btn = document.querySelector('#generate-preview-btn');
    return !!btn;
  });
  
  if (previewBtnExists) {
    await page.evaluate(() => {
      const btn = document.querySelector('#generate-preview-btn');
      if (btn) btn.click();
    });
    
    await waitForAjax(page);
    await sleep(CONFIG.timeouts.wait);
  }
  
  await saveScreenshot(
    page,
    '11-preview',
    'Preview visual do produto com gravações posicionadas sobre a imagem'
  );
}

/**
 * Captura 12: Botão "Aplicar" e confirmação final
 */
async function capture12_ApplyButton(page) {
  log.step('[12/12] Capturando botão Aplicar...');
  
  // Scroll para o botão de aplicar
  await page.evaluate(() => {
    const applyBtn = document.querySelector('#apply-customization-btn');
    if (applyBtn) {
      applyBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await sleep(CONFIG.timeouts.wait / 2);
  
  await saveScreenshot(
    page,
    '12-botao-aplicar',
    'Botão final "Criar Novo Produto" pronto para executar a operação'
  );
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

/**
 * Função principal de execução
 */
async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('  WC Product Creator - Automated Screenshot Capture');
  console.log('  Produto: ID Bags - Base (15710)');
  console.log('  Total: 12 screenshots');
  console.log('='.repeat(80) + '\n');
  
  // Cria diretório de saída se não existir
  await fs.ensureDir(CONFIG.outputDir);
  log.success(`Diretório de saída: ${CONFIG.outputDir}`);
  
  let browser, page;
  
  try {
    // Setup
    ({ browser, page } = await setupBrowser());
    await loginToWordPress(page);
    
    // Capturas sequenciais
    await capture01_PluginInterface(page);
    await capture02_CreateMode(page);
    await capture03_ProductSelector(page);
    await capture04_LoadedContent(page);
    await capture05_FieldsGrid(page);
    await capture06_RowsGrid(page);
    await capture07_RowEditor(page);
    await capture08_GlobalOffset(page);
    await capture09_OffsetApplied(page);
    await capture10_UpdateMode(page);
    await capture11_Preview(page);
    await capture12_ApplyButton(page);
    
    console.log('\n' + '='.repeat(80));
    log.success('✨ Todas as screenshots foram capturadas com sucesso!');
    console.log('='.repeat(80) + '\n');
    
  } catch (error) {
    log.error(`Erro durante captura: ${error.message}`);
    console.error(error);
    process.exit(1);
    
  } finally {
    // Cleanup
    if (browser) {
      await browser.close();
      log.info('Browser fechado');
    }
  }
}

// Execute script
main();
