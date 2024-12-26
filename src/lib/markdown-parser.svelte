<script lang="ts">
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { marked } from 'marked';

	interface Props {
		markdownContent?: string;
		rows?: number;
	}

	let {
		markdownContent = $bindable(
			`# Hello World\n\nWrite markdown here\n\n\`\`\`javascript\n// Code example\nconst greeting = 'Hello World';\nconsole.log(greeting);\n\`\`\``,
		),
		rows = 10,
	}: Props = $props();

	let show_copied_toast = $state(false);

	// Configure marked with GitHub-flavoured markdown and syntax highlighting
	marked.setOptions({
		gfm: true,
		breaks: true,
		highlight: function (code: string, lang: string) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(code, { language: lang }).value;
				} catch (err) {
					console.error('Highlight.js error:', err);
				}
			}
			return code;
		},
	});

	let markdown = $derived(marked(markdownContent));
	let is_fullscreen = $state(false);

	function copy_to_clipboard(): void {
		navigator.clipboard
			.writeText(markdownContent)
			.then(() => {
				show_copied_toast = true;
				setTimeout(() => {
					show_copied_toast = false;
				}, 2000);
			})
			.catch((err) => console.error('Failed to copy:', err));
	}

	function toggle_fullscreen(): void {
		is_fullscreen = !is_fullscreen;
	}
</script>

<div
	class="mx-auto mb-10 grid gap-4 p-10 md:gap-10"
	class:md:grid-cols-2={!is_fullscreen}
	class:md:grid-cols-1={is_fullscreen}
>
	<div class="relative">
		<div class="absolute right-2 top-2 flex gap-2">
			<button
				onclick={copy_to_clipboard}
				class="btn btn-circle btn-sm"
				aria-label="Copy markdown to clipboard"
				title="Copy to clipboard"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
					/>
				</svg>
			</button>
			<button
				onclick={toggle_fullscreen}
				class="btn btn-circle btn-sm"
				aria-label={is_fullscreen
					? 'Exit fullscreen'
					: 'Enter fullscreen'}
				title={is_fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
			>
				{#if is_fullscreen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 9h6v6H9z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 20h4v-4H5v4zM15 20h4v-4h-4v4zM5 10h4V6H5v4zM15 10h4V6h-4v4z"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
						/>
					</svg>
				{/if}
			</button>
		</div>
		<textarea
			{rows}
			bind:value={markdownContent}
			class="h-full w-full resize-none rounded-box border bg-base-200 p-2 text-xl shadow-2xl"
			aria-label="Markdown editor"
			placeholder="Write your markdown here..."
		></textarea>
	</div>

	<div
		class="prose prose-invert w-full max-w-none overflow-x-auto rounded-box bg-secondary p-2 text-secondary-content shadow-2xl"
		aria-label="Markdown preview"
	>
		{@html markdown}
	</div>
</div>

{#if show_copied_toast}
	<div class="toast toast-end">
		<div class="alert alert-success">
			<span>Copied to clipboard!</span>
		</div>
	</div>
{/if}
