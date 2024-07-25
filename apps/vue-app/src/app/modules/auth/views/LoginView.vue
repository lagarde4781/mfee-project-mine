<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Login</h5>
        <form>
          <div class="form-group pb-3">
            <label>Username</label>
            <input
              type="text"
              class="form-control"
              v-model="credentials.username"
              :class="loginForm$.credentials.username.$error === true ? 'is-invalid' : ''"
            />
            <span class="form-text text-danger" v-for="error of loginForm$.credentials.username.$errors" :key="error.$uid">
              {{ error.$message }}
            </span>
          </div>
          <div class="form-group pb-3">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="credentials.password"
              :class="loginForm$.credentials.password.$error === true ? 'is-invalid' : ''"
            />
            <span class="form-text text-danger" v-for="error of loginForm$.credentials.password.$errors" :key="error.$uid">
              {{ error.$message }}
            </span>
          </div>

          <span class="form-text text-danger">
            {{ error }}
          </span>
          <div class="d-flex justify-content-end mt-1">
            <button class="btn btn-outline-primary me-1" @click="signUp()">Sign Up</button>
            <button class="btn btn-primary" @click="login()">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { login } from '../../../helpers/auth';
import router from '../../../router/router';

export default {
  name: 'LoginView',
  data() {
    return {
      loginForm$: useVuelidate(),
      credentials: {
        username: null,
        password: null
      },
      error: null
    };
  },
  validations() {
    return {
      credentials: {
        username: {
          required: helpers.withMessage('Username field is required.', required),
          $autoDirty: true
        },
        password: {
          required: helpers.withMessage('Password field is required.', required),
          $autoDirty: true
        }
      }
    };
  },
  methods: {
    async login() {
      const isValid = await this.loginForm$.$validate();
      console.log('🚀 ~ login ~ isValid:', isValid);

      if (!isValid) {
        this.loginForm$.$touch();
        return;
      }

      const resp = await login(this.credentials);

      if (resp.status) {
        router.push({
          name: 'home'
        });
      } else {
        this.error = 'Username or password is invalid.';
      }
    },
    signUp() {
      router.push({
        name: 'signUp'
      });
    }
  }
};
</script>
