import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import BannerCarousel from './BannerCarousel';

const MyBanner = () => {
  const banners = [
    {
      id: 1,
      image: require('./banner_1.jpg'),
    },
    {
      id: 2,
      image: require('./banner_2.jpg'),
    },
    {
      id: 3,
      image: require('./banner_3.png')
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shop for quality, Shop for style</Text>
      <BannerCarousel banners={banners} />
    </View>
  );
};

export default MyBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontStyle:'italic',
    fontWeight: '700',
    color: 'red',
    textAlign: 'center',
  },
});
