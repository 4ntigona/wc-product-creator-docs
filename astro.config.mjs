// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Opção A: Renderização SSG com rehype-mermaid (ATIVO)
import rehypeMermaid from '@beoe/rehype-mermaid';

// Opção B: Descomente após instalar remark-mermaidjs  
// import remarkMermaid from 'remark-mermaidjs';

// https://astro.build/config
export default defineConfig({
	// Opção A: Renderização SSG com rehype-mermaid (recomendado)
	markdown: {
		rehypePlugins: [
			[rehypeMermaid, {
				strategy: 'inline-svg',
				dark: true,
			}],
		],
	},
	
	// Opção B: Renderização SSG com remark-mermaidjs (alternativa)
	// markdown: {
	// 	remarkPlugins: [
	// 		[remarkMermaid, {
	// 			darkMode: true,
	// 		}],
	// 	],
	// },
	
	integrations: [
		starlight({
			title: 'WC Product Creator',
			description: 'Documentação completa do plugin WordPress para criação e atualização em lote de produtos WooCommerce customizáveis.',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Português',
					lang: 'pt-BR',
				},
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/4ntigona/wc-product-creator' },
			],
			sidebar: [
				{
					label: 'Início',
					items: [
						{ label: 'Visão Geral', slug: 'index' },
						{ label: 'Instalação', slug: 'inicio/instalacao' },
						{ label: 'Início Rápido', slug: 'inicio/inicio-rapido' },
					],
				},
				{
					label: 'Guias',
					autogenerate: { directory: 'guias' },
				},
				{
					label: 'Funcionalidades',
					autogenerate: { directory: 'funcionalidades' },
				},
				{
					label: 'Referência',
					autogenerate: { directory: 'referencia' },
				},
				{
					label: 'Arquitetura',
					autogenerate: { directory: 'arquitetura' },
				},
				{
					label: 'Desenvolvimento',
					autogenerate: { directory: 'desenvolvimento' },
				},
				{
					label: 'Solução de Problemas',
					autogenerate: { directory: 'solucao-problemas' },
				},
			],
			// customCss: ['./src/styles/custom.css'],
		}),
	],
});

