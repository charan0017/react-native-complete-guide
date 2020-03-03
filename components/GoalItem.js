import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = ({ id, title, onDelete }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onDelete.bind(this, id)}>
            <View style={styles.listItem}>
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#ccc'
    }
});

export default GoalItem;
