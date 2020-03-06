import React from 'react';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../../constants/Colors';
import CreateScreen from '../CreateScreen';

const tabBarOptions = {
    activeTintColor: Colors.accentColor,
    shifting: true,
    barStyle: { // Put this if shifting is false
        backgroundColor: Colors.primaryColor
    },
    labelStyle: {
        fontFamily: 'open-sans-bold'
    }
};

const { Navigator, Screen } = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const CreateTabNavigator = ({ screens }) => (
    <Navigator tabBarOptions={tabBarOptions} {...tabBarOptions}>
        {screens.map(({ name, component }) => CreateScreen(Screen, name, component))}
    </Navigator>
);

export default CreateTabNavigator;
