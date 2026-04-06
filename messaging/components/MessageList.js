import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MessageList() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Example */}
      <View style={styles.messageBubble}>
        <Text style={styles.text}>Hello</Text>
      </View>

      <View style={styles.messageBubble}>
        <Text style={styles.text}>My name is Jhon Hendricks Bautista</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBubble: {
    alignSelf: 'flex-end', 
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  text: {
    color: 'white',
  },
});