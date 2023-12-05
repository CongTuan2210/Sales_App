import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import {GetProductById} from '../api/MyAxiosRequests';
import { useNavigation } from '@react-navigation/native'

const CartCheckOut = () => {
  const navigation = useNavigation()
  const {product, setProduct, totalAmount, setProductCount} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [productDetail, setProductDetail] = useState([]);
  const [address, setAddress] = useState(null)

  const options = ['Normal', 'Fast', 'Express'];
  const optionPrices = [5,10,15]
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectOption = index => {
    setSelectedOption(index);
  };

  const calculateTotalAmount = () => {
    if (selectedOption !== null) {
      const shippingCost = optionPrices[selectedOption]
      return totalAmount + shippingCost
    }
    return totalAmount
  }

  const handleCheckOut = () => {
    if (selectedOption === null || selectPayment === null || address === null) {
      Alert.alert(
        'Message',
        'You have not selected a shipping method or payment method or you do not enter an address!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
          },
        ],
      );
    } else {
      Alert.alert(
        'Success.',
        'Check out success! Thank you for trusting us...',
        [
          {
            text: 'OK',
            onPress: () => successPayment(),
          },
        ],
      );
    }
  }
  const successPayment = () => {
    navigation.navigate('CartStack')
    setProduct([])
    setProductCount(null)
  }

  const payments = [
    'https://developers.momo.vn/v3/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png',
    'https://png.pngtree.com/png-vector/20191028/ourlarge/pngtree-pack-cash-icon-cartoon-style-png-image_1893446.jpg',
  ];
  const [selectPayment, setSelectPayment] = useState(null);
  const handlePayment = index => {
    setSelectPayment(index);
  };

  useEffect(() => {
    getDetailProduct();
  }, [product]);

  const getDetailProduct = async () => {
    const fetchProductDetail = async () => {
      if (product === null) {
        setIsLoading(false);
      } else {
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
      }
    };
    fetchProductDetail();
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
          <View style={{flex: 1}}>
            <ScrollView style={{flexGrow: 1}}>
              <View styles={styles.address}>
                <Icon name="map-marker" size={30} style={styles.icon_map} />
                <TextInput
                  style={styles.input_address}
                  placeholder="Address..."
                  value={address}
                  onChangeText={(value) => setAddress(value)}
                />
              </View>

              <View style={styles.product}>
                <Text style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
                  Product list:{' '}
                </Text>
                <FlatList
                  data={productDetail}
                  scrollEnabled={false}
                  renderItem={({item}) => (
                    <View style={styles.product_container}>
                      <View style={styles.product_main}>
                        <Image
                          source={{uri: item.image}}
                          style={{width: 80, height: 70, objectFit: 'fill'}}
                        />
                        <View style={styles.info}>
                          <Text
                            style={styles.title}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {item.title}
                          </Text>

                          <View style={styles.quantity}>
                            <Text style={styles.price}>${item.price}</Text>
                            <Text style={styles.price}>x{item.quantity}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: '#000',
                    fontWeight: '500',
                    marginTop: 10,
                  }}>
                  Shipping method:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectOption(index)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
                        <View
                          style={{
                            height: 24,
                            width: 24,
                            borderWidth: 2,
                            borderRadius: 100,
                            borderColor:
                              selectedOption === index ? 'green' : 'gray',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {selectedOption === index && (
                            <Icon name="check" size={16} color="green" />
                          )}
                        </View>
                        <Text
                          style={{
                            marginLeft: 8,
                            fontSize: 15,
                            fontWeight: '500',
                            color: selectedOption === index ? 'green' : 'gray',
                          }}>
                          {option}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={{flex: 1}}>
                  <Text
                    style={{
                      position: 'absolute',
                      fontSize: 16,
                      color: 'gray',
                      top: 18,
                      fontWeight: '500',
                    }}>
                    Message:
                  </Text>
                  <TextInput
                    style={{
                      // borderWidth:1,
                      fontWeight: '500',
                      marginTop: 10,
                      textAlign: 'right',
                      height: 40,
                      fontSize: 16,
                      color: 'gray',
                      paddingLeft: 85,
                    }}
                    placeholder="Note to seller..."
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    alignItems: 'center',
                    // backgroundColor:'#000'
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{fontSize: 18, color: '#000', fontWeight: '500'}}>
                    Payment methods:
                  </Text>
                  {payments.map((payment, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handlePayment(index)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                          // marginLeft: 10
                        }}>
                        <View
                          style={{
                            height: 24,
                            width: 24,
                            borderWidth: 2,
                            borderRadius: 100,
                            borderColor:
                              selectPayment === index ? 'green' : 'gray',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {selectPayment === index && (
                            <Icon name="check" size={16} color="green" />
                          )}
                        </View>
                        <Image
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 100,
                            marginLeft: 7,
                          }}
                          source={{uri: payment}}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={{flexDirection:'row', width:'96%', alignSelf:'center',marginTop:10}}>
                <Icon name="sticky-note-o" color="orange" size={25} />
                <Text style={{paddingLeft:5,color:'#000',fontSize:15,width:'95%'}}>
                  Clicking "CHECK OUT" means you agree to abide by the shop's
                  terms and conditions
                </Text>
              </View>

              <View style={{height: 65}} />
            </ScrollView>

            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: 60,
                paddingHorizontal: 5,
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
                bottom: 0,
              }}>
              <Text style={{fontSize: 18, fontWeight: '800', color: '#000'}}>
                Total Amount: ${calculateTotalAmount().toFixed(2)}{' '}
              </Text>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 5,
                  backgroundColor: '#078ee6',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  handleCheckOut()
                }}
                >
                <Text style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>
                  CHECK OUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CartCheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  address: {
    // width: '96%'
    // position:'relative'
  },
  input_address: {
    position: 'relative',
    width: '96%',
    color: '#000',
    fontSize: 16,
    marginTop: 10,
    borderWidth: 0.6,
    alignSelf: 'center',
    borderColor: '#999',
    paddingLeft: 40,
  },
  icon_map: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'red',
  },
  product: {
    width: '96%',
    marginTop: 10,
    alignSelf: 'center',
  },
  product_container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    width: '100%',
    height: 100,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  product_main: {
    flexDirection: 'row',
  },
  info: {
    width: '76%',
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  price: {
    fontSize: 15,
    color: '#999',
    fontWeight: '600',
  },
  quantity: {
    marginTop: 8,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
