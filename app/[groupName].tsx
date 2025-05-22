import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useLocalSearchParams } from 'expo-router';

const MessagesScreen = () => {
  const { groupName, messages: messagesParam } = useLocalSearchParams();
  const initialMessages = messagesParam ? JSON.parse(messagesParam as string) : [];
  const [messages, setMessages] = useState<string[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editMessageText, setEditMessageText] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage.trim()]);
      setNewMessage('');
    }
  };

  const deleteMessage = (index: number) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  const openEditModal = (index: number, text: string) => {
    setEditIndex(index);
    setEditMessageText(text);
    setEditModalVisible(true);
  };

  const saveEditedMessage = () => {
    if (editIndex !== null && editMessageText.trim()) {
      const updatedMessages = [...messages];
      updatedMessages[editIndex] = editMessageText.trim();
      setMessages(updatedMessages);
    }
    setEditModalVisible(false);
    setEditIndex(null);
    setEditMessageText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{groupName as string}</Text>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => openEditModal(index, item)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteMessage(index)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={sendMessage} />

      {/* Edit Modal */}
      <Modal isVisible={editModalVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Message</Text>
          <TextInput
            style={styles.input}
            value={editMessageText}
            onChangeText={setEditMessageText}
            autoFocus
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={saveEditedMessage} style={styles.modalConfirmButton}>
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
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15, textAlign: 'center' },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 5,
  },
  messageText: { flex: 1, marginRight: 10 }, // Takes up remaining space
  buttonContainer: { flexDirection: 'row', alignItems: 'center' },
  editButton: { color: '#4CAF50', fontWeight: '600', marginLeft: 10 },
  deleteButton: { color: '#f44336', fontWeight: '600', marginLeft: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
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

export default MessagesScreen;