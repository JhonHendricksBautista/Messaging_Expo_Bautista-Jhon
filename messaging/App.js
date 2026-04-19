import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  BackHandler,
  Image,
  TouchableHighlight,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Status from "./components/Status";
import ImageGrid from "./components/ImageGrid";
import Toolbar from "./components/Toolbar";
import MessageList from "./components/MessageList";
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from "./utils/MessageUtils";

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage("https://unsplash.it/300/300"),
      createTextMessage("This is so hard"),
      createTextMessage("HAHAHAHAHAHA"),
      createLocationMessage({
        latitude: 14.5764,
        longitude: 121.0851,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
  };

  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (this.state.fullscreenImageId) {
          this.setState({ fullscreenImageId: null });
          return true;
        }
        return false;
      }
    );
  }

  componentWillUnmount() {
    this.subscription?.remove();
  }

  handlePressMessage = (item) => {
    const { messages } = this.state;

    if (item.type === "text") {
      Alert.alert(
        "Delete message?",
        "Are you sure you want to delete this message?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              this.setState({
                messages: messages.filter((m) => m.id !== item.id),
              });
            },
          },
        ]
      );
    } else if (item.type === "image") {
      this.setState({ fullscreenImageId: item.id });
    }
  };

  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  };

  handleSubmit = (text) => {
    const newMessage = createTextMessage(text);

    this.setState((prev) => ({
      messages: [newMessage, ...prev.messages],
    }));
  };

  handlePressToolbarCamera = () => {
    Alert.alert("Camera pressed 📷");
  };

  handlePressToolbarLocation = () => {
    const locationMessage = createLocationMessage({
      latitude: 14.5764,
      longitude: 121.0851,
    });

    this.setState((prev) => ({
      messages: [locationMessage, ...prev.messages],
    }));
  };

  renderToolbar() {
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={this.state.isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    );
  }

  render() {
    const { messages, fullscreenImageId, isInputFocused } = this.state;

    const fullscreenMessage = messages.find(
      (m) => m.id === fullscreenImageId
    );

    return (
      <SafeAreaView style={styles.container}>
        <Status />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* MESSAGES AREA */}
          <View style={styles.messageContainer}>
            <MessageList
              messages={messages}
              onPressMessage={this.handlePressMessage}
            />

            {!isInputFocused && (
              <View style={styles.imageGridContainer}>
                <ImageGrid />
              </View>
            )}
          </View>

          {/* TOOLBAR ALWAYS AT BOTTOM */}
          {this.renderToolbar()}
        </KeyboardAvoidingView>

        {/* FULLSCREEN IMAGE */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  messageContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  imageGridContainer: {
    height: 120,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },

  toolbar: {
    minHeight: 55,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    backgroundColor: "white",
  },

  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },

  fullscreenImage: {
    flex: 1,
  },
});