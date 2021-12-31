<script>
  import { getContext } from 'svelte'
  import { scale } from 'svelte/transition'

  export let todo = {}

  const { task, isComplete } = todo

  const updateTodo = getContext('updateTodo')
  const deleteTodo = getContext('deleteTodo')

  const handleUpdate = (e, input) => {
    input === 'text' && (todo.task = e.currentTarget.value)
    input === 'checkbox' && (todo.isComplete = e.currentTarget.checked)

    updateTodo(todo)
  }

  const handleDelete = () => deleteTodo(todo)
</script>

<div transition:scale>
  <input
    type="checkbox"
    checked={isComplete}
    on:change={e => handleUpdate(e, 'checkbox')}
  />

  <input type="text" value={task} on:input={e => handleUpdate(e, 'text')} />

  <button on:click={handleDelete}>Delete</button>
</div>

<style>
  div {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5em;
  }
  input {
    padding: 1rem;
    font-size: initial;
  }
  input[type='checkbox'] {
    width: 2rem;
    height: 2rem;
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
</style>
