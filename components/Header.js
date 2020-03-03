import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import TitleText from '../components/TitleText';
import Colors from '../contants/colors';

const Header = ({ title }) => {
    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid
            })
        }}>
            <TitleText style={styles.title}>{title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerAndroid: {
        backgroundColor: Colors.primary
    },
    headerIOS: {
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    title: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
    }
});

export default Header;
