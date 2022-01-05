<script>
  import supabase from '$lib/db.js'
  import { goto } from '$app/navigation'
  import { user } from '$lib/stores'

  import Error from '$lib/Error.svelte'

  let value = ''
  let errorMsg = ''

  const handleError = error => (errorMsg = error.message)

  const handleAfterLogin = (userDetails, error) => {
    if (error) {
      handleError(error)
      return
    }

    $user = userDetails

    !error && goto('/')
  }

  const signUp = async () => {
    let { user: userDetails, error } = await supabase.auth.signUp({
      email: value,
      password: 'TfLvCMfmxASMxFLWpKkM',
    })

    handleAfterLogin(userDetails, error)
  }

  const login = async () => {
    let { user: userDetails, error } = await supabase.auth.signIn({
      email: value,
      password: 'TfLvCMfmxASMxFLWpKkM',
    })

    handleAfterLogin(userDetails, error)
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

  <div class="buttons">
    <button on:click={signUp}>Register</button>
    <button on:click={login}>Login</button>
  </div>
</main>

<style>
  main {
    margin: 4rem;
    padding: 4rem;
    font-size: 2rem;
  }
  input {
    width: 100%;
    margin: 1rem 0;
    padding: 1rem;
    font-size: initial;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  button {
    display: block;
    width: 100%;
    padding: 1rem 2rem;
    background: dodgerblue;
    color: white;
    font-size: initial;
    border: none;
    border-radius: 4px;
    transition: background 100ms ease-in-out;
  }
  button:hover {
    background: hsl(210, 100%, 46%);
    color: white;
  }
  @media screen and (max-width: 600px) {
    main {
      width: 100%;
      margin: 4rem 0;
      padding: 4rem;
    }
  }
</style>
