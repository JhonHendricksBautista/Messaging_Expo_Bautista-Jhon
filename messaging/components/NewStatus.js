import Constants from 'expo-constants';
import {
  NetInfo, // <-- Imported directly from react-native for older APIs
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

export default class Status extends React.Component {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    // 1. Get initial network connectivity when component mounts
    NetInfo.getConnectionInfo().then((status) => {
      // Per your instructions, status resolves to 'wifi', 'cellular', or 'none'
      // (Note: We also check status.type just in case your specific RN version returns an object)
      const connectionString = typeof status === 'string' ? status : status.type;
      
      this.setState({
        isConnected: connectionString !== 'none',
      });
    });

    // 2. Add event listener for ongoing connection changes
    this.subscription = NetInfo.addEventListener('connectionChange', (status) => {
      const connectionString = typeof status === 'string' ? status : status.type;
      
      this.setState({
        isConnected: connectionString !== 'none',
      });
    });
  }

  componentWillUnmount() {
    // 3. Remove the subscription when the component unmounts
    if (this.subscription && this.subscription.remove) {
      this.subscription.remove();
    }
  }

  render() {
    const { isConnected } = this.state;
    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents="none">
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <View style={[styles.status, { backgroundColor }]}>
          {messageContainer}
        </View>
      );
    }

    return messageContainer;
  }
}

const statusHeight =
  Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 999,    
    elevation: 10,      
    height: statusHeight,
  },

  messageContainer: {
    zIndex: 999,     
    elevation: 10,     
    position: 'absolute',
    top: statusHeight + 20,
    left: 0,
    right: 0,
    height: 80,
    alignItems: 'center',
  },

  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
    marginTop: 20,
  },

  text: {
    color: 'white',
  },
});