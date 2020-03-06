import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import MealItem from './MealItem';

const renderMeaItem = (mealItem, navigation) => (
    <MealItem
        title={mealItem.title}
        image={mealItem.imageUrl}
        duration={mealItem.duration}
        complexity={mealItem.complexity}
        affordability={mealItem.affordability}
        onSelectMeal={() => navigation.navigate('MealDetail', { mealId: mealItem.id })}
    />
);

const MealList = ({ listData, navigation }) => (
    <View style={styles.list}>
        <FlatList
            data={listData}
            renderItem={({ item }) => renderMeaItem(item, navigation)}
            style={{ width: '90%' }}
        />
    </View>
);

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList;
