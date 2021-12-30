<script>
  import Spinner from '$lib/Spinner.svelte'
  import Todo from '$lib/Todo.svelte'
  export let todos = []
</script>

<section>
  {#if todos.length === 0}
    <Spinner />
  {/if}

  {#if todos.length !== 0}
    {#each todos as todo}
      <Todo {todo} />
    {/each}
  {/if}
</section>
