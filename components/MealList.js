import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';

import MealItem from './MealItem';

const renderMeaItem = (mealItem, navigation, favoriteMeals) => {
    const { id: mealId } = mealItem;
    const mealIsFavorite = favoriteMeals.some(meal => meal.id === mealId);
    return (
        <MealItem
            title={mealItem.title}
            image={mealItem.imageUrl}
            duration={mealItem.duration}
            complexity={mealItem.complexity}
            affordability={mealItem.affordability}
            onSelectMeal={() => navigation.navigate('MealDetail', { mealId, mealIsFavorite })}
        />
    );
};

const MealList = ({ listData, navigation }) => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    return (
        <View style={styles.list}>
            <FlatList
                data={listData}
                renderItem={({ item }) => renderMeaItem(item, navigation, favoriteMeals)}
                style={{ width: '90%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList;
