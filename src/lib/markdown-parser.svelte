<script>
	import { marked } from 'marked'
	export let markdownContent = `# Hello World\n\nWrite markdown here\n\n`
	export let rows = 10
	$: markdown = marked(markdownContent)
</script>

<div
	class="mx-auto mb-10 grid p-10 gap-4 md:gap-10 md:grid-cols-2 md:grid-rows-1"
>
	<textarea
		{rows}
		bind:value={markdownContent}
		class="border rounded-box h-full bg-base-200 shadow-2xl text-xl w-full p-2 resize-none"
	/>

	<div
		class="bg-secondary text-secondary-content shadow-2xl rounded-box w-full p-2 prose" 
	>
		{@html markdown}
	</div>
</div>
