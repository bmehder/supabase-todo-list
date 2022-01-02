<script>
  import { goto } from '$app/navigation'

  import supabase from '$lib/db.js'
  import { user } from '$lib/stores'

  let value = ''

  const signUp = async () => {
    let { user: userDetails, error } = await supabase.auth.signUp({
      email: value,
      password: 'TfLvCMfmxASMxFLWpKkM',
    })
    $user = userDetails
    goto('/')
  }

  const login = async () => {
    let { user: userDetails, error } = await supabase.auth.signIn({
      email: value,
      password: 'TfLvCMfmxASMxFLWpKkM',
    })
    $user = userDetails
    goto('/')
  }
</script>

<main>
  <h4>Login</h4>
  <div>
    <input type="email" bind:value placeholder="email@email.com" />
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
