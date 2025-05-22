import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './app';

type Props = NativeStackScreenProps<RootStackParamList, 'Messages'>;

const MessagesScreen = ({ route }: Props) => {
  const { groupName, messages: initialMessages } = route.params;
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
      <Text style={styles.title}>{groupName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.messageContainer}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => openEditModal(index, item)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteMessage(index)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
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
      <Modal isVisible={editModalVisible}>
        <View style={styles.modalContainer}>
          <Text>Edit Message</Text>
          <TextInput
            style={styles.input}
            value={editMessageText}
            onChangeText={setEditMessageText}
          />
          <Button title="Save" onPress={saveEditedMessage} />
          <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  messageContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5, justifyContent: 'space-between' },
  editButton: { color: 'blue', marginLeft: 10 },
  deleteButton: { color: 'red', marginLeft: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  modalContainer: { backgroundColor: 'white', padding: 20, borderRadius: 10 },
});

export default MessagesScreen;
