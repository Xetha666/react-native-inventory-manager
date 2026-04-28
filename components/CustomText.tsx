import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface CustomTextProps {
  children: React.ReactNode;
}

export default function CustomText({ children }: CustomTextProps) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});
