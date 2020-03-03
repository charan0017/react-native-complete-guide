import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../contants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = ({ guessRounds, userNumber, onRestart }) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={1000}
                    // source={require('../assets/success.png')}
                    source={{ uri: 'http://bit.ly/2Tglo72' }}
                    style={styles.image}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{guessRounds}</Text> rounds to guess the number{' '}
                    <Text style={styles.highlight}>{userNumber}</Text>.
                </BodyText>
            </View>
            <MainButton onPress={onRestart}>New Game</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden', // To wrap the child elements
        marginVertical: 20
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 20,
        marginBottom: 15
    },
    resultText: {
        textAlign: 'center'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;
