import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style }) => <View style={{ ...styles.card, ...style }}>{children}</View>;

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, // Used for Android to show shadow, since by default the shadow is only visible in iPhone
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
});

export default Card;
