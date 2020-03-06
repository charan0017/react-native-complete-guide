import React from 'react';
import { Text, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealsDetailScreen from '../screens/MealsDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

const screenOptions = {
    gestureEnabled: false,
    mode: 'Modal',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

const CreateMealsStackNavigator = () => (
    <StackNavigator initialRouteName='Categories' screenOptions={screenOptions}>
        <StackScreen name='Categories' component={CategoriesScreen} options={CategoriesScreen.navigationOptions}  />
        <StackScreen name='CategoryMeals' component={CategoryMealsScreen} options={CategoryMealsScreen.navigationOptions} />
        <StackScreen name='MealDetail' component={MealsDetailScreen} options={MealsDetailScreen.navigationOptions} />
    </StackNavigator>
);
CreateMealsStackNavigator.navigationOptions = {
    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text> : 'Meals',
    tabBarIcon: (tabInfo) => <Ionicons name='ios-restaurant' size={25} color={tabInfo.color} />,
    tabBarColor: Colors.primaryColor,
};

const CreateFavoritesStackNavigator = () => (
    <StackNavigator initialRouteName='Favorites' screenOptions={screenOptions}>
        <StackScreen name='Favorites' component={FavoritesScreen} options={FavoritesScreen.navigationOptions} />
        <StackScreen name='MealDetail' component={MealsDetailScreen} options={MealsDetailScreen.navigationOptions} />
    </StackNavigator>
);
CreateFavoritesStackNavigator.navigationOptions = {
    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text> : 'Favorites',
    tabBarIcon: (tabInfo) => <Ionicons name='ios-star' size={25} color={tabInfo.color} />,
    tabBarColor: Colors.accentColor,
};

const CreateFiltersStackNavigator = () => (
    <StackNavigator initialRouteName='Filters' screenOptions={screenOptions}>
        <StackScreen name='Filters' component={FiltersScreen} options={FiltersScreen.navigationOptions} />
    </StackNavigator>
);
CreateFiltersStackNavigator.navigationOptions = {
    title: 'Filters'
};

const tabBarOptions = {
    activeTintColor: Colors.accentColor,
    shifting: true,
    barStyle: { // Put this if shifting is false
        backgroundColor: Colors.primaryColor
    },
    labelStyle: {
        fontFamily: 'open-sans-bold'
    }
};
const { Navigator: TabNavigator, Screen: TabScreen } = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const CreateMealsFavsTabNavigator = () => (
    <TabNavigator tabBarOptions={tabBarOptions} {...tabBarOptions}>
        <TabScreen name='Meals' component={CreateMealsStackNavigator} options={CreateMealsStackNavigator.navigationOptions} />
        <TabScreen name='Favorites' component={CreateFavoritesStackNavigator} options={CreateFavoritesStackNavigator.navigationOptions} />
    </TabNavigator>
);
CreateMealsFavsTabNavigator.navigationOptions = {
    title: 'Meals'
};

const drawerContentOptions = {
    activeTintColor: Colors.accentColor,
    labelStyle: {
        fontFamily: 'open-sans-bold'
    }
};
const { Navigator: DrawerNavigator, Screen: DrawerScreen } = createDrawerNavigator();
const CreateMealsDrawerNavigator = () => (
    <DrawerNavigator drawerContentOptions={drawerContentOptions}>
        <DrawerScreen name='MealsFavs' component={CreateMealsFavsTabNavigator} options={CreateMealsFavsTabNavigator.navigationOptions} />
        <DrawerScreen name='Filters' component={CreateFiltersStackNavigator} options={CreateFiltersStackNavigator.navigationOptions} />
    </DrawerNavigator>
);

function MealsNavigator() {
    return (
        <NavigationContainer>
            {CreateMealsDrawerNavigator()}
        </NavigationContainer>
    );
}


export default MealsNavigator;
