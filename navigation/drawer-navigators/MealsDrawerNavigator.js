import React from 'react';

import { MealsFavsTabNavigator } from '../tab-navigators';
import { FiltersStackNavigator } from '../stack-navigators';
import CreateDrawerNavigator from './CreateDrawerNavigator';

const screens = [
    { name: 'MealsFavs', component: MealsFavsTabNavigator },
    { name: 'Filters', component: FiltersStackNavigator }
];
const MealsDrawerNavigator = () => (
    <CreateDrawerNavigator screens={screens} />
);

export default MealsDrawerNavigator;
