<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Sign Up</h5>
        <form>
          <div class="form-group pb-3">
            <label>Username</label>
            <input
              type="text"
              class="form-control"
              v-model="newUser.username"
              :class="v$.newUser.username.$error === true ? 'is-invalid' : ''"
            />
            <span class="form-text text-danger" v-for="error of v$.newUser.username.$errors" :key="error.$uid">
              {{ error.$message }}
            </span>
          </div>
          <div class="form-group pb-3">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="newUser.password"
              :class="v$.newUser.password.$error === true ? 'is-invalid' : ''"
            />
            <span class="form-text text-danger" v-for="error of v$.newUser.password.$errors" :key="error.$uid">
              {{ error.$message }}
            </span>
          </div>
          <div class="form-group pb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              class="form-control"
              v-model="newUser.confirmPassword"
              :class="v$.newUser.confirmPassword.$error === true ? 'is-invalid' : ''"
            />
            <span class="form-text text-danger" v-for="error of v$.newUser.confirmPassword.$errors" :key="error.$uid">
              {{ error.$message }}
            </span>
          </div>
          <span class="form-text text-danger">
            {{ error }}
          </span>
          <div class="d-flex justify-content-center mt-1">
            <button class="btn btn-primary" @click="signUp()">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { signUp } from '../../../helpers/auth';
import router from '../../../router/router';

export default {
  name: 'SignUpForm',
  data() {
    return {
      v$: useVuelidate(),
      newUser: {
        username: null,
        password: null,
        confirmPassword: null
      },
      error: null
    };
  },
  validations() {
    return {
      newUser: {
        username: {
          required: helpers.withMessage('Username field is required.', required),
          $autoDirty: true
        },
        password: {
          required: helpers.withMessage('Password field is required.', required),
          $autoDirty: true
        },
        confirmPassword: {
          required: helpers.withMessage('Confirm Password field is required.', required),
          $autoDirty: true
        }
      }
    };
  },
  methods: {
    async signUp() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        this.v$.$touch();

        return;
      }

      if (this.newUser.password !== this.newUser.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }

      const newUser = {
        username: this.newUser.username,
        password: this.newUser.password
      };
      const status = await signUp(newUser);

      if (status) {
        router.push({
          name: 'login'
        });
      } else {
        console.error("It couldn't be registered");
      }

      this.error = null;
    }
  }
};
</script>
