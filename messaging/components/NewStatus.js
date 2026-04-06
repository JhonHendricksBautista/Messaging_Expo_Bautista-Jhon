import Constants from 'expo-constants';
import {
  NetInfo,
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
    NetInfo.getConnectionInfo().then((status) => {
      const connectionString = typeof status === 'string' ? status : status.type;
      
      this.setState({
        isConnected: connectionString !== 'none',
      });
    });

    this.subscription = NetInfo.addEventListener('connectionChange', (status) => {
      const connectionString = typeof status === 'string' ? status : status.type;
      
      this.setState({
        isConnected: connectionString !== 'none',
      });
    });
  }
  componentWillUnmount() {
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