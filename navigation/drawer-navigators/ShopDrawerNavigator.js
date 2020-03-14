import React from 'react';

import { ProductsStackNavigator, OrdersStackNavigator, AdminStackNavigator } from '../stack-navigators';
import CreateDrawerNavigator from './CreateDrawerNavigator';

const screens = [
    { name: 'Products', component: ProductsStackNavigator },
    { name: 'Orders', component: OrdersStackNavigator },
    { name: 'Admin', component: AdminStackNavigator }
];
const ShopDrawerNavigator = () => (
    <CreateDrawerNavigator screens={screens} />
);

export default ShopDrawerNavigator;
