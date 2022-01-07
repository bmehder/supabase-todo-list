<script>
  import supabase from '$lib/db.js'
  import { user } from '$lib/stores'
  import { goto } from '$app/navigation'
  import Error from '$lib/Error.svelte'

  let username = ''
  let password = ''
  let message = ''
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
      email: username,
      password,
    })

    handleAfterLogin(userDetails, error)
  }

  const login = async () => {
    let { user: userDetails, error } = await supabase.auth.signIn({
      email: username,
      password,
    })

    handleAfterLogin(userDetails, error)
  }

  const resetPassword = async () => {
    errorMsg = ''
    message = ''

    let { data, error } = await supabase.auth.api.resetPasswordForEmail(
      username,
      {
        redirectTo: '/change-password',
      }
    )

    error && handleError(error)

    !error && (message = 'Check your inbox (and spam folder)')
  }

  $: console.log($user)
</script>

<main>
  {#if errorMsg}
    <Error {errorMsg} />
  {/if}

  <h4>Login</h4>
  <div>
    <input
      type="email"
      bind:value={username}
      placeholder="email@email.com"
      required
    />
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      required
    />
  </div>

  <div class="buttons">
    <button on:click={signUp}>Register</button>
    <button on:click={login}>Login</button>
  </div>
  {#if !message}
    <p><a href="/login" on:click={resetPassword}>Forgot password?</a></p>
  {/if}

  {#if message}
    <p>{message}</p>
  {/if}
</main>

<style>
  main {
    margin: 4rem;
    padding: 4rem;
    font-size: 2rem;
  }
  input {
    width: 100%;
    margin: 0.5rem 0;
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
    margin-top: 0.5em;
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
  p {
    margin-top: 1em;
  }
  a {
    color: dodgerblue;
    text-decoration: none;
  }
  a:hover {
    color: hsl(210, 100%, 46%);
  }
  @media screen and (max-width: 600px) {
    main {
      width: 100%;
      margin: 4rem 0;
      padding: 4rem;
    }
  }
</style>
