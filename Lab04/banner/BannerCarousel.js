import {StyleSheet, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from 'react-native-snap-carousel';

const BannerCarousel = ({banners}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const renderItem = ({item}) => {
    return (
      <View style={styles.bannerContainer}>
        <Image source={item.image} style={styles.bannerImage} />
      </View>
    );
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (activeIndex < banners.length - 1) {
  //       setActiveIndex(activeIndex + 1);
  //     } else {
  //       setActiveIndex(0);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [activeIndex, banners.length]);

  return (
    <Carousel
      data={banners}
      renderItem={renderItem}
      sliderWidth={700}
      itemWidth={300}
      onSnapToItem={index => setActiveIndex(index)}
      autoplay={true}
      autoplayInterval={5000}
      loop={true}
    />
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
    // backgroundColor: '#000'
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});
