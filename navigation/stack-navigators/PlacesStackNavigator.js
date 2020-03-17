import React from 'react';

import { PlacesListScreen, PlaceDetailScreen, NewPlaceScreen, MapScreen } from '../../screens';
import CreateStackNavigator from './CreateStackNavigator';

const screens = [
    { name: 'PlacesList', component: PlacesListScreen },
    { name: 'PlaceDetail', component: PlaceDetailScreen },
    { name: 'NewPlace', component: NewPlaceScreen },
    { name: 'Map', component: MapScreen }
];
const PlacesStackNavigator = () => (
    <CreateStackNavigator initialRouteName='PlacesList' screens={screens} />
);

PlacesStackNavigator.navigationOptions = {
    title: 'Places'
};

export default PlacesStackNavigator;
