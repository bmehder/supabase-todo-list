<script>
  import { getContext } from 'svelte'

  export let todo = {}

  const { task, isComplete } = todo

  const updateTodo = getContext('updateTodo')
  const updateChecked = getContext('updateChecked')
  const deleteTodo = getContext('deleteTodo')

  const handleInput = e => {
    todo.task = e.currentTarget.value
    updateTodo(todo)
  }

  const handleCheckbox = e => {
    todo.isComplete = e.currentTarget.checked ? true : false
    updateChecked(todo)
  }

  const handleDelete = e => {
    deleteTodo(todo)
  }
</script>

<div>
  <input type="checkbox" checked={isComplete} on:click={handleCheckbox} />
  <input type="text" value={task} on:input={handleInput} />
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
