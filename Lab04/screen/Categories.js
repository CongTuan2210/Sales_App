import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconicon from 'react-native-vector-icons/FontAwesome5';
import {
  MyAxiosGetRequest,
  GetAllCategories,
  GetProductsByCategory,
  UpdateProduct
} from '../api/MyAxiosRequests';
import { useAuth } from '../context/AuthContext';

const Categories = () => {
  const {product, setProduct, idCart, setProductCount} = useAuth()
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    SelectAllProducts();
    SelectAllCategory();
  }, []);

  const SelectAllProducts = async () => {
    try {
      const res = await MyAxiosGetRequest();
      setData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };
  const SelectAllCategory = async () => {
    try {
      const res = await GetAllCategories();
      console.log(res.data);
      setAllCategory(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };
  const SelectProductsCategory = async category => {
    try {
      const res = await GetProductsByCategory(category);
      setData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log('Error fetching data: ', err);
    }
  };

  const handleCategoryPress = item => {
    setSelectedCategory(item);
    if (item === 'All') {
      SelectAllProducts();
    } else {
      SelectProductsCategory(item);
    }
  };

  const addProductToCart = async (idCart, productId) => {
    try {
      const existingProduct = product.find(
        item => item.productId === productId,
      );
      if (existingProduct) {
        Alert.alert('Product is already in the cart.');
      } else {
        const newProduct = {productId, quantity: 1};
        const updatedCart = [...product, newProduct];
        setProduct(updatedCart);
        setProductCount(updatedCart.length);
        await UpdateProduct(idCart, updatedCart);
        console.log('Product add to cart: ', newProduct);
        console.log('Product: ', product);
      }
    } catch (err) {
      console.log('Error add product to cart: ', err);
    }
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
          <View style={styles.option}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedCategory === 'All' && styles.selectedButton,
              ]}
              onPress={() => handleCategoryPress('All')}>
              <Icon
                name="th-large"
                size={30}
                color={selectedCategory === 'All' ? '#1e90ff' : '#999'}
              />
              <Text
                style={[
                  styles.title_product,
                  selectedCategory === 'All' && styles.selectedText,
                ]}>
                All
              </Text>
            </TouchableOpacity>

            {allCategory.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      selectedCategory === item && styles.selectedButton,
                    ]}
                    onPress={() => handleCategoryPress(item)}>
                    {item === 'electronics' ? (
                      <Icon
                        name="bolt"
                        size={30}
                        color={selectedCategory === item ? '#1e90ff' : '#999'}
                      />
                    ) : item === 'jewelery' ? (
                      <Iconicon
                        name="ring"
                        size={30}
                        color={selectedCategory === item ? '#1e90ff' : '#999'}
                      />
                    ) : item === "men's clothing" ? (
                      <Icon
                        name="male"
                        size={30}
                        color={selectedCategory === item ? '#1e90ff' : '#999'}
                      />
                    ) : (
                      <Icon
                        name="female"
                        size={30}
                        color={selectedCategory === item ? '#1e90ff' : '#999'}
                      />
                    )}
                    <Text
                      style={[
                        styles.title_product,
                        selectedCategory === item && styles.selectedText,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate('CategoriesDetail', {item})}>
                <View style={styles.main}>
                  <Image style={styles.image} source={{uri: item.image}} />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.title}>
                    {item.title}
                  </Text>
                  <Text style={styles.price}>${item.price}</Text>
                  <View style={styles.rating}>
                    <Text style={styles.rate}>{item.rating.rate}</Text>
                    <Icon name="star" size={20} color="#f5d612" />
                    <Text style={styles.rate}>({item.rating.count})</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button_addcart}
                    onPress={() => addProductToCart(idCart, item.id)}>
                    <Icon name="plus" size={25} color="#fff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  button: {
    alignItems: 'center',
  },
  title_product: {
    color: '#000',
    textAlign: 'center',
  },

  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    position: 'relative',
    gap: 5,
    width: 180,
    height: 230,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  icon: {
    paddingLeft: 10,
    marginTop: 5,
  },
  image: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    objectFit: 'fill',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#814249',
  },
  rating: {
    flexDirection: 'row',
    gap: 6,
  },
  rate: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  button_addcart: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    backgroundColor: '#0d3162',
    width: 30,
    height: 30,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
  selectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#1e90ff', // Màu xanh nước biển
  },
  selectedText: {
    color: '#1e90ff', // Màu xanh nước biển
  },
});

export default Categories;
