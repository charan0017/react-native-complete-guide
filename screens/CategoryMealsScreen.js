import React, { useLayoutEffect } from 'react';

import {CATEGORIES, MEALS} from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealsScreen = ({ navigation, route }) => {
    const categoryId = route.params?.categoryId ?? null;
    const selectedCategory = CATEGORIES.find(({ id }) => id === categoryId) || {};
    const displayMeals = MEALS.filter(({ categoryIds }) => categoryIds.includes(categoryId));

    useLayoutEffect(() => {
        navigation.setOptions({ title: selectedCategory.title || 'Meals' });
    }, [navigation, selectedCategory]);

    return <MealList listData={displayMeals} navigation={navigation} />;
};

CategoryMealsScreen.navigationOptions = {
    title: 'Meals'
};

export default CategoryMealsScreen;
