import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

export default function CoinToss() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [result, setResult] = useState<'Heads' | 'Tails'>('Heads');
  const [flipping, setFlipping] = useState(false);
  const flipValue = React.useRef(new Animated.Value(0)).current;

  const tossCoin = () => {
    setFlipping(true);
    triggerHaptic();
    
    Animated.timing(flipValue, { toValue: 1, duration: 500, useNativeDriver: true }).start(() => {
        const res = Math.random() > 0.5 ? 'Heads' : 'Tails';
        setResult(res);
        flipValue.setValue(0);
        setFlipping(false);
    });
  };

  const flip = flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  });

  return (
    <View style={styles.container}>
      <View style={[styles.coinBox, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
        <Animated.View style={{ transform: [{ rotateY: flip }] }}>
           <View style={[styles.coin, { backgroundColor: Colors.primary + '20', borderColor: Colors.primary }]}>
              <Text style={[styles.coinText, { color: Colors.primary }]}>{result === 'Heads' ? 'H' : 'T'}</Text>
           </View>
        </Animated.View>
        <Text style={[styles.resultText, { color: Colors.text }]}>{result}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.tossBtn, { backgroundColor: Colors.primary }]} 
        onPress={tossCoin}
        disabled={flipping}
      >
        <Text style={styles.tossBtnText}>{flipping ? 'Flipping...' : 'TOSS COIN'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 400 },
  coinBox: { width: 280, height: 280, borderRadius: 140, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  coin: { width: 140, height: 140, borderRadius: 70, borderWidth: 4, justifyContent: 'center', alignItems: 'center' },
  coinText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 64 },
  resultText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, marginTop: 20 },
  tossBtn: { marginTop: 40, paddingHorizontal: 40, paddingVertical: 18, borderRadius: 20 },
  tossBtnText: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 18, letterSpacing: 1 },
});
