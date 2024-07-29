<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <h1 class="display-6">Categories</h1>
      <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#createCategoryModal">Add Category</button>
    </div>

    <hr />
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in store.categories" :key="category._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ category.name }}</td>
          <td>
            <i
              class="fa-solid fa-pen me-3"
              data-bs-toggle="modal"
              data-bs-target="#createCategoryModal"
              @click="updateCategory(category)"
            ></i>
            <i class="fa-solid fa-trash" @click="deleteCategory(category._id)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CategoryForm :categorySelected="categorySelected" />
</template>

<script>
import CategoryForm from './CategoryForm.vue';
import { deleteCategory } from '../../../helpers/categories';
import { store } from '../../../store/store';
import { alerts } from '../../../helpers/alerts';

export default {
  name: 'CategoryList',
  components: {
    CategoryForm
  },
  mixins: [alerts],
  data() {
    return {
      categories: [],
      categorySelected: null,
      store
    };
  },
  methods: {
    updateCategory(category) {
      this.categorySelected = category;
    },
    async deleteCategory(id) {
      const status = await deleteCategory(id);
      if (status) {
        this.showAlert('success', 'The category has been deleted');
        this.store.getCategories();
      } else {
        this.showAlert('error', "The category couldn't be deleted");
      }
    }
  },
  created() {
    this.store.getCategories();
  }
};
</script>
