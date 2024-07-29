<template>
  <div class="card mb-3" style="width: 30rem">
    <div class="card-body">
      <h5 class="card-title"><i class="fa-solid fa-user me-1"></i> {{ author }}</h5>
      <p class="card-text ps-4">{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    content: String,
    author: String
  },
  data() {
    return {};
  }
};
</script>
