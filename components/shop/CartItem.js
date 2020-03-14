import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ quantity, title, sum, onRemove, deletable = false }) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{quantity} </Text>
                <Text style={styles.mainText}>{title}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>₹ {sum.toFixed(2)}</Text>
                <View style={styles.deleteButton}>
                    {deletable && (
                        <TouchableCmp onPress={onRemove}>
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                                size={23}
                                color='red'
                            />
                        </TouchableCmp>
                    )}
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        fontSize: 18,
        color: '#888'
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;
