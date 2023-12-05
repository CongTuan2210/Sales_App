import axios from 'axios';

export const MyAxiosGetRequest = async () => {
  const res = await axios({
    method: 'GET',
    url: 'https://fakestoreapi.com/products',
  });
  return res;
};

export const GetAllCategories = async () => {
  const res = await axios({
    method: 'GET',
    url: 'https://fakestoreapi.com/products/categories',
  });
  return res;
};

export const GetProductsByCategory = async category => {
  const res = await axios({
    method: 'GET',
    url: `https://fakestoreapi.com/products/category/${category}`,
  });
  return res;
};

export const GetUsers = async () => {
  const res = await axios({
    method: 'GET',
    url: 'https://fakestoreapi.com/users',
  });
  return res;
};

export const LoginApi = async data => {
  const res = await axios({
    method: 'POST',
    url: 'https://fakestoreapi.com/auth/login',
    data: data,
  });
  return res;
};

export const GetCarts = async () => {
  const res = await axios({
    method: 'GET',
    url: 'https://fakestoreapi.com/carts',
  });
  return res;
};

export const GetCartById = async (id) => {
  const res = await axios({
    method: 'GET',
    url: 'https://fakestoreapi.com/carts/' + id,
  });
  return res;
};

export const GetProductById = async id => {
  const res = await axios({
    method: 'GET',
    url: `https://fakestoreapi.com/products/${id}`,
  });
  return res;
};

export const UpdateProduct = async (id, data) => {
  const res = await axios({
    method: 'PUT',
    url: 'https://fakestoreapi.com/carts/' + id,
    data: data,
  });
  return res;
};

export const GetUser = async (id) => {
  const res = await axios({
    method: 'GET',
    url: 'https://fakestoreapi.com/users/' + id,
  });
  return res;
};

export const UpdateUser = async (id, data) => {
  const res = await axios({
    method: 'PUT',
    url: 'https://fakestoreapi.com/users/' + id,
    data: data
  });
  return res;
};


