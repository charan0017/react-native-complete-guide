import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../contants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = ({ guessRounds, userNumber, onRestart }) => {
    return (
        <ScrollView>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * .7,
        height: Dimensions.get('window').width * .7,
        borderRadius: Dimensions.get('window').width * .7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden', // To wrap the child elements
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;
