import React, {useLayoutEffect} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {MEALS} from '../data/dummy-data';
import MealList from '../components/MealList';
import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = ({ navigation }) => {
    const displayMeals = MEALS.filter(({ id }) => id === 'm1' || id === 'm2');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} title='Drawer Btns'>
                    <Item title='SideDrawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            )
        });
    }, [navigation]);

    return <MealList listData={displayMeals} navigation={navigation} />
};

FavoritesScreen.navigationOptions = {
    title: 'Your Favorites'
};

export default FavoritesScreen;
