import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../../constants/Colors';
import CreateScreen from '../CreateScreen';

const screenOptions = {
    gestureEnabled: false,
    mode: 'Modal',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const { Navigator, Screen } = createStackNavigator();
const CreateStackNavigator = ({ initialRouteName, screens }) => {
    return (
        <Navigator initialRouteName={initialRouteName} screenOptions={screenOptions}>
            {screens.map(({ name, component }) => CreateScreen(Screen, name, component))}
        </Navigator>
    );
};

export default CreateStackNavigator;
