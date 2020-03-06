import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Dimensions, Platform} from 'react-native';

const CategoryGridTile = ({ title, color, onPress }) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }} onPress={onPress}>
                <View style={{ ...styles.container, backgroundColor: color }}>
                    <Text style={styles.title} numberOfLines={2}>{title}</Text>
                </View>
            </TouchableCmp>
        </View>
    )
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: Dimensions.get('window').width * .03,
        height: 150,
        borderRadius: 10,
        overflow: (Platform.OS === ' android' && Platform.Version > 21) ? 'hidden' : 'visible',
        elevation: 5
    },
    container: {
        flex: 1,
        padding: Dimensions.get('window').width * .03,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: Dimensions.get('window').height * .033,
        textAlign: 'right'
    }
});

export default CategoryGridTile;
