import React from 'react';

import { AuthScreen } from '../../screens/user';
import CreateStackNavigator from './CreateStackNavigator';

const screens = [
    { name: 'Auth', component: AuthScreen },
];
const AuthStackNavigator = () => (
    <CreateStackNavigator initialRouteName='Auth' screens={screens} />
);

AuthStackNavigator.navigationOptions = {
    title: 'Auth'
};

export default AuthStackNavigator;
