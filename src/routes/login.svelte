<script>
  import { goto } from '$app/navigation'
  import supabase from '$lib/db.js'
  import { user } from '$lib/stores'

  import Error from '$lib/Error.svelte'

  let value = ''
  let errorMsg = ''

  const handleError = error => (errorMsg = error.message)

  const signUp = async () => {
    let { user: userDetails, error } = await supabase.auth.signUp({
      email: value,
      password: 'TfLvCMfmxASMxFLWpKkM',
    })

    if (error) {
      handleError(error)
      return
    }

    $user = userDetails
    goto('/')
  }

  const login = async () => {
    let { user: userDetails, error } = await supabase.auth.signIn({
      email: value,
      password: 'TfLvCMfmxASMxFLWpKkM',
    })

    if (error) {
      handleError(error)
      return
    }

    $user = userDetails
    goto('/')
  }
</script>

<main>
  {#if errorMsg}
    <Error {errorMsg} />
  {/if}

  <h4>Login</h4>
  <div>
    <input type="email" bind:value placeholder="email@email.com" required />
  </div>

  <button on:click={signUp}>Register</button>
  <button on:click={login}>Login</button>
</main>

<style>
  main {
    margin: 4rem;
    font-size: 2rem;
  }
  input {
    width: 100%;
    margin: 1rem 0;
    padding: 1rem;
    font-size: initial;
  }
  button {
    padding: 1rem 2rem;
    font-size: initial;
  }
</style>
