import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ShopDrawerNavigator } from './drawer-navigators';

function ShopNavigator() {
    return (
        <NavigationContainer>
            <ShopDrawerNavigator />
        </NavigationContainer>
    );
}

export default ShopNavigator;
