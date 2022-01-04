<script>
  import { goto } from '$app/navigation'
  import { user } from '$lib/stores'
  import supabase from '$lib/db.js'
  import Error from '$lib/Error.svelte'

  let errorMsg = ''

  const logout = async () => {
    let { error } = await supabase.auth.signOut()

    error && (errorMsg = error)

    !error && user.set(false)
  }
</script>

<header>
  <h1>Supabase Todo List</h1>
  <div>
    {#if errorMsg}
      <Error {errorMsg} />
    {/if}

    {#if $user}
      <h4>Welcome {$user?.email}</h4>
    {/if}

    {#if $user !== false}
      <button on:click={logout}>Logout</button>
    {:else}
      <button on:click={() => goto('/login')}>Login</button>
    {/if}
  </div>
</header>

<style>
  header {
    color: hsl(210, 100%, 20%);
  }
  h1 {
    margin: 3rem auto 0;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 1rem;
  }
  button {
    padding: 1rem 2rem;
    background: white;
    font-size: initial;
    border: none;
    transition: background 100ms ease-in-out;
  }
  button:hover {
    background: hsl(210, 100%, 56%);
    color: white;
  }
</style>
