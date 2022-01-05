<script>
  import supabase from '$lib/db.js'
  import { getContext } from 'svelte'
  import { user } from '$lib/stores'

  let newTask = ''

  const loadTodos = getContext('loadTodos')
  const handleError = getContext('handleError')

  const addTodo = async () => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: newTask, user_id: $user.id }])

    newTask = ''

    error && handleError(error)

    !error && loadTodos()
  }

  const handleKeydown = e => e.key === 'Enter' && newTask && addTodo()
</script>

<svelte:window on:keydown={handleKeydown} />

<div>
  <input type="text" bind:value={newTask} placeholder="New todo..." />
  <button on:click={addTodo}>Add Todo</button>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    margin: 0 4rem;
  }
  input::placeholder {
    font-size: 1.2em;
  }
  input,
  button {
    display: block;
    padding: 1rem;
    text-align: center;
    font-family: inherit;
    font-size: 1rem;
  }
  button {
    background: dodgerblue;
    color: white;
    border: none;
    outline: none;
    font-size: 1.2rem;
    font-weight: bold;
    transition: background 100ms ease-in-out;
  }
  button:hover {
    background: hsl(210, 100%, 46%);
  }
  @media screen and (max-width: 600px) {
    div {
      margin: 0 2rem 2rem;
    }
    input,
    button {
      padding: 1rem;
    }
  }
</style>
