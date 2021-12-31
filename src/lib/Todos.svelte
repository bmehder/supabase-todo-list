<script>
  import Todo from '$lib/Todo.svelte'

  export let todos = []
  export let isLoading = false

  $: isTodos = todos.length !== 0
</script>

<section>
  {#if !isTodos && !isLoading}
    <p>No Todos ❌</p>
  {/if}

  {#if isTodos}
    {#each todos as todo, i (todo.id)}
      <Todo {todo} />
    {/each}
  {/if}
</section>

<style>
  p {
    margin-bottom: 1rem;
  }
</style>
