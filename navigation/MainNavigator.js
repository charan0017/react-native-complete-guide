import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MealsDrawerNavigator } from './drawer-navigators';

function MainNavigator() {
    return (
        <NavigationContainer>
            <MealsDrawerNavigator />
        </NavigationContainer>
    );
}

export default MainNavigator;
