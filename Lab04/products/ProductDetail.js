import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductDetail = () => {
  const route = useRoute();
  const {item} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <View style={styles.rating}>
        <Text style={styles.rate}>Rating: </Text>
        <Text style={styles.rate}>{item.rating.rate}</Text>
        <Icon name="star" size={20} color="#f5d612" />
        <Text style={styles.rate}>({item.rating.count})</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 400,
    objectFit: 'fill'
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#000',
  },
  price: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  rating: {
    gap: 6,
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  rate: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
});
