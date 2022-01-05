<script>
  import { goto } from '$app/navigation'
  import { user } from '$lib/stores'
  import supabase from '$lib/db.js'
  import Error from '$lib/Error.svelte'

  let errorMsg = ''

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    error && (errorMsg = error)

    if (!error) {
      user.set(false)
      goto('/login')
    }
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
    {/if}
  </div>
</header>

<style>
  header {
    margin-top: 4rem;
    color: hsl(210, 100%, 20%);
  }
  h1 {
    margin: 3rem auto 0;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 1rem;
  }
  button {
    position: absolute;
    top: 1rem;
    right: 2rem;
    padding: 1rem 2rem;
    background: white;
    font-size: initial;
    border: none;
    outline: none;
    border-radius: 4px;
    transition: background 100ms ease-in-out;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  button:hover {
    background: hsl(210, 100%, 56%);
    background: hsl(210, 100%, 20%);
    color: white;
  }
  @media screen and (max-width: 600px) {
    header {
      padding: 0 2rem;
    }
  }
</style>
