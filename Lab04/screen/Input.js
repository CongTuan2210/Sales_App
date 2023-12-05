import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

const Input = ({
  marginBottom,
  marginLeft,
  onChangeText,
  name,
  placeholder,
  value,
  multiline,
  secureTextEntry,
}) => {
  return (
    <View style={[styles.info, {marginBottom: marginBottom}]}>
      <Icon
        style={[styles.icon, {marginLeft: marginLeft}]}
        name={name}
        size={30}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    position: 'relative',
    width: 320,
    paddingLeft: 50,
    borderRadius: 10,
    borderWidth: 0.8,
  },
  info: {
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
  },
});

export default Input;
