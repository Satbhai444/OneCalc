import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useApp } from '../../context/AppContext';

const options = ["Yes", "No", "Maybe", "Try Again", "Go For It", "Wait", "Ask Later"];

export default function SpinWheel() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const spinValue = React.useRef(new Animated.Value(0)).current;

  const startSpin = () => {
    setSpinning(true);
    triggerHaptic();
    setResult(null);

    const randomSpin = 5 + Math.random() * 5; // 5 to 10 rotations
    
    Animated.timing(spinValue, {
      toValue: randomSpin,
      duration: 3000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const finalIndex = Math.floor(((randomSpin % 1) * options.length));
      setResult(options[finalIndex]);
      setSpinning(false);
      spinValue.setValue(randomSpin % 1); // Keep it normalized for next spin
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
         <Animated.View style={[styles.wheel, { borderColor: Colors.primary, transform: [{ rotate: spin }] }]}>
            {options.map((opt, i) => (
               <View key={i} style={[styles.segment, { transform: [{ rotate: `${(360 / options.length) * i}deg` }] }]}>
                  <Text style={[styles.segmentText, { color: Colors.text }]}>|</Text>
               </View>
            ))}
         </Animated.View>
         <View style={[styles.pointer, { borderBottomColor: Colors.primary }]} />
      </View>

      <Text style={[styles.resultText, { color: Colors.text }]}>{result || (spinning ? 'Spinning...' : 'Spin for Answer')}</Text>

      <TouchableOpacity 
        style={[styles.spinBtn, { backgroundColor: Colors.primary }]} 
        onPress={startSpin}
        disabled={spinning}
      >
        <Text style={styles.spinBtnText}>SPIN THE WHEEL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 400 },
  wheelContainer: { width: 300, height: 300, justifyContent: 'center', alignItems: 'center' },
  wheel: { width: 260, height: 260, borderRadius: 130, borderWidth: 8, justifyContent: 'center', alignItems: 'center' },
  segment: { position: 'absolute', height: '100%', alignItems: 'center' },
  segmentText: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  pointer: { position: 'absolute', top: 5, width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 15, borderRightWidth: 15, borderBottomWidth: 30, borderLeftColor: 'transparent', borderRightColor: 'transparent', transform: [{ rotate: '180deg' }], zIndex: 10 },
  resultText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 32, marginTop: 40, textAlign: 'center' },
  spinBtn: { marginTop: 40, paddingHorizontal: 40, paddingVertical: 18, borderRadius: 20 },
  spinBtnText: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 18, letterSpacing: 1 },
});
