import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStack from './HomeStack';
import Cart from './Cart';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CategoriesStack from './CategoriesStack';
import { useAuth } from '../context/AuthContext';
import ProfileStack from './ProfileStack';
import CartStack from './CartStack';

const MainBottom = () => {
  const Tab = createBottomTabNavigator();
  const {productCount} = useAuth()
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = 'home';
            size = focused ? 30 : 25;
            color = focused ? '#4190f4' : '#808080';
          } else if (route.name === 'Categories') {
            iconName = 'bars';
            size = focused ? 30 : 25;
            color = focused ? '#4190f4' : '#808080';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
            size = focused ? 30 : 25;
            color = focused ? '#4190f4' : '#808080';
          } else if (route.name === 'Profile') {
            iconName = 'user';
            size = focused ? 30 : 25;
            color = focused ? '#4190f4' : '#808080';
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarLabelStyle: {fontSize: 15},
      })}>
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={
          {
            header: () => null,
            title: 'Home'
          }
        } 
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{header: () => null}}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={
          {
            tabBarBadge: productCount,
            headerShown: false
          }
        }
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{header: () => null}}
      />
    </Tab.Navigator>
  );
};

export default MainBottom;
