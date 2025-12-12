<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import * as Table from '$lib/components/ui/table';
	import { tokenize, type Token } from './tokenizer';

	interface Props {
		content: string;
		class?: string;
	}

	let { content, class: class_name = '' }: Props = $props();

	let tokens = $derived(tokenize(content));

	// Copy to clipboard with use: action
	function copy_button(node: HTMLElement, code: string) {
		const button = document.createElement('button');
		button.className =
			'absolute top-2 right-2 px-2 py-1 text-xs bg-muted rounded hover:bg-muted/80 transition-colors';
		button.textContent = 'Copy';
		button.onclick = async () => {
			await navigator.clipboard.writeText(code);
			button.textContent = 'Copied!';
			setTimeout(() => (button.textContent = 'Copy'), 2000);
		};
		node.appendChild(button);

		return {
			destroy() {
				button.remove();
			},
		};
	}
</script>

{#snippet render_token(token: Token)}
	{#if token.type === 'heading'}
		{#if token.depth === 1}
			<h1
				class="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
			>
				{#each token.children ?? [] as child}
					{@render render_token(child)}
				{/each}
			</h1>
		{:else if token.depth === 2}
			<h2
				class="mb-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
			>
				{#each token.children ?? [] as child}
					{@render render_token(child)}
				{/each}
			</h2>
		{:else if token.depth === 3}
			<h3
				class="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight"
			>
				{#each token.children ?? [] as child}
					{@render render_token(child)}
				{/each}
			</h3>
		{:else if token.depth === 4}
			<h4
				class="mb-2 scroll-m-20 text-xl font-semibold tracking-tight"
			>
				{#each token.children ?? [] as child}
					{@render render_token(child)}
				{/each}
			</h4>
		{:else if token.depth === 5}
			<h5
				class="mb-2 scroll-m-20 text-lg font-semibold tracking-tight"
			>
				{#each token.children ?? [] as child}
					{@render render_token(child)}
				{/each}
			</h5>
		{:else}
			<h6
				class="mb-2 scroll-m-20 text-base font-semibold tracking-tight"
			>
				{#each token.children ?? [] as child}
					{@render render_token(child)}
				{/each}
			</h6>
		{/if}
	{:else if token.type === 'paragraph'}
		<p class="leading-7 [&:not(:first-child)]:mt-4">
			{#each token.children ?? [] as child}
				{@render render_token(child)}
			{/each}
		</p>
	{:else if token.type === 'code_block'}
		<div class="relative my-4" use:copy_button={token.text ?? ''}>
			{#if token.lang}
				<span
					class="absolute top-2 left-3 text-xs text-muted-foreground"
					>{token.lang}</span
				>
			{/if}
			<pre class="overflow-x-auto rounded-lg bg-muted p-4 pt-8"><code
					class="font-mono text-sm">{token.text}</code
				></pre>
		</div>
	{:else if token.type === 'blockquote'}
		<blockquote
			class="mt-4 border-l-4 border-primary pl-4 text-muted-foreground italic"
		>
			{#each token.children ?? [] as child}
				{@render render_token(child)}
			{/each}
		</blockquote>
	{:else if token.type === 'list'}
		{#if token.ordered}
			<ol
				class="my-4 ml-6 list-decimal [&>li]:mt-2"
				start={token.start}
			>
				{#each token.children ?? [] as child}
					{@render render_token(child)}
				{/each}
			</ol>
		{:else}
			<ul class="my-4 ml-6 list-disc [&>li]:mt-2">
				{#each token.children ?? [] as child}
					{@render render_token(child)}
				{/each}
			</ul>
		{/if}
	{:else if token.type === 'list_item'}
		<li>
			{#each token.children ?? [] as child}
				{@render render_token(child)}
			{/each}
		</li>
	{:else if token.type === 'hr'}
		<Separator class="my-6" />
	{:else if token.type === 'table'}
		<div class="my-4 overflow-x-auto">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						{#each token.header ?? [] as cell, i}
							<Table.Head
								class={token.align?.[i] === 'center'
									? 'text-center'
									: token.align?.[i] === 'right'
										? 'text-right'
										: ''}
							>
								{cell}
							</Table.Head>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each token.rows ?? [] as row}
						<Table.Row>
							{#each row as cell, i}
								<Table.Cell
									class={token.align?.[i] === 'center'
										? 'text-center'
										: token.align?.[i] === 'right'
											? 'text-right'
											: ''}
								>
									{cell}
								</Table.Cell>
							{/each}
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	{:else if token.type === 'bold'}
		<strong class="font-bold">
			{#each token.children ?? [] as child}
				{@render render_token(child)}
			{/each}
		</strong>
	{:else if token.type === 'italic'}
		<em class="italic">
			{#each token.children ?? [] as child}
				{@render render_token(child)}
			{/each}
		</em>
	{:else if token.type === 'strikethrough'}
		<del class="line-through">
			{#each token.children ?? [] as child}
				{@render render_token(child)}
			{/each}
		</del>
	{:else if token.type === 'code'}
		<code
			class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
			>{token.text}</code
		>
	{:else if token.type === 'link'}
		<a
			href={token.href}
			title={token.title}
			class="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
		>
			{#each token.children ?? [] as child}
				{@render render_token(child)}
			{/each}
		</a>
	{:else if token.type === 'image'}
		<img
			src={token.href}
			alt={token.alt ?? ''}
			title={token.title}
			class="my-4 max-w-full rounded-lg"
		/>
	{:else if token.type === 'br'}
		<br />
	{:else if token.type === 'text'}
		{token.text}
	{/if}
{/snippet}

<div class={class_name}>
	{#each tokens as token}
		{@render render_token(token)}
	{/each}
</div>
