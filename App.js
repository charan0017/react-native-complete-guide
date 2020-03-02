import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addGoalHandler = goalTitle => {
    if (!goalTitle || !goalTitle.length) {
      return;
    }
    setGoals(currentGoals => [...currentGoals, { id: Date.now().toString(), value: goalTitle }]);
    closeAddGoalModal();
  };

  const removeGoalHandler = goalId => {
    setGoals(currentGoals => currentGoals.filter(({ id }) => id !== goalId));
  };

  const closeAddGoalModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <Button title='Add Goal Item' onPress={() => setIsModalOpen(true)} />
      <GoalInput visible={isModalOpen} setVisible={closeAddGoalModal} addGoalHandler={addGoalHandler} />
      <FlatList
        data={goals}
        renderItem={({ item }) => <GoalItem id={item.id} title={item.value} onDelete={removeGoalHandler} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  }
});
