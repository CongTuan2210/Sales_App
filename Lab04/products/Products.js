import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {UpdateProduct} from '../api/MyAxiosRequests';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';

const Products = ({type, data}) => {
  const navigation = useNavigation();
  const {product, setProduct, idCart, setProductCount, setCart, cart} = useAuth();

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
        const update = {...cart, products:updatedCart}
        setProduct(updatedCart); 
        setCart(update)
        setProductCount(updatedCart.length);
        await UpdateProduct(idCart, update)
        .then(response => {
          console.log('Product add to cart: ', newProduct);
          console.log('Cart affter update: ',response.data.products)
          setProduct(response.data.products)
        })
        .catch (err => {
          console.log('Error add product to cart, ',err)
        })
      }
    } catch (err) {
      console.log('Error add product to cart: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.text_heading}>{type}</Text>
        <Icon
          style={styles.icon}
          name={type === 'Hot Deals' ? 'fire' : 'flash'}
          size={22}
          color="red"
        />
      </View>

      <FlatList
        data={data}
        scrollEnabled={false}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ProductDetail', {item})}>
            <View style={styles.main}>
              <Image style={styles.image} source={{uri: item.image}} />
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price}</Text>
              <View style={styles.rating}>
                <Text style={styles.rate}>{item.rating.rate}</Text>
                <Icon name="star" size={20} color="#f5d612" />
                <Text style={styles.rate}>({item.rating.count})</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addProductToCart(idCart, item.id)}>
                <Icon name="plus" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  heading: {
    paddingLeft: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  text_heading: {
    fontSize: 22,
    fontWeight: '700',
    color: 'red',
    paddingBottom: 5,
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
  button: {
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
});
