import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

const App = () => {
    const [userNumber, setUserNumber] = useState(0);
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={err => console.log(err)} />
        );
    }

    const configureNewGameHandler = () => {
        setUserNumber(0);
        setGuessRounds(0);
    };

    const startGameHandler = selectedNumber => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    };

    const gameOverHandler = numberOfRounds => {
        setGuessRounds(numberOfRounds);
    };

    let content = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
    } else if (guessRounds > 0) {
        content = <GameOverScreen guessRounds={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />;
    }

    return (
        <View style={styles.screen}>
            <Header title={'Guess a Number'} />
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default App;
