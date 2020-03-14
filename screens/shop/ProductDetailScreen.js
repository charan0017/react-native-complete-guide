import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = ({ navigation, route }) => {
    const products = useSelector(state => state.products.availableProducts);
    const productId = route.params?.productId ?? null;
    const selectedProduct = products.find(({ id }) => id === productId) || {};
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedProduct.title
        });
    }, [navigation, selectedProduct]);

    return (
        <ScrollView>
            <View>
                <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
                <View style={styles.actions}>
                    <Button color={Colors.primary} title='Add to Cart' onPress={() => dispatch(cartActions.addToCart(selectedProduct))} />
                </View>
                <Text style={styles.price}>₹ {selectedProduct.price.toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ProductDetailScreen;
