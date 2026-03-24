import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useApp } from '../context/AppContext';

export default function AnimatedEmpty({ message }: { message: string }) {
  const { colors } = useApp();

  return (
    <View style={styles.container}>
      <LottieView
        source={{ uri: 'https://lottie.host/8e2f80eb-67c4-406a-939e-d30c0c6e00b3/8gD8bY9f7f.json' }} // Empty animation URL
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={[styles.text, { color: colors.textMuted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  lottie: { width: 200, height: 200 },
  text: { fontFamily: 'DMSans_500Medium', fontSize: 16, marginTop: 16, textAlign: 'center' }
});
