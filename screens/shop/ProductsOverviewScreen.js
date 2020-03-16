import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import { HeaderButton } from '../../components/UI';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (productId) => navigation.navigate('ProductDetail', { productId });

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (e) {
            setError(e.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        return navigation.addListener('focus', loadProducts);
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => setIsLoading(false));
    }, [loadProducts]);

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.text}>{error}</Text>
                <Button title='Try Again!' onPress={loadProducts} color={Colors.primary} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && !products.length) {
        return (
            <View style={styles.center}>
                <Text style={styles.text}>No products found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
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

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center'
    }
});

export default ProductsOverviewScreen;
