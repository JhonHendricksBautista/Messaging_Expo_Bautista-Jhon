import { View, Text, StyleSheet } from 'react-native';

export default function Status() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Connected</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#eee',
    marginTop: 40
  },
  text: {
    fontSize: 12,
  },
});