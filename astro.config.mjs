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
					label: 'Começando',
					items: [
						{ label: 'O que o plugin faz?', slug: 'comecando/o-que-faz' },
						{ label: 'Requisitos', slug: 'comecando/requisitos' },
						{ label: 'Primeiro acesso', slug: 'comecando/primeiro-acesso' },
					],
				},
				{
					label: 'Tutoriais',
					items: [
						{ label: 'Criar sua primeira bolsa', slug: 'tutoriais/criar-primeira-bolsa' },
						{ label: 'Atualizar várias bolsas', slug: 'tutoriais/atualizar-varias' },
						{ label: 'Ajustar posições', slug: 'tutoriais/mudar-posicoes' },
						{ label: 'Visualizar antes de aplicar', slug: 'tutoriais/usar-preview' },
					],
				},
				{
					label: 'Dicas',
					items: [
						{ label: 'Quando usar cada modo', slug: 'dicas/quando-usar-cada-modo' },
					],
				},
				{
					label: 'Ajuda',
					items: [
						{ label: 'Problemas comuns', slug: 'ajuda/problemas-comuns' },
						{ label: 'Perguntas frequentes', slug: 'ajuda/perguntas-frequentes' },
					],
				},
			],
			// customCss: ['./src/styles/custom.css'],
		}),
	],
});

