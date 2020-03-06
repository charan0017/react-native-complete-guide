import React, {useLayoutEffect} from 'react';
import {ScrollView, View, Image, Text, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {MEALS} from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = ({ children }) => (
    <View style={styles.listItem}>
        <DefaultText>{children}</DefaultText>
    </View>
);

const renderList = (listData) => listData.map(listItem => <ListItem key={listItem}>{listItem}</ListItem>);

const MealsDetailScreen = ({ navigation, route }) => {
    const mealId = route.params?.mealId ?? null;
    const selectedMeal = MEALS.find(({ id }) => id === mealId) || {};

    useLayoutEffect(() => {
        navigation.setOptions({ title: selectedMeal.title || 'Meals' });
    }, [navigation, selectedMeal]);

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
    title: 'Meal Details',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton} title='Favorite Btns'>
            <Item title='Favorite' iconName='ios-star' onPress={() => console.log('Favorite Pressed!')} />
        </HeaderButtons>
    )
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
