import Login from './Login';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './Register';

const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
