import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ProductsOverviewScreen, ProductDetailScreen, CartScreen } from '../../screens/shop';
import CreateStackNavigator from './CreateStackNavigator';

const screens = [
    { name: 'ProductsOverview', component: ProductsOverviewScreen },
    { name: 'ProductDetail', component: ProductDetailScreen },
    { name: 'Cart', component: CartScreen }
];
const ProductsStackNavigator = () => (
    <CreateStackNavigator initialRouteName='ProductsOverview' screens={screens} />
);

ProductsStackNavigator.navigationOptions = {
    title: 'Products',
    drawerIcon: drawerConfig => (
        <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
        />
    )
};

export default ProductsStackNavigator;
