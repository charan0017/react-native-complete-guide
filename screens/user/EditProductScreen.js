import React, { useReducer, useLayoutEffect, useCallback } from 'react';
import { ScrollView, View, StyleSheet, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { HeaderButton, Input } from '../../components/UI';
import * as productsActions from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const { input, value, isValid } = action.payload;
        return {
            ...state,
            inputValues: { ...state.inputValues, [input]: value },
            inputValidities: { ...state.inputValidities, [input]: isValid }
        };
    }
    return state;
};

const formIsValid = (state) => Object.keys(state.inputValidities).every(key => !!state.inputValidities[key]);

const EditProductScreen = ({ navigation, route }) => {
    const products = useSelector(state => state.products.userProducts);
    const productId = route.params?.productId ?? null;
    const selectedProduct = products.find(({ id }) => id === productId) || {};
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: selectedProduct.title || '',
            imageUrl: selectedProduct.imageUrl || '',
            price: '',
            description: selectedProduct.description || ''
        },
        inputValidities: {
            title: !!selectedProduct.id,
            imageUrl: !!selectedProduct.id,
            price: !!selectedProduct.id,
            description: !!selectedProduct.id
        }
    });

    const submitHandler = () => {
        if (!formIsValid(formState)) {
            Alert.alert('Wrong input', 'Please check the errors in the form', [
                { text: 'Okay!' }
            ]);
            return;
        }
        const { title, imageUrl, description, price } = formState.inputValues;
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
                <HeaderButtons HeaderButtonComponent={HeaderButton} title='checkmark-icons'>
                    <Item
                        title='Checkmark'
                        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                        onPress={submitHandler}
                    />
                </HeaderButtons>
            )
        });
    }, [navigation, productId, submitHandler]);

    const inputChangeHandler = useCallback((input, value, isValid) => {
        dispatchFormState({ type: FORM_INPUT_UPDATE, payload: { input, value, isValid } });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        initialValue={formState.inputValues.title}
                        initiallyValid={formState.inputValidities.title}
                        onInputChange={inputChangeHandler}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image URL'
                        errorText='Please enter a valid image url!'
                        keyboardType='default'
                        returnKeyType='next'
                        initialValue={formState.inputValues.imageUrl}
                        initiallyValid={formState.inputValidities.imageUrl}
                        onInputChange={inputChangeHandler}
                        required
                    />
                    {selectedProduct.id ? null : (
                        <Input
                            id='price'
                            label='Price'
                            errorText='Please enter a valid price!'
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                            initialValue={formState.inputValues.price}
                            initiallyValid={formState.inputValidities.price}
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid description!'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        initialValue={formState.inputValues.description}
                        initiallyValid={formState.inputValidities.description}
                        onInputChange={inputChangeHandler}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

EditProductScreen.navigationOptions = {
    title: 'Add Product'
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
});

export default EditProductScreen;
