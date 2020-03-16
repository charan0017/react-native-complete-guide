import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = ({ hideAutoLoginHandler }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                hideAutoLoginHandler();
                return;
            }
            const { token, userId, expiryDate } = JSON.parse(userData);
            const expirationTimestamp = Date.parse(expiryDate);
            if (expirationTimestamp < Date.now() || !token || !userId) {
                hideAutoLoginHandler();
                return;
            }
            const expirationTime = expirationTimestamp - Date.now();
            dispatch(authActions.authenticate(token, userId, expirationTime));
            hideAutoLoginHandler();
        };
        tryLogin();
    }, [dispatch, hideAutoLoginHandler]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
};

StartupScreen.navigationOptions = {
    title: 'The Shop App'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
