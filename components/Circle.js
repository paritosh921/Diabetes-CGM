import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Circle = ({ children }) => {
  return (
    <View style={styles.circle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 150 ,
    height: 150,
    borderRadius: 100,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
  },
});

export default Circle;
