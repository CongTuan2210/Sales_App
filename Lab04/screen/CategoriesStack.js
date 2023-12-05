import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Categories from './Categories';
import CategoriesDetail from './CategoriesDetail';

const CategoriesStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoriesStack" component={Categories} options={{title:'Categories'}}/>
      <Stack.Screen
        name="CategoriesDetail"
        component={CategoriesDetail}
        options={({route}) => ({title: route.params.item.title})}
      />
    </Stack.Navigator>
  );
};

export default CategoriesStack;
