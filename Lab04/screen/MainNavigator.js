// import { View, Text } from 'react-native'
import MainBottom from './MainBottom'
import { useAuth } from '../context/AuthContext';
import React from 'react'
import AuthStack from './AuthStack';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const MainNavigator = () => {
  
    const {checkToken} = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{header: () => null}}
      >
      {
        checkToken ? (
          <Stack.Screen 
            name="MainBottom"
            component={MainBottom}
          />
        ) : (
          <Stack.Screen 
            name="AuthStack"
            component={AuthStack}
          />
        )
      }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator