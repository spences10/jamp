<script lang="ts">
	import BlueskyIcon from '$lib/icons/bluesky-icon.svelte';
	import YoutubeIcon from '$lib/icons/youtube-icon.svelte';
</script>

<footer
	class="footer footer-center bg-base-200/50 p-10 text-base-content backdrop-blur-sm"
>
	<div class="grid grid-flow-col gap-6">
		<a
			href="/about"
			class="link-hover link text-sm transition-colors duration-200 hover:text-primary"
			>About</a
		>
	</div>
	<div>
		<div class="grid grid-flow-col gap-6">
			<a
				href="https://ss10.dev/bluesky"
				aria-label="Follow on Bluesky"
				class="btn btn-circle btn-ghost hover:bg-base-300"
			>
				<BlueskyIcon
					height="24px"
					width="24px"
					class_names="fill-current transition-transform duration-200 hover:scale-110"
				/>
			</a>
			<a
				href="https://ss10.dev/yt"
				aria-label="Subscribe on YouTube"
				class="btn btn-circle btn-ghost hover:bg-base-300"
			>
				<YoutubeIcon
					height="24px"
					width="24px"
					class_names="fill-current transition-transform duration-200 hover:scale-110"
				/>
			</a>
		</div>
	</div>
	<div class="divider before:bg-base-300 after:bg-base-300"></div>
	<div>
		<p class="text-sm opacity-75">
			Copyright &copy; {`${new Date().getFullYear()}`} - All rights reserved
			by <span class="font-semibold">JAMP</span> Industries Ltd
		</p>
	</div>
</footer>
