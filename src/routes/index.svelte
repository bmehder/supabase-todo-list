<script>
  import { setContext } from 'svelte'
  import supabase from '$lib/db.js'
  import Header from '$lib/Header.svelte'
  import Todos from '$lib/Todos.svelte'
  import Error from '$lib/Error.svelte'

  let todos = []
  let errorMsg = ''

  const loadTodos = async () => {
    let { data, error } = await supabase.from('todos').select('*')

    error && (errorMsg = error.message)

    todos = data
  }

  const updateTodo = async todo => {
    try {
      // const { data, error } = await supabase
      //   .from('todos')
      //   .update({ task: todo.task })
      //   .eq('id', todo.id)
      await supabase.from('todos').update({ task: todo.task }).eq('id', todo.id)
    } catch (err) {
      console.error('my', err)
    }
  }

  setContext('update', updateTodo)
</script>

<Header />

<main use:loadTodos>
  {#if errorMsg}
    <Error {errorMsg} />
  {/if}

  {#if !errorMsg}
    <Todos {todos} />
  {/if}
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
