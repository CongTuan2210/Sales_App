import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyAxiosGetRequest} from '../api/MyAxiosRequests';
import MyBanner from '../banner/MyBanner';
import Products from '../products/Products';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  
  const [dataHotDeals, setDataHotDeals] = useState([])
  const [dataNewArrivals, setDataNewArrivals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {getIdCart, getUser, getCartById, idCart} = useAuth()

  useEffect(() => {
    getData();
    getIdCart()
    getUser();
  },[])

  useEffect(() => {
    getCartById();
  },[idCart])

  const getData = async () => {
    try {
      const res = await MyAxiosGetRequest();
      setDataHotDeals(res.data.slice(0,10))
      setDataNewArrivals(res.data.slice(10,20))
      setIsLoading(false)
    } catch (err) {
      console.log('Error fetching data: ', err)
      setIsLoading(false)
    }
  }

  return (
    <ScrollView
      style={styles.home}
      removeClippedSubviews={false}
      contentContainerStyle={styles.scrollContent}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : (
        <>
          <MyBanner />
          <Products type='Hot Deals' data={dataHotDeals}/>
          <Products type='New Arrivals' data={dataNewArrivals}/>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
