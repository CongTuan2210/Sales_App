import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';
import {GetCartById, GetCarts, GetUser} from '../api/MyAxiosRequests';
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(null);
  const [id, setId] = useState();
  const [checkToken, setCheckToken] = useState(false);
  const setCredentials = (newUsername, newPassword) => {
    setPassword(newPassword);
    setUsername(newUsername);
  };

  const [showLogo, setShowLogo] = useState(true)

  const [product, setProduct] = useState([]);
  const [idCart, setIdCart] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0)

  const getIdCart = async () => {
    await GetCarts()
      .then(response => {
        const userId = response.data.find(cart => cart.userId === id);
        console.log('Products: ', userId.products);
        setProduct(userId.products);
        setIdCart(userId.id);
        console.log('Product count: ', userId.products.length);
        setProductCount(userId.products.length);
      })
      .catch(err => {
        console.log('Error get id cart: ', err);
        setProductCount(null)
        setProduct(null)
      });
  };

  const getCartById = async () => {
    await GetCartById(idCart)
      .then(response => {
        setCart(response.data);
        console.log('Data cart: ', response.data);
        setCart(response.data)
      })
      .catch(err => {
        console.log('Error get data cart: ', err);
      });
  };

  const getUser = async () => {
    await GetUser(id)
      .then(renponse => {
        setUser(renponse.data);
        console.log('Data user: ', renponse.data);
      })
      .catch(err => {
        console.log('Error get user: ', err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        password,
        setCredentials,
        setToken,
        checkToken,
        setCheckToken,
        id,
        setId,

        getIdCart,
        getCartById,
        product,
        setProduct,
        idCart,
        setIdCart,
        productCount,
        setProductCount,
        user,
        setUser,
        getUser,

        cart,
        setCart,
        showLogo,
        setShowLogo,
        totalAmount,
        setTotalAmount
      }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  return useContext(AuthContext);
};

export {AuthProvider, useAuth};
