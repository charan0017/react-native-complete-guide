import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE: {
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex > -1) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updatedFavMeals };
            }
            const meal = state.meals.find(meal => meal.id === action.mealId);
            return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
        }
        case SET_FILTERS: {
            const { filters } = action;
            const filteredMeals = state.filteredMeals.filter((meal) => {
                if (filters.isGlutenFree && !meal.isGlutenFree) return false;
                if (filters.isLactoseFree && !meal.isLactoseFree) return false;
                if (filters.isVegan && !meal.isVegan) return false;
                if (filters.isVegetarian && !meal.isVegetarian) return false;
                return true;
            });
            return { ...state, filteredMeals };
        }
        default: return state;
    }
};

export default mealsReducer;
