import React from 'react'; 
import { 
  StyleSheet, 
  View, 
  Alert, 
  BackHandler, 
  Image, 
  TouchableHighlight,
  SafeAreaView 
} from 'react-native';

import Status from './components/Status';
import Toolbar from './components/Toolbar';
import ImageGrid from './components/ImageGrid';

import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';

// Changed from "export default function App()" to a Class Component
export default class App extends React.Component {
  
  // 1. State is now an object instead of using useState()
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('This is so hard'),
      createTextMessage('Hello world!'),
      createLocationMessage({
        latitude: 14.5764, 
        longitude: 121.0851,
      }),
    ],
    fullscreenImageId: null,
  };

  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const { fullscreenImageId } = this.state;
        if (fullscreenImageId) {
          this.setState({ fullscreenImageId: null });
          return true; 
        }
        return false; 
      }
    );
  }
  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.remove();
    }
  }


  handlePressMessage = (item) => {
    const { messages } = this.state;

    if (item.type === 'text') {
      Alert.alert(
        'Delete message?',
        'Are you sure you want to permanently delete this message?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              const updatedMessages = messages.filter(
                (message) => message.id !== item.id
              );
              this.setState({ messages: updatedMessages });
            },
          },
        ]
      );
    } else if (item.type === 'image') {
      this.setState({ fullscreenImageId: item.id });
    }
  };

  render() {
    const { messages, fullscreenImageId } = this.state;

    const fullscreenMessage = messages.find(
      (message) => message.id === fullscreenImageId
    );

    return (
      <SafeAreaView style={styles.container}>
        
        <Status />

        <View style={styles.content}>
          <MessageList 
            messages={messages} 
            onPressMessage={this.handlePressMessage} 
          />
        </View>

        <View style={styles.toolbar}>
          <Toolbar />
        </View>

        <View style={styles.inputMethodEditor}>
          <ImageGrid />
        </View>

        {fullscreenMessage && (
          <TouchableHighlight
            style={styles.fullscreenOverlay}
            onPress={() => this.setState({ fullscreenImageId: null })}
            underlayColor="transparent"
          >
            <Image
              style={styles.fullscreenImage}
              source={{ uri: fullscreenMessage.uri }}
              resizeMode="contain"
            />
          </TouchableHighlight>
        )}

      </SafeAreaView>
    );
  }
}

// The styles remain exactly the same!
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
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});