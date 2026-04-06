import { View, StyleSheet } from 'react-native';

import Status from './components/Status';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import ImageGrid from './components/ImageGrid';
import NewStatus from './components/NewStatus';

export default function App() {
  return (
    <View style={styles.container}>
      
      <NewStatus/>

      <View style={styles.content}>
        <MessageList />
      </View>

      <View style={styles.toolbar}>
        <Toolbar />
      </View>

      <View style={styles.inputMethodEditor}>
        <ImageGrid />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  androidStatusBar: {
    barStyle: "dark-content",
    backgroundColor: "#FFFFFF"
  }

});