<template>
  <CategoryView />
  <!-- <PostDetailView /> -->
</template>

<script>
import PostView from './modules/posts/views/PostView.vue';
import SignUpView from './modules/auth/views/SignUpView.vue';
import LoginView from './modules/auth/views/LoginView.vue';
import CategoryView from './modules/categories/views/CategoryView.vue';
/* import PostDetailView from './modules/posts/views/PostDetailView.vue'; */

export default {
  components: {
    CategoryView
    /* PostDetailView */
  }
};
</script>
