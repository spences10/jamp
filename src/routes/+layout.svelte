<script lang="ts">
	import { Footer, Header } from '$lib';
	import '../app.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	let theme = $state<'light' | 'dark'>('light');

	$effect(() => {
		// Check system preference
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		}
		// Check localStorage
		const stored_theme = localStorage.getItem('theme') as
			| 'light'
			| 'dark';
		if (stored_theme) {
			theme = stored_theme;
		}
	});

	function toggle_theme() {
		theme = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', theme);
	}
</script>

<div
	class="from-base-100 to-base-300 min-h-screen bg-gradient-to-br transition-colors duration-300"
	data-theme={theme}
>
	<div class="bg-grid-pattern flex min-h-screen flex-col">
		<Header {theme} {toggle_theme} />
		<main class="flex-grow">
			{@render children?.()}
		</main>
		<Footer />
	</div>
</div>

<style>
	.bg-grid-pattern {
		background-image: radial-gradient(
			rgba(128, 128, 128, 0.1) 1px,
			transparent 1px
		);
		background-size: 24px 24px;
	}
</style>
