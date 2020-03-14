import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ style, children }) => (
    <View style={{ ...styles.card, ...style }}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});

export default Card;