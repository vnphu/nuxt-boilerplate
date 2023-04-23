<template>
  <main class="main">
    <div class="container">
      <section class="wrapper">
        <div class="heading">
          <h1 class="text text-large">Sign In</h1>
          <p class="text text-normal">New user? <span><a href="#" class="text text-links">Create an account</a></span>
          </p>
        </div>
        <form name="signin" class="form">
          <div class="input-control">
            <label for="email" class="input-label" hidden>Email Address</label>
            <input type="email" v-model="username" name="email" id="email" class="input-field"
              placeholder="Email Address">
          </div>
          <div class="input-control">
            <label for="password" class="input-label" hidden>Password</label>
            <input type="password" v-model="password" name="password" id="password" class="input-field"
              placeholder="Password">
          </div>
          <div class="input-control">
            <a href="#" class="text text-links">Forgot Password</a>
            <input type="submit" name="submit" class="input-submit" value="Sign In" disabled>
          </div>
        </form>

      </section>
    </div>
  </main>
</template>

<script setup lang="ts">

definePageMeta({
  auth: false,
});
const toast = useToast()
const username = ref('')
const password = ref('')
const { $auth: auth } = useNuxtApp()


const login = async () => {
  auth
    .loginWith('local1', {
      body: {
        username: username.value,
        password: password.value,
      },
    }).then((res) => {
      toast.add({ severity: 'success', summary: 'Notifications', detail: 'Login Successfully', life: 3000 });
    }).catch((err) => {
      console.log(err);
    })
}
</script>

<style scoped lang="scss">
img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

// Components
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80rem;
  min-height: 100vh;
  width: 100%;
  padding: 0 2rem;
  margin: 0 auto;
}

.ion {
  &-logo-apple {
    font-size: 1.65rem;
    line-height: inherit;
    margin-right: 0.5rem;
    color: #121212;
  }

  &-logo-google {
    font-size: 1.65rem;
    line-height: inherit;
    margin-right: 0.5rem;
    color: #f44336;
  }

  &-logo-facebook {
    font-size: 1.65rem;
    line-height: inherit;
    margin-right: 0.5rem;
    color: #1a73e8;
  }
}

.text {
  font-family: inherit;
  line-height: inherit;
  text-transform: unset;
  text-rendering: optimizeLegibility;

  &-large {
    font-size: 2rem;
    font-weight: 600;
    color: #121212;
  }

  &-normal {
    font-size: 1rem;
    font-weight: 400;
    color: #121212;
  }

  &-links {
    font-size: 1rem;
    font-weight: 400;
    color: #1a73e8;

    &:hover {
      text-decoration: underline;
    }
  }
}

// Main
.main {
  .wrapper {
    max-width: 28rem;
    width: 100%;
    margin: 2rem auto;
    padding: 2rem 2.5rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    color: #121212;
    background: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);

    .form {
      width: 100%;
      height: auto;
      margin-top: 2rem;

      .input-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;
      }

      .input-field {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 400;
        line-height: inherit;
        width: 100%;
        height: auto;
        padding: 0.75rem 1.25rem;
        border: none;
        outline: none;
        border-radius: 2rem;
        color: #121212;
        background: #f1f5f9;
        text-transform: unset;
        text-rendering: optimizeLegibility;
      }

      .input-submit {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        line-height: inherit;
        cursor: pointer;
        min-width: 40%;
        height: auto;
        padding: 0.65rem 1.25rem;
        border: none;
        outline: none;
        border-radius: 2rem;
        color: #ffffff;
        background: #1a73e8;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        text-transform: capitalize;
        text-rendering: optimizeLegibility;
      }
    }


  }
}
</style>
