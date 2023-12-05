import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Input from './Input';
import ModalLogin from '../modal/ModalLogin';
import {useAuth} from '../context/AuthContext';
import {LoginApi} from '../api/MyAxiosRequests';
import {useNavigation} from '@react-navigation/native';
import {decode, encode} from 'base-64';

// install base-64
// Sử dụng decode (atob)
global.atob = decode;

const jwt_decode = require('jwt-decode').jwtDecode;

function Login() {
  const navigation = useNavigation();
  const {showLogo, setShowLogo, username, password, setCredentials, setToken, setCheckToken, setId} =
    useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  // const [showLogo, setShowLogo] = useState(true)

  const animation = useRef(new Animated.Value(0)).current
  const textAnimation = useRef(new Animated.Value(0)).current
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start()

    Animated.spring(textAnimation, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true
    }).start()
  }
  // johnd, m38rmF$
  // mor_2314, 83r5^_
  // kevinryan" kev02937@,
  // derek, jklg*_56

  useEffect(() => {
    letShowLogo()
    startAnimation()
  }, [])

  const letShowLogo = () => {
    const interval = setInterval(() => {
      setShowLogo(false);
      clearInterval(interval)
    }, 6000)
    return() => clearInterval(interval)
  }

  const getUserId = async () => {
    if (!username || !password) {
      Alert.alert('Please fill your username and passwrord.');
    } else {
      await LoginApi({
        username: username,
        password: password,
      })
        .then(response => {
          const token = response.data.token;
          setToken(token);
          const decodeToken = jwt_decode(token).sub;
          console.log('id user: ', decodeToken);
          setId(decodeToken);
          if (token) {
            setCheckToken(true);
          }
        })
        .catch(err => {
          console.log('Error Login: ', err);
          setModalVisible(true);
        });
    }
  };

  const onPressHandler = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.main}>
      {
        showLogo ? (
          <View style={styles.logo_container}>
            <Animated.Image
              style={[styles.main_logo, {opacity: animation}]}
              source={require('../logo/logo.png')}
            />
            <Animated.Text 
              style={[
                styles.title_logo,
                {
                  transform: [
                    {
                      translateY: textAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 0],
                      })
                    }
                  ]
                }
                ]}
            >
              Welcom to shop Tuan Vu...
            </Animated.Text>
          </View>
        ): (
          <View styles={styles.login}>
            <ModalLogin
              visible={isModalVisible}
              onRequestClose={() => setModalVisible(false)}
              onPressFunction={() => setModalVisible(false)}
            />
            <View style={styles.logo}>
              <Image
                style={styles.logo_img}
                source={require('../logo/logo.png')}
              />
              <Text style={styles.text_logo}>Welcome</Text>
            </View>

            <View style={styles.input_container}>
              <Input
                marginBottom={20}
                marginLeft={10}
                name="user"
                onChangeText={value => setCredentials(value, password)}
                value={username}
                placeholder="Username"
                multiline={false}
                secureTextEntry={false}
              />
              <Input
                marginBottom={0}
                marginLeft={10}
                name="lock"
                onChangeText={value => setCredentials(username, value)}
                value={password}
                placeholder="Password"
                multiline={false}
                secureTextEntry={true}
              />
            </View>

            <Pressable style={styles.forgot} android_ripple={{color: '#808080'}}>
              <Text style={styles.forgot_text}>Forgot password?</Text>
            </Pressable>

            <View style={styles.button_container}>
              <TouchableOpacity style={styles.button} onPress={() => getUserId()}>
                <Text style={styles.text_button}>LOG IN</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.other_login}>
              <Text style={styles.other_text_login}>Or login with</Text>
              <View style={styles.fb_gg_logo}>
                <Image
                  style={styles.fb_gg}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
                  }}
                />
                <Image
                  style={styles.fb_gg}
                  source={{
                    uri: 'https://newsinitiative.withgoogle.com/hownewsworks/static/images/products-googlesearch.png',
                  }}
                />
              </View>

              <View style={styles.sign_up}>
                <Text style={styles.text_sign_up}>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={onPressHandler}
                  style={styles.sign_up_button}>
                  <Text
                    style={[
                      styles.text_sign_up,
                      {fontWeight: '700', color: '#1a1add'},
                    ]}>
                    {' '}
                    Sign up here!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  logo_container: {
    height: '100%',
    // backgroundColor: '#00000099',
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main_logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title_logo: {
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
  },

  logo: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_img: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  text_logo: {
    fontSize: 25,
    marginTop: 10,
    color: '#000000',
    fontWeight: '700',
  },
  input_container: {
    marginTop: 30,
    alignItems: 'center',
  },
  forgot: {
    marginTop: 10,
    marginLeft: 235,
    marginRight: 35,
  },
  forgot_text: {
    color: '#e183bb',
    fontWeight: '700',
    fontSize: 15,
  },

  button_container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 320,
    height: 50,
    borderRadius: 10,
    // backgroundColor: '#e77105',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_button: {
    fontSize: 25,
    fontWeight: '400',
    color: '#ffffff',
  },

  other_login: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  other_text_login: {
    fontSize: 23,
    color: '#000000',
    fontWeight: '700',
  },
  fb_gg_logo: {
    width: 140,
    marginTop: 20,
    flexDirection: 'row',
    // backgroundColor: '#808080',
    justifyContent: 'space-between',
  },
  fb_gg: {
    height: 60,
    width: 60,
  },

  sign_up: {
    marginTop: 20,
    flexDirection: 'row',
  },
  sign_up_button: {
    // backgroundColor: '#000000',
  },
  text_sign_up: {
    fontSize: 20,
    color: '#000000',
  },
});

export default Login;
