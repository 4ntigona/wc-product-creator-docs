/**
 * Teste de Password Protection
 * Uso: node scripts/test-password.js
 */

import puppeteer from 'puppeteer';

const CONFIG = {
  baseURL: 'https://idbags.top',
  frontendPassword: 'idtop.bags',
};

async function testPassword() {
  console.log('🔍 Testando password protection...\n');
  
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500, // Bem devagar para ver
  });
  
  const page = await browser.newPage();
  
  // Vai para a home
  console.log('→ Acessando', CONFIG.baseURL);
  await page.goto(CONFIG.baseURL, { waitUntil: 'networkidle2' });
  
  await page.screenshot({ path: '/tmp/test-01-inicial.png' });
  console.log('✓ Screenshot 1 salva: /tmp/test-01-inicial.png');
  
  // Aguarda 2 segundos para ver
  await new Promise(r => setTimeout(r, 2000));
  
  // Procura campo de senha
  console.log('\n→ Procurando campo de senha...');
  
  const hasPasswordField = await page.$('#password_protected_pass');
  
  if (hasPasswordField) {
    console.log('✓ Campo encontrado!');
    
    // Preenche
    console.log('→ Digitando senha...');
    await page.type('#password_protected_pass', CONFIG.frontendPassword);
    
    await page.screenshot({ path: '/tmp/test-02-senha-digitada.png' });
    console.log('✓ Screenshot 2 salva: /tmp/test-02-senha-digitada.png');
    
    // Aguarda 2 segundos
    await new Promise(r => setTimeout(r, 2000));
    
    // Procura botão
    console.log('\n→ Procurando botão de submit...');
    const submitBtn = await page.$('input[type="submit"]') ||
                      await page.$('button[type="submit"]');
    
    if (submitBtn) {
      console.log('✓ Botão encontrado! Clicando...');
      
      // Clica e aguarda a rede ficar idle (sem esperar navegação formal)
      await Promise.all([
        submitBtn.click(),
        page.waitForNetworkIdle({ timeout: 10000 }).catch(() => console.log('⚠ Network idle timeout, continuando...')),
      ]);
      
      // Aguarda 2 segundos extra para garantir
      await new Promise(r => setTimeout(r, 2000));
      
    } else {
      console.log('⚠ Botão não encontrado. Tentando Enter...');
      await page.keyboard.press('Enter');
      await page.waitForNetworkIdle({ timeout: 10000 }).catch(() => {});
      await new Promise(r => setTimeout(r, 2000));
    }
    
    console.log('→ Página processada');
    
    await page.screenshot({ path: '/tmp/test-03-apos-submit.png' });
    console.log('✓ Screenshot 3 salva: /tmp/test-03-apos-submit.png');
    
    // Aguarda mais 2 segundos para redirect completo
    await new Promise(r => setTimeout(r, 2000));
    
    // Verifica se passou
    const currentUrl = page.url();
    console.log('\n→ URL atual:', currentUrl);
    
    try {
      const pageTitle = await page.title();
      console.log('→ Título:', pageTitle);
    } catch (e) {
      console.log('⚠ Não foi possível pegar título (página navegando)');
    }
    
    // Aguarda 3 segundos para ver resultado
    await new Promise(r => setTimeout(r, 3000));
    
  } else {
    console.log('✗ Campo de senha NÃO encontrado!');
    console.log('→ HTML da página:');
    const html = await page.content();
    console.log(html.substring(0, 1000));
  }
  
  await browser.close();
  console.log('\n✓ Teste concluído!');
}

testPassword().catch(console.error);
