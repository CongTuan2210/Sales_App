import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useAuth} from '../context/AuthContext';

const ProfileEdit = () => {

  const { user, setUser } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.name}>
          <View style={styles.firstname}>
            <Text style={styles.title}>First Name</Text>
            <TextInput
              style={styles.input}
              value={user.name.firstname}
              onChangeText={value =>  
                setUser({
                  ...user,
                  name: {...user.name, firstname: value},
                })
              }
            />
          </View>
          <View style={styles.lastname}>
            <Text style={styles.title}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={user.name.lastname}
              onChangeText={value =>
                setUser({
                  ...user,
                  name: {...user.name, lastname: value},
                })
              }
            />
          </View>
        </View>

        <View style={styles.input_container}>
          <Text style={styles.title}>Username</Text>
          <TextInput
            style={styles.input}
            value={user.username}
            onChangeText={value => setUser({...user, username: value})}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={value => setUser({...user, email: value})}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.title}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={user.phone}
            onChangeText={value => setUser({...user, phone: value})}
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.title}>House Number</Text>
          <TextInput
            style={styles.input}
            value={user.address.number.toString()}
            onChangeText={value =>
              setUser({
                ...user,
                address: {...user.address, number: value},
              })
            }
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.title}>Street</Text>
          <TextInput
            style={styles.input}
            value={user.address.street}
            onChangeText={value =>
              setUser({
                ...user,
                address: {...user.address, street: value},
              })
            }
          />
        </View>

        <View style={styles.input_container}>
          <Text style={styles.title}>City</Text>
          <TextInput
            style={styles.input}
            value={user.address.city}
            onChangeText={value =>
              setUser({
                ...user,
                address: {...user.address, city: value},
              })
            }
          />
        </View>
      </View>

    </View>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: '92%',
    alignSelf: 'center',
    height: 600,
    marginTop: 10,
  },
  name: {
    flexDirection: 'row',
  },
  firstname: {
    width: '60%',
    paddingRight: 10,
  },
  lastname: {
    width: '40%',
  },
  input: {
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 0.5,
    borderColor: '#999',
    borderRadius: 5,
  },
  input_container: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    marginBottom: 5,
  },
});
