import React, { useState, useEffect } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { ProductItem } from '../../components/shop';
import { HeaderButton } from '../../components/UI';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = ({ navigation }) => {
    const [error, setError] = useState(null);
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (productId) => navigation.navigate('EditProduct', { productId });

    const deleteProductHandler = async (productId) => {
        setError(null);
        try {
            await dispatch(productsActions.deleteProduct(productId));
        } catch (e) {
            setError(e.message);
        }
    };

    const deleteHandler = (productId) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'Yes', style: 'destructive', onPress: () => deleteProductHandler(productId)},
            { text: 'No', style: 'default' },
        ])
    };

    useEffect(() => {
        if (!error) return;
        Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }, [error]);

    if (!userProducts.length) {
        return (
            <View style={styles.center}>
                <Text style={styles.text}>No products found maybe start creating some!</Text>
                <Button title='Add Product' onPress={() => navigation.navigate('EditProduct')} color={Colors.primary} />
            </View>
        );
    }

    return (
        <FlatList
            data={userProducts}
            renderItem={({ item: userProduct }) => (
                <ProductItem
                    image={userProduct.imageUrl}
                    title={userProduct.title}
                    price={userProduct.price}
                    onSelect={() => editProductHandler(userProduct.id)}
                >
                    <Button color={Colors.primary} title='Edit' onPress={() => editProductHandler(userProduct.id)} />
                    <Button color={Colors.primary} title='Delete' onPress={() => deleteHandler(userProduct.id)} />
                </ProductItem>
            )}
        />
    )
};

UserProductsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Your Products',
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
            <HeaderButtons HeaderButtonComponent={HeaderButton} title='add-icons'>
                <Item
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => navigation.navigate('EditProduct')}
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

export default UserProductsScreen;
