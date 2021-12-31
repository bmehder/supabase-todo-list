<script>
  import { setContext } from 'svelte'
  import supabase from '$lib/db.js'
  import Header from '$lib/Header.svelte'
  import Todos from '$lib/Todos.svelte'
  import NewTodo from '$lib/NewTodo.svelte'
  import Error from '$lib/Error.svelte'
  import Spinner from '$lib/Spinner.svelte'

  let todos = []
  let errorMsg = ''
  let newTask = ''
  let isLoading = true

  const handleError = error => (errorMsg = error.message)

  const loadTodos = async () => {
    let { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true })

    error && handleError(error)

    isLoading = false
    todos = data
  }

  const addTodo = async () => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: newTask }])

    newTask = ''
    loadTodos()

    error && handleError(error)
  }

  const updateTodo = async todo => {
    const { data, error } = await supabase
      .from('todos')
      .update({ task: todo.task, isComplete: todo.isComplete })
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

  setContext('updateTodo', updateTodo)
  setContext('deleteTodo', deleteTodo)
</script>

<Header />

<main use:loadTodos>
  {#if isLoading}
    <Spinner />
  {/if}

  {#if errorMsg}
    <Error {errorMsg} />
  {/if}

  {#if !errorMsg}
    <Todos {todos} {isLoading} />
  {/if}

  <NewTodo bind:newTask on:click={addTodo} on:enter={addTodo} />
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
