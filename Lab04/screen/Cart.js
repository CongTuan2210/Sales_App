import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GetProductById,
  UpdateProduct,
} from '../api/MyAxiosRequests';
import {useAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ModalDeleteProduct from '../modal/ModalDeleteProduct';

const Cart = () => {
  const [productDetail, setProductDetail] = useState([]); 
  // const [totalAmount, setTotalAmount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const {
    idCart,
    product,
    setProduct,
    productCount,
    setProductCount,
    cart,
    setCart,
    totalAmount,
    setTotalAmount
  } = useAuth();

  useEffect(() => {
    getDetailProduct();
  }, [product]);

  useEffect(() => {
    if (!isLoading) {
      updateTotalAmount();
    }
  }, [productDetail, isLoading]);

  useEffect(() => {
    console.log('CART: ', cart);
  }, [cart]);

  const getDetailProduct = async () => {
    const fetchProductDetail = async () => {
      if (product === null) {
        setProductCount(null)
        setIsLoading(false)
      }
      else {
        const promises = product.map(async item => {
          const response = await GetProductById(item.productId);
          setIsLoading(false);
          return {
            ...response.data,
            quantity: item.quantity,
          };
        });
        const products = await Promise.all(promises);
        setProductDetail(products);
      };
    }
    fetchProductDetail();
  };

  const updateTotalAmount = () => {
    const total = productDetail.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.price * currentItem.quantity,
      0,
    );
    setTotalAmount(total);
  };

  const handleQuantityChange = async (item, action) => {
    const updatedProductDetail = productDetail.map(productItem => {
      if (action === 'decrement' && item.quantity === 1) {
        setModalVisible(true);
        setProductToDelete(item.id);
      } else {
        if (productItem.id === item.id) {
          const updatedQuantity =
            action === 'increment'
              ? productItem.quantity + 1
              : productItem.quantity - 1;
          const updateProduct = {
            productId: item.id,
            quantity: updatedQuantity,
          };
          const updateCart = product.map(cartItem =>
            cartItem.productId === item.id ? updateProduct : cartItem,
          );
          setProduct(updateCart);
          const update = {...cart, products: updateCart};
          setCart(update);
          UpdateProduct(idCart, update)
            .then(response => {
              console.log('Update quantity: ', response.data);
            })
            .catch(err => {
              console.log('Error change quantity: ', err);
            });

          return {
            ...productItem,
            quantity: updatedQuantity >= 0 ? updatedQuantity : 0,
          };
        }
      }
      return productItem;
    });

    setProductDetail(updatedProductDetail);
    updateTotalAmount();
  };

  const handleDeleteProduct = async (idCart, productId) => {
    const updateCart = product.filter(item => item.productId !== productId);
    const update = {...cart, products: updateCart};
    const productLength = updateCart.length === 0 ? null : updateCart.length;
    setProduct(updateCart);
    setCart(update);
    setProductCount(productLength);
    await UpdateProduct(idCart, update)
      .then(response => {
        console.log('Update after delete: ', response.data);
        setModalVisible(false);
      })
      .catch(err => {
        console.log('Error delete product: ', err);
      });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : (
        <>
          {productCount > 0 ? (
            <>
              <View style={styles.cart_products}>
                <ModalDeleteProduct
                  visible={isModalVisible}
                  onRequestClose={() => setModalVisible(false)}
                  onPressCloseModal={() => setModalVisible(false)}
                  onDeleteProduct={handleDeleteProduct}
                  productToDelete={productToDelete}
                  idCart={idCart}
                />
                <FlatList
                  data={productDetail}
                  renderItem={({item}) => (
                    <View style={styles.product_container}>
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={styles.main}>
                        <Image
                          source={{uri: item.image}}
                          style={{width: 80, height: 70, objectFit: 'fill'}}
                        />

                        <View
                          style={{
                            marginLeft: 10,
                            alignItems: 'center',
                            width: 60,
                            height: 50,
                          }}>
                          <Text style={styles.price}>${item.price}</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 10,
                              alignItems: 'center',
                            }}>
                            <Text
                              style={[
                                styles.quantity,
                                {fontSize: 22, padding: 2},
                              ]}
                              onPress={() =>
                                handleQuantityChange(item, 'decrement')
                              }>
                              -
                            </Text>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <Text
                              style={[
                                styles.quantity,
                                {fontSize: 22, padding: 2},
                              ]}
                              onPress={() =>
                                handleQuantityChange(item, 'increment')
                              }>
                              +
                            </Text>
                          </View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: 130,
                              height: 50,
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginLeft: 20,
                            }}>
                            <Text style={styles.price}>Total: </Text>
                            <Text style={styles.price}>
                              ${item.price * item.quantity}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={{
                              width: 30,
                              justifyContent: 'center',
                            }}
                            onPress={() => {
                              setModalVisible(true);
                              setProductToDelete(item.id);
                            }}>
                            <Icon
                              name="close"
                              size={24}
                              style={{color: 'red', alignSelf: 'center'}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>   
              <View style={styles.check_out}>
                <Text style={styles.text_total}>
                  Total Amount: ${totalAmount.toFixed(2)}{' '}
                </Text>
                <TouchableOpacity 
                  style={styles.btn_checkout}
                  onPress={() => navigation.navigate('Check Out')}
                >
                  <Text style={styles.text_checkout}>GET BUY</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.nofitication}>
              <Text style={styles.text_nofitication}>
                You have no products in your cart.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeStack')}
                style={styles.btn_notification}>
                <Text style={styles.text_btn}>SHOPPING NOW!</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  cart_products: {
    height: 600,
    // backgroundColor:'#000',
  },
  product_container: {
    width: 370,
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.2,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  quantity: {
    color: '#000',
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },

  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  check_out: {
    position: 'absolute',
    width: '96%',
    height: 60,
    // backgroundColor:'#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
  },
  text_total: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  btn_checkout: {
    height: 40,
    width: 100,
    borderRadius: 5,
    backgroundColor: '#078ee6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_checkout: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  nofitication: {
    marginTop: 300,
  },

  text_nofitication: {
    fontSize: 16,
    color: '#000',
  },
  btn_notification: {
    width: 150,
    height: 40,
    backgroundColor: '#078ee6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  text_btn: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Cart;
