import capstoneApi from '../api/capstoneApi';

export const login = async (credentials) => {
  let resp;

  await capstoneApi
    .post(`/auth/login`, credentials)
    .then(({ data }) => {
      const { accessToken } = data;
      localStorage.setItem('token', accessToken);

      resp = {
        status: true
        // accessToken: data.accessToken,
      };
    })
    .catch((e) => {
      resp = {
        status: false,
        error: e
      };
    });

  return resp;
};

export const signUp = async (credentials) => {
  let status;

  await capstoneApi
    .post(`/auth/register`, credentials)
    .then(() => {
      status = true;
    })
    .catch((e) => {
      status = false;
      console.error(e);
    });

  return status;
};
