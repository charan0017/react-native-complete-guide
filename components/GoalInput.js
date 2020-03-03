import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = ({ visible, setVisible, addGoalHandler }) => {
    const [courseGoal, setCourseGoal] = useState('');

    const courseGoalHandler = enteredText => {
        setCourseGoal(enteredText);
    };

    const onAddGoalHandler = () => {
        addGoalHandler(courseGoal);
        setCourseGoal('');
    };

    return (
        <Modal visible={visible} animationType='slide'>
            <View style={styles.column}>
                <TextInput placeholder='Course Goal' style={styles.input} value={courseGoal} onChangeText={courseGoalHandler} />
                <View style={styles.row}>
                    <View style={styles.button}>
                        <Button title='Cancel' color='red' onPress={setVisible} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Add' onPress={onAddGoalHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    column: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        width: '80%',
        marginBottom: 10
    },
    button: {
        width: '40%'
    }
});

export default GoalInput;
