import { View, TextInput, StyleSheet } from 'react-native';

export default function Toolbar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type something!"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  input: {
    height: 40,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});