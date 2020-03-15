import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import { CartItem } from '../../components/shop';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import { Card } from '../../components/UI';

const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false);

    const cartTotalPrice = useSelector(state => state.cart.totalPrice);
    const cartItems = useSelector((state) => (
        Object.keys(state.cart.items).map((productId) => {
            const { productTitle, productPrice, quantity, sum } = state.cart.items[productId];
            return { productId, productTitle, productPrice, quantity, sum };
        })
    ));
    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalPrice));
        setIsLoading(false);
    };

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>₹ {Math.round(cartTotalPrice.toFixed(2) * 100 / 100)}</Text>
                </Text>
                {isLoading ? (
                        <ActivityIndicator size='small' color={Colors.primary} />
                    ) : (
                        <Button
                            title='Order Now'
                            color={Colors.accent}
                            disabled={!cartItems.length}
                            onPress={sendOrderHandler}
                        />
                    )}
            </Card>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={(cartItem) => cartItem.productId}
                    renderItem={({ item: cartItem }) => (
                        <CartItem
                            title={cartItem.productTitle}
                            quantity={cartItem.quantity}
                            sum={cartItem.sum}
                            deletable
                            onRemove={() => dispatch(cartActions.removeFromCart(cartItem.productId))}
                        />
                    )}
                />
            </View>
        </View>
    )
};

CartScreen.navigationOptions = {
    title: 'Your Cart'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;
