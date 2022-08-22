<script>
  import Footer from '$lib/footer.svelte'
  import Header from '$lib/header.svelte'
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import '../app.css'

  onMount(async () => {
    themeChange(false)
  })
</script>

<Header />
<slot />
<Footer />
