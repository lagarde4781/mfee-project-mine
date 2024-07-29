import capstoneApi from '../api/capstoneApi';

export const getCategories = async () => {
  let categories = [];

  await capstoneApi
    .get('/categories')
    .then(({ data }) => {
      categories = data;
    })
    .catch((e) => console.error(e));

  return categories;
};

export const createCategory = async (category) => {
  let status;
  await capstoneApi
    .post(`/categories`, category)
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};

export const deleteCategory = async (id) => {
  let status;
  await capstoneApi
    .delete(`/categories/${id}`)
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};

export const updateCategory = async (category) => {
  let status;
  await capstoneApi
    .patch(`/categories/${category._id}`, { name: category.category.name })
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};
