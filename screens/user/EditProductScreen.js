import React, { useState, useLayoutEffect } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { HeaderButton } from '../../components/UI';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = ({ navigation, route }) => {
    const products = useSelector(state => state.products.userProducts);
    const productId = route.params?.productId ?? null;
    const selectedProduct = products.find(({ id }) => id === productId) || {};
    const dispatch = useDispatch();

    const [title, setTitle] = useState(selectedProduct.title || '');
    const [imageUrl, setImageUrl] = useState(selectedProduct.imageUrl || '');
    const [price, setPrice] = useState(selectedProduct.price ? selectedProduct.price.toString() : '');
    const [description, setDescription] = useState(selectedProduct.description || '');

    const submitHandler = () => {
        if (selectedProduct.id) {
            dispatch(productsActions.updateProduct(productId, title, imageUrl, description));
        } else {
            dispatch(productsActions.createProduct(title, imageUrl, description, +price));
        }
        navigation.goBack();
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: productId ? 'Edit Product' : 'Add Product',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} title='save-icons'>
                    <Item
                        title='Save'
                        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                        onPress={submitHandler}
                    />
                </HeaderButtons>
            )
        });
    }, [navigation, productId, submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                {selectedProduct.id ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.input} value={price}
                                   onChangeText={text => setPrice(text)}
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
};

EditProductScreen.navigationOptions = {
    title: 'Add Product'
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;
