<script lang="ts">
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { marked } from 'marked';
	import {
		CopyIcon,
		FullscreenEnterIcon,
		FullscreenExitIcon,
		CheckmarkIcon,
	} from '$lib/icons';

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

<div class="container mx-auto px-4 py-8">
	<div
		class="grid transition-all duration-300 ease-in-out"
		class:md:grid-cols-2={!is_fullscreen}
		class:md:grid-cols-1={is_fullscreen}
		class:gap-8={!is_fullscreen}
		class:gap-4={is_fullscreen}
	>
		<div class="card bg-base-200 shadow-xl">
			<div class="card-body p-4">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="card-title text-base-content opacity-70">
						Markdown Editor
					</h2>
					<div class="join">
						<button
							onclick={copy_to_clipboard}
							class="btn join-item btn-sm hover:bg-base-300"
							aria-label="Copy markdown to clipboard"
							title="Copy to clipboard"
						>
							<CopyIcon class="h-4 w-4" />
						</button>
						<button
							onclick={toggle_fullscreen}
							class="btn join-item btn-sm hover:bg-base-300"
							aria-label={is_fullscreen
								? 'Exit fullscreen'
								: 'Enter fullscreen'}
							title={is_fullscreen
								? 'Exit fullscreen'
								: 'Enter fullscreen'}
						>
							{#if is_fullscreen}
								<FullscreenExitIcon class="h-4 w-4" />
							{:else}
								<FullscreenEnterIcon class="h-4 w-4" />
							{/if}
						</button>
					</div>
				</div>
				<textarea
					{rows}
					bind:value={markdownContent}
					class="textarea textarea-bordered h-[500px] w-full resize-none bg-base-100 font-mono text-lg leading-relaxed"
					aria-label="Markdown editor"
					placeholder="Write your markdown here..."
				></textarea>
			</div>
		</div>

		<div class="card bg-base-200 shadow-xl">
			<div class="card-body p-4">
				<h2 class="card-title mb-4 text-base-content opacity-70">
					Preview
				</h2>
				<div
					class="prose prose-sm w-full max-w-none overflow-x-auto rounded-lg bg-base-100 p-6 md:prose-base lg:prose-lg"
					aria-label="Markdown preview"
				>
					{@html markdown}
				</div>
			</div>
		</div>
	</div>
</div>

{#if show_copied_toast}
	<div class="toast toast-end">
		<div class="alert alert-success shadow-lg">
			<CheckmarkIcon class="h-6 w-6 stroke-current" />
			<span>Copied to clipboard!</span>
		</div>
	</div>
{/if}
