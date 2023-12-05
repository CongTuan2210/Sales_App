import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';

const Profile = () => {
  const {setCheckToken, setToken, setProduct, setProductCount, user, setCart, setIdCart, setShowLogo} =
    useAuth();
  const navigation = useNavigation();
  const goBackLogIn = () => {
    setCheckToken(false);
    setToken(null);
    setProduct(null);
    setIdCart(null)
    setCart(null)
    setProductCount(null);
    setShowLogo(false)
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.avt}>
          <Image
            source={{
              uri: 'https://seotrends.com.vn/wp-content/uploads/2023/03/avatar-conan-ngau.jpg',
            }}
            style={{width: 80, height: 80, borderRadius: 100}}
          />
          <Text style={styles.name}>
            {user.name.firstname} {user.name.lastname}
          </Text>
          <Icon
            name="edit"
            size={26}
            color="#000"
            style={{
              paddingLeft: 10,
              paddingVertical: 5,
              position: 'absolute',
              right: 0,
            }}
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>
        <View style={styles.info}>
          <View style={styles.detail_info}>
            <Text style={styles.text_title}>Name:</Text>
            <Text style={styles.text_info}>
              {user.name.firstname} {user.name.lastname}
            </Text>
          </View>

          <View style={styles.detail_info}>
            <Text style={styles.text_title}>Username:</Text>
            <Text style={styles.text_info}>{user.username}</Text>
          </View>

          <View style={styles.detail_info}>
            <Text style={styles.text_title}>Email:</Text>
            <Text style={styles.text_info}>{user.email}</Text>
          </View>

          <View style={styles.detail_info}>
            <Text style={styles.text_title}>Phone:</Text>
            <Text style={styles.text_info}>{user.phone}</Text>
          </View>

          <View style={styles.detail_info}>
            <Text style={styles.text_title}>Address:</Text>
            <Text style={styles.text_info}>
              {user.address.number}, {user.address.street}, {user.address.city}
            </Text>
          </View>

          <TouchableOpacity onPress={goBackLogIn} style={styles.button}>
            <Text style={styles.text_logout}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal,
    // paddingVertical
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  main: {
    width: '92%',
    height: 550,
    marginTop: 20,
    alignSelf: 'center',
  },
  avt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  info: {},
  detail_info: {
    marginTop: 10,
  },
  text_title: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  text_info: {
    fontSize: 16,
    color: '#000',
  },
  text_logout: {
    fontWeight: '400',
    fontSize: 20,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#4190f4',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    height: 40,
  },
});

export default Profile;
