<script lang="ts">
	import MenuIcon from '$lib/icons/menu-icon.svelte';
	import MoonIcon from '$lib/icons/moon-icon.svelte';
	import SunIcon from '$lib/icons/sun-icon.svelte';

	interface Props {
		theme: string;
		toggle_theme: () => void;
	}

	let { theme, toggle_theme }: Props = $props();
</script>

<div class="navbar bg-base-100/50 shadow-lg backdrop-blur-lg">
	<div class="navbar-start">
		<details class="dropdown">
			<summary class="btn btn-ghost hover:bg-base-200 lg:hidden">
				<MenuIcon height="20px" width="20px" />
				<span class="sr-only">Open menu</span>
			</summary>
			<ul
				class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-200 p-2 shadow-lg"
			>
				<li><a href="/" class="hover:bg-base-300">Home</a></li>
				<li><a href="/about" class="hover:bg-base-300">About</a></li>
			</ul>
		</details>
		<a
			href="/"
			class="btn btn-ghost text-xl font-bold normal-case tracking-tight hover:bg-base-200"
		>
			<span class="text-primary">J</span>AMP
		</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal gap-2 px-1">
			<li>
				<a href="/" class="rounded-lg hover:bg-base-200">Home</a>
			</li>
			<li>
				<a href="/about" class="rounded-lg hover:bg-base-200">About</a
				>
			</li>
		</ul>
	</div>
	<div class="navbar-end">
		<button
			class="btn btn-ghost rounded-lg hover:bg-base-200"
			onclick={toggle_theme}
			aria-label="Toggle theme"
		>
			{#if theme === 'dark'}
				<SunIcon height="20px" width="20px" />
			{:else}
				<MoonIcon height="20px" width="20px" />
			{/if}
		</button>
	</div>
</div>
