<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';
	import './prism.css';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="system" />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
