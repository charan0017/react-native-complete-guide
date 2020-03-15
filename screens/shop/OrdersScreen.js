import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Platform, View, ActivityIndicator, StyleSheet, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { HeaderButton } from '../../components/UI';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    const loadOrders = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(ordersActions.fetchOrders());
        } catch (e) {
            setError(e.message);
        }
        setIsRefreshing(false);
    }, [setError, setIsLoading, dispatch]);

    useEffect(() => {
        const willFocusSub = navigation.addListener('willFocus', loadOrders);
        return () => {
            willFocusSub.remove();
        };
    }, [loadOrders]);

    useEffect(() => {
        setIsLoading(true);
        loadOrders().then(() => setIsLoading(false));
    }, [loadOrders]);

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
                <Button title='Try Again!' onPress={loadOrders} color={Colors.primary} />
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

    return (
        <FlatList
            onRefresh={loadOrders}
            refreshing={isRefreshing}
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

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrdersScreen;
