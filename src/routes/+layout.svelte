<script lang="ts">
	import Footer from '$lib/footer.svelte'
	import Header from '$lib/header.svelte'
	import { onMount } from 'svelte'
	import { themeChange } from 'theme-change'
	import '../app.postcss'

	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()

	onMount(async () => {
		themeChange(false)
	})
</script>

<div class="flex flex-col min-h-screen">
	<Header />
	<main class="flex-grow">
		{@render children?.()}
	</main>
	<Footer />
</div>
