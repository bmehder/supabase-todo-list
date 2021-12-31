<script>
  import { setContext } from 'svelte'
  import supabase from '$lib/db.js'
  import Header from '$lib/Header.svelte'
  import Todos from '$lib/Todos.svelte'
  import AddNew from '$lib/AddNew.svelte'
  import Error from '$lib/Error.svelte'

  let todos = []
  let errorMsg = ''
  let newTodo = ''

  const handleError = error => (errorMsg = error.message)

  const loadTodos = async () => {
    let { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true })

    error && handleError(error)

    todos = data
  }

  const updateTask = async todo => {
    const { data, error } = await supabase
      .from('todos')
      .update({ task: todo.task })
      .eq('id', todo.id)

    error && handleError(error)
  }

  const updateChecked = async todo => {
    const { data, error } = await supabase
      .from('todos')
      .update({ isComplete: todo.isComplete })
      .eq('id', todo.id)

    error && handleError(error)
  }

  const deleteTodo = async todo => {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id)

    loadTodos()

    error && handleError(error)
  }

  const addTodo = async () => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: newTodo }])

    newTodo = ''
    loadTodos()

    error && handleError(error)
  }

  setContext('updateTask', updateTask)
  setContext('updateChecked', updateChecked)
  setContext('deleteTodo', deleteTodo)
</script>

<Header />

<main use:loadTodos>
  {#if errorMsg}
    <Error {errorMsg} />
  {/if}

  {#if !errorMsg}
    <Todos {todos} />
  {/if}

  <AddNew bind:newTodo on:click={addTodo} />
</main>

<style>
  main {
    padding: 4rem 2rem;
    background: white;
    border-radius: 0.25em;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
</style>
