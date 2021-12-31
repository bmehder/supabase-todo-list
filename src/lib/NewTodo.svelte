<script>
  import { createEventDispatcher } from 'svelte'
  export let newTask = ''

  const dispatch = createEventDispatcher()

  const handleKeydown = e => e.key === 'Enter' && newTask && dispatch('enter')
</script>

<svelte:window on:keydown={handleKeydown} />

<div>
  <input type="text" bind:value={newTask} placeholder="Add new todo..." />
  <button on:click>Add Todo</button>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin: 0 4rem;
  }
  input,
  button {
    display: block;
    padding: 1rem;
  }
  button {
    background: dodgerblue;
    color: white;
    border: none;
    outline: none;
    font-size: initial;
    transition: background 100ms ease-in-out;
  }
  button:hover {
    background: hsl(210, 100%, 46%);
  }
</style>
