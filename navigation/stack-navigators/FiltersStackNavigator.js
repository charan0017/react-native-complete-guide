import React from 'react';

import { FiltersScreen } from '../../screens';
import CreateStackNavigator from './CreateStackNavigator';

const screens = [
    { name: 'Filters', component: FiltersScreen }
];
const FiltersStackNavigator = () => (
    <CreateStackNavigator initialRouteName='Filters' screens={screens} />
);

FiltersStackNavigator.navigationOptions = {
    title: 'Filters'
};

export default FiltersStackNavigator;
