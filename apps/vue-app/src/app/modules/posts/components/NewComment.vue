<template>
  <div class="col-md-6 mt-5">
    <form>
      <input
        type="text"
        class="form-control"
        placeholder="Write a comment"
        :class="v$.comment.$error === true ? 'is-invalid' : ''"
        v-model="comment"
      />
      <span class="form-text text-danger" v-for="error of v$.comment.$errors" :key="error.$uid">
        {{ error.$message }}
      </span>
    </form>
  </div>
  <div class="col-md-6">
    <button class="btn btn-primary mt-2" @click="save()">Add</button>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { addComment } from '../../../helpers/posts';
import { alerts } from '../../../helpers/alerts';
import { getPostById } from '../../../helpers/posts';

export default {
  mixins: [alerts],
  data() {
    return {
      comment: '',
      v$: useVuelidate()
    };
  },
  validations() {
    return {
      comment: {
        required: helpers.withMessage('This field is required.', required),
        $autoDirty: true
      }
    };
  },
  methods: {
    async save() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        this.v$.$touch();
      } else {
        const comment = {
          author: 'Joe Doe',
          content: this.comment
        };
        const postId = this.$route.params.id;
        const status = await addComment(postId, comment);

        if (status) {
          this.showAlert('success', 'The comment has been saved');
          this.getPostById(postId);
        } else {
          this.showAlert('error', "The comment couldn't be saved");
        }

        this.comment = '';
      }
    },
    async getPostById(postId) {
      this.post = await getPostById(postId);
    }
  }
};
</script>
