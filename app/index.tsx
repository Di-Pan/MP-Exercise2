import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import Modal from 'react-native-modal';

const HomeScreen = () => {
  const [groups, setGroups] = useState([
    { name: 'You👤', messages: ['Hello!', 'How are you?'] },
    { name: 'Home🏠', messages: ['Meeting at 5', 'See you there!'] },
    { name: 'Family👨‍👩‍👧‍👦', messages: [] },
    { name: 'Love❤️', messages: ['Hello!', 'How are you?'] },
    { name: 'Friends👫', messages: ['Meeting at 5', 'See you there!'] },
    { name: 'School🏫', messages: [] },
  ]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [editGroupName, setEditGroupName] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addGroup = () => {
    if (newGroupName.trim()) {
      setGroups([...groups, { name: newGroupName.trim(), messages: [] }]);
      setNewGroupName('');
      setAddModalVisible(false);
    }
  };

  const openEditModal = (index: number, name: string) => {
    setEditIndex(index);
    setEditGroupName(name);
    setEditModalVisible(true);
  };

  const saveEditedGroupName = () => {
    if (editIndex !== null && editGroupName.trim()) {
      const updatedGroups = [...groups];
      updatedGroups[editIndex] = { ...updatedGroups[editIndex], name: editGroupName.trim() };
      setGroups(updatedGroups);
      setEditModalVisible(false);
      setEditIndex(null);
      setEditGroupName('');
    }
  };

  const deleteGroup = (index: number) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this group?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedGroups = groups.filter((_, i) => i !== index);
          setGroups(updatedGroups);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {groups.map((group, index) => (
        <View key={index} style={styles.groupItemContainer}>
          <TouchableOpacity
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
            <Text style={styles.groupNameText}>{group.name}</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => openEditModal(index, group.name)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteGroup(index)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Add Group Modal */}
      <Modal isVisible={isAddModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Group</Text>
          <TextInput
            style={styles.input}
            value={newGroupName}
            onChangeText={setNewGroupName}
            placeholder="Enter group name"
            autoFocus
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={addGroup} style={styles.modalConfirmButton}>
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAddModalVisible(false)}
              style={styles.modalCancelButton}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Group Modal */}
      <Modal isVisible={isEditModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Group Name</Text>
          <TextInput
            style={styles.input}
            value={editGroupName}
            onChangeText={setEditGroupName}
            placeholder="Enter new group name"
            autoFocus
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={saveEditedGroupName} style={styles.modalConfirmButton}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              style={styles.modalCancelButton}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  groupItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupIconText: { color: '#fff', fontSize: 18 }, // Added missing style definition
  groupNameText: { fontSize: 16, color: '#333' },
  buttonContainer: { flexDirection: 'row', alignItems: 'center' },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    width: 250,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalConfirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalCancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});

export default HomeScreen;