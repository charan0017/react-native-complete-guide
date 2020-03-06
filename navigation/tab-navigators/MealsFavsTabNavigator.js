import React from 'react';

import { MealsStackNavigator, FavoritesStackNavigator } from '../stack-navigators';
import CreateTabNavigator from './CreateTabNavigator';

const screens = [
    { name: 'Meals', component: MealsStackNavigator },
    { name: 'Favorites', component: FavoritesStackNavigator }
];
const MealsFavsTabNavigator = () => (
    <CreateTabNavigator screens={screens} />
);

MealsFavsTabNavigator.navigationOptions = {
    title: 'Meals'
};

export default MealsFavsTabNavigator;
