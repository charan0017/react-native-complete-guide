import React, { useLayoutEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {CATEGORIES} from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButton from '../components/HeaderButton';

const renderCategoryItem = (categoryItem, navigation) => (
    <CategoryGridTile
        title={categoryItem.title}
        color={categoryItem.color}
        onPress={() => navigation.navigate('CategoryMeals', { categoryId: categoryItem.id })}
    />
);

const CategoriesScreen = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} title='Drawer Btns'>
                    <Item title='SideDrawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            )
        });
    }, [navigation]);

    return (
        <FlatList
            numColumns={2}
            data={CATEGORIES}
            renderItem={({ item }) => renderCategoryItem(item, navigation)}
        />
    )
};

CategoriesScreen.navigationOptions = {
    title: 'Meal Categories'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoriesScreen;
