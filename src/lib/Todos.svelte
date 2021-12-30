<script>
  import Spinner from '$lib/Spinner.svelte'
  import Todo from '$lib/Todo.svelte'

  export let todos = []

  $: isTodos = todos.length !== 0
</script>

<section>
  {#if !isTodos}
    <Spinner />
  {/if}

  {#if isTodos}
    {#each todos as todo}
      <Todo {todo} />
    {/each}
  {/if}
</section>
