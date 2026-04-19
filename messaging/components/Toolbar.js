import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";

const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default class Toolbar extends React.Component {
  state = {
    text: "",
  };

  setInputRef = (ref) => {
    this.input = ref;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      if (this.props.isFocused) {
        this.input?.focus();
      } else {
        this.input?.blur();
      }
    }
  }

  handleFocus = () => {
    this.props.onChangeFocus(true);
  };

  handleBlur = () => {
    this.props.onChangeFocus(false);
  };

  handleChangeText = (text) => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { text } = this.state;

    if (!text.trim()) return;

    this.props.onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <View style={styles.toolbar}>
        <ToolbarButton title="📷" onPress={this.props.onPressCamera} />
        <ToolbarButton title="📍" onPress={this.props.onPressLocation} />

        <View style={styles.inputContainer}>
          <TextInput
            ref={this.setInputRef}
            style={styles.input}
            placeholder="Type something..."
            value={this.state.text}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 55,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },

  button: {
    fontSize: 22,
    marginRight: 10,
    color: "grey",
  },

  inputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 18,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: "center",
  },

  input: {
    fontSize: 16,
    flex: 1,
  },
});