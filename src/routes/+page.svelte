<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Textarea } from '$lib/components/ui/textarea';
	import { MarkdownRenderer } from '$lib/markdown';
	import { Check, Copy, Maximize2, Minimize2, Moon, Sun } from '@lucide/svelte';
	import { toggleMode, mode } from 'mode-watcher';

	let current_mode = $derived(mode.current);

	let content = $state(`# Welcome to JAMP

A **custom markdown parser** built with Svelte 5 features.

## Features

- Headers (h1-h6)
- **Bold** and *italic* text
- ~~Strikethrough~~
- \`inline code\`
- [Links](https://svelte.dev)

### Code Blocks

\`\`\`javascript
const greeting = 'Hello, JAMP!';
console.log(greeting);
\`\`\`

### Lists

Unordered:
- Item one
- Item two
- Item three

Ordered:
1. First
2. Second
3. Third

### Blockquotes

> This is a blockquote.
> It can span multiple lines.

### Tables

| Feature | Status |
|:--------|:------:|
| Headers | Done |
| Lists | Done |
| Tables | Done |

---

*Built with Svelte 5 runes and snippets*`);

	let copied = $state(false);
	let fullscreen = $state(false);

	async function copy_markdown() {
		await navigator.clipboard.writeText(content);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<title>JAMP - Markdown Editor</title>
</svelte:head>

<div
	class="p-4"
	class:container={!fullscreen}
	class:mx-auto={!fullscreen}
	class:fixed={fullscreen}
	class:inset-0={fullscreen}
	class:z-50={fullscreen}
	class:bg-background={fullscreen}
	class:overflow-hidden={fullscreen}
	class:flex={fullscreen}
	class:flex-col={fullscreen}
>
	<div class="mb-4 flex items-center justify-between">
		<h1 class="text-2xl font-bold">JAMP</h1>
		<div class="flex gap-2">
			<Button variant="outline" size="icon" onclick={toggleMode}>
				{#if current_mode === 'dark'}
					<Sun class="h-4 w-4" />
				{:else}
					<Moon class="h-4 w-4" />
				{/if}
			</Button>
			<Button variant="outline" size="icon" onclick={copy_markdown}>
				{#if copied}
					<Check class="h-4 w-4" />
				{:else}
					<Copy class="h-4 w-4" />
				{/if}
			</Button>
			<Button
				variant="outline"
				size="icon"
				onclick={() => (fullscreen = !fullscreen)}
			>
				{#if fullscreen}
					<Minimize2 class="h-4 w-4" />
				{:else}
					<Maximize2 class="h-4 w-4" />
				{/if}
			</Button>
		</div>
	</div>

	<div
		class="grid gap-4 md:grid-cols-2"
		class:flex-1={fullscreen}
		class:min-h-0={fullscreen}
		class:h-[calc(100vh-8rem)]={!fullscreen}
	>
		<Card.Root class="flex min-h-0 flex-col overflow-hidden">
			<Card.Header class="pb-2">
				<Card.Title class="text-sm text-muted-foreground">Editor</Card.Title>
			</Card.Header>
			<Card.Content class="min-h-0 flex-1 p-2">
				<Textarea
					bind:value={content}
					class="h-full min-h-[300px] resize-none font-mono text-sm"
					placeholder="Write markdown here..."
				/>
			</Card.Content>
		</Card.Root>

		<Card.Root class="flex min-h-0 flex-col overflow-hidden">
			<Card.Header class="pb-2">
				<Card.Title class="text-sm text-muted-foreground">Preview</Card.Title>
			</Card.Header>
			<Card.Content class="min-h-0 flex-1 overflow-hidden p-2">
				<ScrollArea class="h-full rounded-md border p-4">
					<MarkdownRenderer {content} />
				</ScrollArea>
			</Card.Content>
		</Card.Root>
	</div>
</div>
