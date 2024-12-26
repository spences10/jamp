<script lang="ts">
	import MenuIcon from '$lib/icons/menu-icon.svelte';
	import SunIcon from '$lib/icons/sun-icon.svelte';
	import MoonIcon from '$lib/icons/moon-icon.svelte';

	interface Props {
		theme: string;
		toggle_theme: () => void;
	}

	let { theme, toggle_theme }: Props = $props();
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<MenuIcon height="20px" width="20px" />
				<span class="sr-only">Open menu</span>
			</label>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<ul
				tabindex="0"
				class="menu dropdown-content menu-sm mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
			>
				<li><a href="/">Home</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</div>
		<a href="/" class="btn btn-ghost text-xl normal-case">JAMP</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/">Home</a></li>
			<li><a href="/about">About</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<button
			class="btn btn-ghost"
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
