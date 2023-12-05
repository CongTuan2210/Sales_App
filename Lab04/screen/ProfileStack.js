import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import HeaderRight from './HeaderRight';
import { UpdateUser } from '../api/MyAxiosRequests';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();
const ProfileStack = () => {

  const {id, user} = useAuth()
  const updateUser = async () => {
    await UpdateUser(id, user)
    .then(response => {
      console.log('Value user to update: ',response.data)
    })
    .catch(err => {
      console.log('Error update user: ', err)
    })
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainProfile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={ProfileEdit}
        options={({navigation}) => ({
          headerRight: () => <HeaderRight onPress={() => 
          {navigation.navigate('MainProfile'), updateUser()}}/>
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
