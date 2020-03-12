import React, {useState, useLayoutEffect, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {toggleFavorite} from '../store/actions/meals';

const ListItem = ({ children }) => (
    <View style={styles.listItem}>
        <DefaultText>{children}</DefaultText>
    </View>
);

const renderList = (listData) => listData.map(listItem => <ListItem key={listItem}>{listItem}</ListItem>);

const MealsDetailScreen = ({ navigation, route }) => {
    const availableMeals = useSelector(state => state.meals.filteredMeals);
    const mealId = route.params?.mealId ?? null;
    const selectedMeal = availableMeals.find(({ id }) => id === mealId) || {};
    const [mealIsFavorite, setMealIsFavorite] = useState(route.params?.mealIsFavorite ?? false);

    const dispatch = useDispatch();
    const toggleFavoriteHandler = () => {
        dispatch(toggleFavorite(selectedMeal.id));
        setMealIsFavorite(currMealIsFav => !currMealIsFav);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedMeal.title || 'Meals'
        });
    }, [navigation, selectedMeal]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} title='Favorite Btns'>
                    <Item title='Favorite'
                          iconName={mealIsFavorite ? 'ios-star' : 'ios-star-outline'}
                          onPress={toggleFavoriteHandler}
                    />
                </HeaderButtons>
            )
        });
    }, [navigation, mealIsFavorite, toggleFavoriteHandler]);

    return (
        <ScrollView layoutStyle={styles.screen}>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {renderList(selectedMeal.ingredients)}
            <Text style={styles.title}>Steps</Text>
            {renderList(selectedMeal.steps)}
        </ScrollView>
    )
};

MealsDetailScreen.navigationOptions = {
    title: 'Meal Details'
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealsDetailScreen;
