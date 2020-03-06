import React from 'react';
import {Platform, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import FavoritesScreen from '../../screens/FavoritesScreen';
import CreateStackNavigator from './CreateStackNavigator';
import MealsDetailScreen from '../../screens/MealsDetailScreen';

const screens = [
    { name: 'Favorites', component: FavoritesScreen },
    { name: 'MealDetail', component: MealsDetailScreen }
];
const FavoritesStackNavigator = () => (
    <CreateStackNavigator initialRouteName='Favorites' screens={screens} />
);

FavoritesStackNavigator.navigationOptions = {
    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text> : 'Favorites',
    tabBarIcon: (tabInfo) => <Ionicons name='ios-star' size={25} color={tabInfo.color} />,
    tabBarColor: Colors.accentColor,
};

export default FavoritesStackNavigator;
