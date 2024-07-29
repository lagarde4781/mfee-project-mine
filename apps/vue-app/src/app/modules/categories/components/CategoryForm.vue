<template>
  <div class="modal fade" id="createCategoryModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">{{ action }} Category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reset()"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group pb-3">
              <label>Name</label>
              <input
                type="text"
                class="form-control"
                v-model="category.name"
                :class="v$.category.name.$error === true ? 'is-invalid' : ''"
              />
              <span class="form-text text-danger" v-for="error of v$.category.name.$errors" :key="error.$uid">
                {{ error.$message }}
              </span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="btnCloseModal" @click="reset()">Cancel</button>
          <button class="btn btn-primary" @click="submit()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { createCategory, updateCategory } from '../../../helpers/categories';
import { store } from '../../../store/store';
import { alerts } from '../../../helpers/alerts';

export default {
  name: 'CategoryForm',
  props: {
    categorySelected: {
      type: Object
    }
  },
  mixins: [alerts],
  data() {
    return {
      v$: useVuelidate(),
      action: 'Create',
      category: {
        _id: null,
        name: null
      },
      store
    };
  },
  validations() {
    return {
      category: {
        name: {
          required: helpers.withMessage('Name field is required.', required),
          $autoDirty: true
        }
      }
    };
  },
  methods: {
    reset() {
      this.category = {
        _id: null,
        name: null
      };
      this.v$.$reset();
    },
    async submit() {
      const isValid = await this.v$.$validate();

      if (!isValid) {
        this.v$.$touch();
      } else {
        const category = {
          name: this.category.name
        };

        this.saveCategory(category);
      }
    },
    async saveCategory(category) {
      let status;
      if (this.action === 'Create') {
        status = await createCategory(category);
      } else {
        status = await updateCategory({ category, _id: this.categorySelected._id });
      }
      if (status) {
        this.showAlert('success', 'The category has been saved');
        this.store.getCategories();
      } else {
        this.showAlert('error', "The category couldn't be saved");
      }
      this.$refs.btnCloseModal.click();
    }
  },
  watch: {
    categorySelected(newValue) {
      if (newValue) {
        const { _id, name } = newValue;
        this.category = {
          _id,
          name
        };
        this.action = 'Edit';
      } else {
        this.action = 'Create';
        this.reset();
      }
    }
  }
};
</script>
