import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductDetail from '../products/ProductDetail';
import Home from './Home';

const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({route}) => ({title: route.params.item.title})}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
