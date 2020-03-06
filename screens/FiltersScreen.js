import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Switch, Platform } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';

const FilterSwitch = ({ label, state, onChange }) => (
    <View style={styles.filterContainer}>
        <Text>{label}</Text>
        <Switch
            trackColor={{ true: Colors.primaryColor }}
            thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
            value={state}
            onValueChange={onChange}
        />
    </View>
);

const FiltersScreen = ({ navigation }) => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} title='Drawer Btns'>
                    <Item title='SideDrawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} title='Save Btns'>
                    <Item title='Save' iconName='ios-save' onPress={() => navigation.goBack()} />
                </HeaderButtons>
            )
        });
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label='Gluten-free' state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label='Lactose-free' state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch label='Vegan' state={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch label='Vegetarian' state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    )
};

FiltersScreen.navigationOptions = {
    title: 'Filter Meals'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: Dimensions.get('window').height * .031,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
});

export default FiltersScreen;
