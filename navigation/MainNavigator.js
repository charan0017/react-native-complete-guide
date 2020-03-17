import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PlacesStackNavigator } from './stack-navigators';

function MainNavigator() {
    return (
        <NavigationContainer>
            <PlacesStackNavigator />
        </NavigationContainer>
    );
}

export default MainNavigator;
