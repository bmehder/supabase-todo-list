<script>
  import supabase from '$lib/db.js'
  import { user } from '$lib/stores'
  import { goto } from '$app/navigation'
  // import { browser } from '$app/env'
  import { setContext } from 'svelte'

  import Header from '$lib/Header.svelte'
  import Todos from '$lib/Todos.svelte'
  import NewTodo from '$lib/NewTodo.svelte'
  import Error from '$lib/Error.svelte'
  import Spinner from '$lib/Spinner.svelte'

  let todos = []
  let isLoading = true
  let errorMsg = ''

  // browser && $user === false && goto('/login')

  const handleError = error => (errorMsg = error.message)

  const loadTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true })

    error && handleError(error)

    isLoading = false

    todos = data
  }

  setContext('loadTodos', loadTodos)
  setContext('handleError', handleError)
</script>

<Header />

{#if $user}
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

    <NewTodo />
  </main>
{/if}

{#if !$user}
  <button on:click={() => goto('/login')}>Login</button>
{/if}
