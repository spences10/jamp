<script lang="ts">
	import { Footer, Header } from '$lib';
	import { onMount } from 'svelte';
	import '../app.css';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	let theme = $state<'light' | 'dark'>('light');

	onMount(() => {
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

<div class="flex min-h-screen flex-col" data-theme={theme}>
	<Header {theme} {toggle_theme} />
	<main class="flex-grow">
		{@render children?.()}
	</main>
	<Footer />
</div>
