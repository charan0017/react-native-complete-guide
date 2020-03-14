import React from 'react';
import { Text, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { HeaderButton } from '../../components/UI';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList
            data={orders}
            renderItem={({ item: orderItem }) => (
                <OrderItem
                    items={orderItem.items}
                    price={orderItem.totalPrice}
                    date={orderItem.date}
                />
            )}
        />
    )
};

OrdersScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} title='menu-icons'>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    };
};

export default OrdersScreen;
