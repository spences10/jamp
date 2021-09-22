<script>
  import marked from 'marked'
  export let markdownContent = `# Hello World\n\nWrite markdown here\n\n`
  export let rows = 5
  $: markdown = marked(markdownContent)
</script>

<div
  class="mx-auto w-10/12 h-screen mb-10 grid p-10 gap-4 prose prose-lg md:gap-10 md:grid-cols-2 md:grid-rows-1"
>
  <textarea
    {rows}
    bind:value={markdownContent}
    class="border rounded-xl h-full bg-base-200 border-base-100 text-xl w-full p-2 resize-none "
  />

  <div class="bg-neutral border border-neutral rounded-xl w-full p-2">
    {@html markdown}
  </div>
</div>
