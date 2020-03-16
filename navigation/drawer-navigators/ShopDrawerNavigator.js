import React from 'react';
import { Button } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { ProductsStackNavigator, OrdersStackNavigator, AdminStackNavigator } from '../stack-navigators';
import CreateDrawerNavigator from './CreateDrawerNavigator';
import Colors from '../../constants/Colors';

const screens = [
    { name: 'Products', component: ProductsStackNavigator },
    { name: 'Orders', component: OrdersStackNavigator },
    { name: 'Admin', component: AdminStackNavigator }
];
const drawerContent = (props, logoutHandler) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Button
                title='Logout'
                color={Colors.primary}
                onPress={logoutHandler}
            />
        </DrawerContentScrollView>
    );
};
const ShopDrawerNavigator = ({ logoutHandler }) => (
    <CreateDrawerNavigator screens={screens} drawerContent={(props) => drawerContent(props, logoutHandler)} />
);

export default ShopDrawerNavigator;
