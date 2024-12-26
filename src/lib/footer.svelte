<script lang="ts">
	import { BlueskyIcon, YoutubeIcon } from './icons';
</script>

<footer
	class="flex justify-center gap-4 bg-base-200/30 py-6 backdrop-blur-sm"
>
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
</footer>
