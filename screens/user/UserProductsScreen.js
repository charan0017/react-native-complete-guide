import React from 'react';
import { Alert, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { ProductItem } from '../../components/shop';
import { HeaderButton } from '../../components/UI';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = ({ navigation }) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (productId) => navigation.navigate('EditProduct', { productId });

    const deleteHandler = (productId) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'Yes', style: 'destructive', onPress: () => dispatch(productsActions.deleteProduct(productId)) },
            { text: 'No', style: 'default' },
        ])
    };

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

const styles = StyleSheet.create({});

export default UserProductsScreen;
