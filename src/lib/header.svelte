<script>
  import ThemeSelect from './theme-select.svelte'
</script>

<div
  class="bg-neutral shadow-lg text-neutral-content mb-2 top-0 z-10 navbar sticky"
>
  <div class="px-2 mx-2 navbar-start">
    <span class="text-lg font-bold"> JAMP </span>
  </div>
  <div class="px-2 mx-2 navbar-center">
    <div class="flex items-stretch">
      <a href="/" class="btn btn-ghost btn-sm rounded-btn"> Home </a>
      <a href="/about" class="btn btn-ghost btn-sm rounded-btn">
        About
      </a>
    </div>
  </div>
  <div class="navbar-end">
    <ThemeSelect />
  </div>
</div>
