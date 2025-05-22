import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const HomeScreen = () => {
  // Sample group data
  const groups = [
    { name: 'Group 1', messages: ['Hello!', 'How are you?'] },
    { name: 'Group 2', messages: ['Meeting at 5', 'See you there!'] },
  ];

  function alert(arg0: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      {groups.map((group, index) => (
        <TouchableOpacity
          key={index}
          style={styles.groupItem}
          onPress={() =>
            router.push({
              pathname: '/[groupName]',
              params: { groupName: group.name, messages: JSON.stringify(group.messages) },
            })
          }
        >
          <View style={styles.groupIcon}>
            <Text style={styles.groupIconText}>{group.name.charAt(0)}</Text>
          </View>
          <Text>{group.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // Add logic to create a new group if needed
          alert('Add new group');
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  groupIconText: { color: '#fff', fontSize: 18 },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 24 },
});

export default HomeScreen;