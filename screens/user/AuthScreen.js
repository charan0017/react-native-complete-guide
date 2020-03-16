import React, {useState, useCallback, useReducer, useEffect} from 'react';
import { ScrollView, View, Button, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import { Input, Card } from '../../components/UI';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

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

const AuthScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        }
    });

    useEffect(() => {
        if (!error) return;
        Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }, [error]);

    const authHandler = async () => {
        setError(null);
        setIsLoading(true);
        let action;
        if (isSignUp) {
            action = authActions.signUp(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }
        try {
            await dispatch(action);
        } catch (e) {
            setError(e.message);
            setIsLoading(false);
        }
    };

    const switchSignUpHandler = () => {
        setIsSignUp(prevSignUp => !prevSignUp);
    };

    const inputChangeHandler = useCallback((input, value, isValid) => {
        dispatchFormState({ type: FORM_INPUT_UPDATE, payload: { input, value, isValid } });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Please enter a valid email address'
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.email}
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorText='Please enter a valid password'
                            onInputChange={inputChangeHandler}
                            initialValue={formState.inputValues.password}
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size='small' color={Colors.primary} />
                            ) : (
                                <Button
                                    title={isSignUp ? 'Sign Up' : 'Log In'}
                                    color={Colors.primary}
                                    onPress={authHandler}
                                />
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignUp ? 'Log In' : 'Sign Up'}`}
                                color={Colors.accent}
                                onPress={switchSignUpHandler}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
};

AuthScreen.navigationOptions = {
    title: 'Authenticate'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        margin: 10
    }
});

export default AuthScreen;
