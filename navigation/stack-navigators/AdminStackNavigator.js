import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { UserProductsScreen, EditProductScreen } from '../../screens/user';
import CreateStackNavigator from './CreateStackNavigator';

const screens = [
    { name: 'UserProducts', component: UserProductsScreen },
    { name: 'EditProduct', component: EditProductScreen }
];
const AdminStackNavigator = () => (
    <CreateStackNavigator initialRouteName='UserProducts' screens={screens} />
);

AdminStackNavigator.navigationOptions = {
    title: 'Admin',
    drawerIcon: drawerConfig => (
        <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
        />
    )
};

export default AdminStackNavigator;
