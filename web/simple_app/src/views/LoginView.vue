<template>
  <div id="app">
    <div id="alert" v-if="alert">{{ alert }}</div>

    <form @submit.prevent="loginWithPassword">
      <label>
        Email or username
        <input type="text" v-model="emailOrUsername" />
      </label>
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <button type="submit">Log in</button>
    </form>

    <p>or</p>

    <button @click.prevent="loginWithSSO">
      Log in with Google
    </button>
  </div>
</template>

<script>
  import Userfront from "@userfront/core";
  // Initialize Userfront
  Userfront.init("demo1234");
  Userfront.login({
    // ...
    emailOrUsername: "member@example.com",
  });

  // Is the same as
  Userfront.login({
    // ...
    email: "member@example.com",
  });

  // Or you can use "username"
  Userfront.login({
    // ...
    username: "member1234",
  });
  export default {
    data() {
      return {
        emailOrUsername: "",
        password: "",
        alert: "",
      };
    },
    methods: {
      // Log in with the form's email/username and password
      loginWithPassword() {
        this.alert = "";
        Userfront.login({
          method: "password",
          emailOrUsername: this.emailOrUsername,
          password: this.password,
        }).catch((error) => {
          this.alert = error.message;
        });
      },
      // Log in with SSO (google)
      loginWithSSO() {
        Userfront.login({ method: "google" });
      },
    },
  };
</script>

<style scoped>
  button,
  input {
    display: block;
    margin-bottom: 10px;
  }

  #alert {
    color: red;
    margin-bottom: 10px;
  }
</style>
