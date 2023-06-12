<script lang="ts">
    import Footer from '$lib/footer.svelte';
    import Header from '$lib/header.svelte';
    import { onMount } from 'svelte';
    import { themeChange } from 'theme-change';
    import '../app.postcss';

    onMount(async () => {
        themeChange(false);
    });
</script>

<div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
        <slot />
    </main>
    <Footer />
</div>
