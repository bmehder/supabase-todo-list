<script>
  import supabase from '$lib/db.js'
  import { getContext } from 'svelte'
  import { scale } from 'svelte/transition'

  export let todo = {}

  const { task, isComplete } = todo

  const loadTodos = getContext('loadTodos')

  const updateTodo = async todo => {
    const { data, error } = await supabase
      .from('todos')
      .update({ task: todo.task, isComplete: todo.isComplete })
      .eq('id', todo.id)
  }

  const deleteTodo = async todo => {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id)

    !error && loadTodos()
  }

  const handleUpdate = (e, inputType) => {
    inputType === 'text' && (todo.task = e.currentTarget.value)
    inputType === 'checkbox' && (todo.isComplete = e.currentTarget.checked)

    updateTodo(todo)
  }

  const handleDelete = () => deleteTodo(todo)
</script>

<svelte:head
  ><link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  /></svelte:head
>

<div transition:scale={{ delay: 0 }}>
  <input
    type="checkbox"
    checked={isComplete}
    on:change={e => handleUpdate(e, 'checkbox')}
  />

  <input type="text" value={task} on:input={e => handleUpdate(e, 'text')} />

  <button on:click={handleDelete}><i class="fas fa-trash-alt" /></button>
</div>

<style>
  div {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5em;
    padding: 0 4rem;
  }
  input {
    width: 100%;
    padding: 1rem;
    font-size: initial;
  }
  input[type='checkbox'] {
    width: 4rem;
    height: 4rem;
  }
  button {
    padding: 1rem 2rem;
    background: dodgerblue;
    color: white;
    font-size: initial;
    border: none;
    transition: background 100ms ease-in-out;
  }
  button:hover {
    background: hsl(210, 100%, 46%);
  }
  @media screen and (max-width: 600px) {
    div {
      width: 100%;
      padding: 0 1rem;
    }
  }
</style>
