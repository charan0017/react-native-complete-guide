import React from 'react';
import {Platform, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import CategoriesScreen from '../../screens/CategoriesScreen';
import CategoryMealsScreen from '../../screens/CategoryMealsScreen';
import MealsDetailScreen from '../../screens/MealsDetailScreen';
import CreateStackNavigator from './CreateStackNavigator';

const screens = [
    { name: 'Categories', component: CategoriesScreen },
    { name: 'CategoryMeals', component: CategoryMealsScreen },
    { name: 'MealDetail', component: MealsDetailScreen }
];
const MealsStackNavigator = () => (
    <CreateStackNavigator initialRouteName='Categories' screens={screens} />
);

MealsStackNavigator.navigationOptions = {
    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text> : 'Meals',
    tabBarIcon: (tabInfo) => <Ionicons name='ios-restaurant' size={25} color={tabInfo.color} />,
    tabBarColor: Colors.primaryColor,
};

export default MealsStackNavigator;
