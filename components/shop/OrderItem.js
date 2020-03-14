import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import CartItem from './CartItem';
import { Card } from '../UI';

const OrderItem = ({ items, price, date }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalPrice}>₹ {price.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button
                color={Colors.primary}
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => setShowDetails(prevShowDetails => !prevShowDetails)}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {items.map(cartItem => (
                        <CartItem
                            key={cartItem.productId}
                            title={cartItem.productTitle}
                            quantity={cartItem.quantity}
                            sum={cartItem.sum}
                        />
                    ))}
                </View>
            )}
        </Card>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalPrice: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});

export default OrderItem;
