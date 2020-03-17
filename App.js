import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { MainNavigator } from './navigation';
import placesReducer from './store/reducers/places';
import { init } from './helpers/db';

init()
    .then(console.log('Initialized database'))
    .catch((err) => {
        console.log('Initialized db failed!');
        console.log(err);
    });

const rootReducer = combineReducers({
    places: placesReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

enableScreens();

const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
    }

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        </SafeAreaProvider>
    );
};

export default App;
