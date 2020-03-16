import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { AuthStackNavigator } from './stack-navigators';
import { ShopDrawerNavigator } from './drawer-navigators';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';

function MainNavigator() {
    const { token, userId } = useSelector(state => state.auth);
    const [tryingAutoLogin, setTryingAutoLogin] = useState(true);

    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
    };

    const hideAutoLoginHandler = () => setTryingAutoLogin(false);

    return (
        <NavigationContainer>
            {(token && userId)
                ? <ShopDrawerNavigator logoutHandler={logoutHandler} />
                : (tryingAutoLogin
                    ? <StartupScreen hideAutoLoginHandler={hideAutoLoginHandler} />
                    : <AuthStackNavigator />
                )}
        </NavigationContainer>
    );
}

export default MainNavigator;
