<script>
  import { goto } from '$app/navigation'

  import supabase from '$lib/db.js'
  import { user } from '$lib/stores'

  const logout = async () => {
    let { error } = await supabase.auth.signOut()
    user.set(false)
  }
</script>

<header>
  <h1>Supabase Todo List</h1>
  <div>
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
    padding: 0.5rem 1rem;
  }
</style>
