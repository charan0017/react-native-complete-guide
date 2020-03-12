import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import {CATEGORIES} from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = ({ navigation, route }) => {
    const categoryId = route.params?.categoryId ?? null;
    const selectedCategory = CATEGORIES.find(({ id }) => id === categoryId) || {};
    const availableMeals = useSelector(state => state.meals.filteredMeals);
    const displayMeals = availableMeals.filter(({ categoryIds }) => categoryIds.includes(categoryId));

    useLayoutEffect(() => {
        navigation.setOptions({ title: selectedCategory.title || 'Meals' });
    }, [navigation, selectedCategory]);

    if (!displayMeals.length) {
        return (
            <View style={styles.content}>
                <DefaultText>No meals found, maybe check your filters?</DefaultText>
            </View>
        );
    }

    return <MealList listData={displayMeals} navigation={navigation} />;
};

CategoryMealsScreen.navigationOptions = {
    title: 'Meals'
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;
