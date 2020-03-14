import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { OrdersScreen } from '../../screens/shop';
import CreateStackNavigator from './CreateStackNavigator';

const screens = [
    { name: 'Orders', component: OrdersScreen }
];
const OrdersStackNavigator = () => (
    <CreateStackNavigator initialRouteName='Orders' screens={screens} />
);

OrdersStackNavigator.navigationOptions = {
    title: 'Orders',
    drawerIcon: drawerConfig => (
        <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
        />
    )
};

export default OrdersStackNavigator;
