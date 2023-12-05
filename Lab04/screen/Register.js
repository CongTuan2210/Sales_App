import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome'
import Input from './Input';

function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onPressHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.main}>
      <View style={styles.logo}>
        <Image
          style={styles.logo_img}
          source={require('../logo/logo.png')}
        />
        <Text style={styles.text_logo}>Create New Account</Text>
      </View>

      <View style={styles.input_container}>
        <Input
          marginBottom={20}
          marginLeft={16}
          name="user"
          onChangeText={value => setUsername(value)}
          value={username}
          placeholder="Enter username"
          multiline={false}
          secureTextEntry={false}
        />
        <Input
          marginBottom={20}
          marginLeft={10}
          name="envelope"
          onChangeText={value => setEmail(value)}
          value={email}
          placeholder="Email"
          multiline={false}
          secureTextEntry={false}
        />
        <Input
          marginBottom={20}
          marginLeft={16}
          name="lock"
          onChangeText={value => setPassword(value)}
          value={password}
          placeholder="Enter password"
          multiline={false}
          secureTextEntry={true}
        />
        <Input
          marginBottom={0}
          marginLeft={16}
          name="lock"
          onChangeText={value => setConfirmPassword(value)}
          value={confirmPassword}
          placeholder="Comfirm password"
          multiline={false}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.button_container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text_button}>CREATE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.login}>
        <Text style={styles.text_login}>Already have an account?</Text>
        <TouchableOpacity style={styles.login_button} onPress={onPressHandler}>
          <Text
            style={[styles.text_login, {fontWeight: '700', color: '#1a1add'}]}>
            {' '}
            Login now!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  logo: {
    marginTop: 90,
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
  login: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  login_button: {
    // backgroundColor: '#000000',
  },
  text_login: {
    fontSize: 20,
    color: '#000000',
  },
});

export default Register;
