import React from 'react';
import {FlatList, StyleSheet, Platform, Button, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButton } from '../../components/UI';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (productId) => navigation.navigate('ProductDetail', { productId });

    return (
        <FlatList
            data={products}
            renderItem={({ item: product }) => (
                <ProductItem
                    image={product.imageUrl}
                    title={product.title}
                    price={product.price}
                    onSelect={() => selectItemHandler(product.id)}
                >
                    <Button color={Colors.primary} title='View Details' onPress={() => selectItemHandler(product.id)} />
                    <Button color={Colors.primary} title='To Cart' onPress={() => dispatch(cartActions.addToCart(product))} />
                </ProductItem>
            )}
        />
    )
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'All Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} title='menu-icons'>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} title='cart-icons'>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => navigation.navigate('Cart')}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
