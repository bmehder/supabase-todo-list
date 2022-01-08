<script>
  import supabase from '$lib/db.js'
  import { user } from '$lib/stores'

  let username = ''
  let password = ''
  let message = ''
  let errorMsg = ''
  let isPasswordChanged = false

  const handleSubmit = async () => {
    isPasswordChanged = false
    errorMsg = ''
    const { user, error } = await supabase.auth.update({
      email: username,
      password,
      data: { message: 'Your password was updated.' },
    })

    console.log(user)

    error && (errorMsg = 'There was an error')

    if (!error) {
      message = user.user_metadata.message
      isPasswordChanged = true
    }
  }

  $: console.log($user)
</script>

<main>
  <h4>Update your password</h4>
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      bind:value={username}
      placeholder="Enter your email"
      required
    />
    <input
      type="password"
      bind:value={password}
      placeholder="Enter new password"
      required
    />
    <button>Update Password</button>

    {#if errorMsg}
      <p>{errorMsg}</p>
    {/if}

    {#if isPasswordChanged}
      <p>{message}</p>
      <a href="/login">Go to login.</a>
    {/if}
  </form>
</main>

<style>
  main {
    width: 400px;
    margin: 4rem;
    /* padding: 4rem; */
  }
  input,
  button {
    width: 100%;
    margin: 1em 0 0.5em;
    padding: 1em;
    text-align: center;
    font-size: initial;
  }
  button {
    background: dodgerblue;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 100ms all ease-in-out;
  }
  button:hover {
    background: hsl(210, 100%, 46%);
  }
  p {
    color: red;
  }
  a {
    display: block;
    padding-top: 1rem;
    color: dodgerblue;
    text-decoration: none;
  }
  a:hover {
    color: hsl(210, 100%, 46%);
  }
</style>
