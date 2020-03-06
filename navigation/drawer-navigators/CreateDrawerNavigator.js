import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../../constants/Colors';
import CreateScreen from '../CreateScreen';

const drawerContentOptions = {
    activeTintColor: Colors.accentColor,
    labelStyle: {
        fontFamily: 'open-sans-bold'
    }
};

const { Navigator, Screen } = createDrawerNavigator();
const CreateDrawerNavigator = ({ screens }) => (
    <Navigator drawerContentOptions={drawerContentOptions}>
        {screens.map(({ name, component }) => CreateScreen(Screen, name, component))}
    </Navigator>
);

export default CreateDrawerNavigator;
