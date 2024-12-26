<script lang="ts">
	import BlueskyIcon from '$lib/icons/bluesky-icon.svelte';
	import YoutubeIcon from '$lib/icons/youtube-icon.svelte';
</script>

<footer
	class="footer footer-center bg-base-200 p-10 text-base-content"
>
	<div class="grid grid-flow-col gap-4">
		<a href="/about" class="link-hover link">About</a>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a
				href="https://ss10.dev/bluesky"
				aria-label="Follow on Bluesky"
			>
				<BlueskyIcon
					height="24px"
					width="24px"
					class_names="fill-current"
				/>
			</a>
			<a href="https://ss10.dev/yt" aria-label="Subscribe on YouTube">
				<YoutubeIcon
					height="24px"
					width="24px"
					class_names="fill-current"
				/>
			</a>
		</div>
	</div>
	<div>
		<p>
			Copyright &copy; {`${new Date().getFullYear()}`} - All right reserved
			by JAMP Industries Ltd
		</p>
	</div>
</footer>
