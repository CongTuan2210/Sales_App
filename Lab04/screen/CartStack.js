import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from './Cart';
import CartCheckOut from './CartCheckOut';

const CartStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CartStack" 
        component={Cart} 
        options={
            {
                title:'Cart',
            }
        }
    />
      <Stack.Screen
        name="Check Out"
        component={CartCheckOut}
       
      />
    </Stack.Navigator>
  );
};

export default CartStack;
