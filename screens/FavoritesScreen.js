import React, {useLayoutEffect} from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import MealList from '../components/MealList';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = ({ navigation }) => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} title='Drawer Btns'>
                    <Item title='SideDrawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            )
        });
    }, [navigation]);

    if (Array.isArray(favoriteMeals) && !favoriteMeals.length) {
        return (
            <View style={styles.content}>
                <DefaultText>No Favorite meals found. Start adding some!</DefaultText>
            </View>
        );
    }

    return <MealList listData={favoriteMeals} navigation={navigation} />
};

FavoritesScreen.navigationOptions = {
    title: 'Your Favorites'
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;
