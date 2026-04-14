import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function LotteryGenerator() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [numbers, setNumbers] = useState<number[]>([1, 10, 24, 33, 45, 50]);
  
  const generate = () => {
    triggerHaptic();
    const newNums = [];
    while(newNums.length < 6) {
      const n = Math.floor(Math.random() * 99) + 1;
      if (!newNums.includes(n)) newNums.push(n);
    }
    setNumbers(newNums.sort((a, b) => a - b));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors.text }]}>6 Lucky Numbers</Text>
      
      <View style={styles.numbersRow}>
        {numbers.map((n, i) => (
          <View key={i} style={[styles.ball, { backgroundColor: Colors.primary }]}>
             <Text style={styles.ballText}>{n}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.genBtn, { backgroundColor: Colors.cardBg, borderColor: Colors.primary }]} onPress={generate}>
        <Text style={[styles.genBtnText, { color: Colors.primary }]}>SHUFFLE LUCK</Text>
      </TouchableOpacity>

      <Text style={[styles.hint, { color: Colors.textMuted }]}>Numbers range from 1 to 99</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 400 },
  title: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, marginBottom: 40 },
  numbersRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 50 },
  ball: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  ballText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 20 },
  genBtn: { paddingHorizontal: 40, paddingVertical: 18, borderRadius: 20, borderWidth: 2 },
  genBtnText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 16, letterSpacing: 1 },
  hint: { fontFamily: 'SpaceGrotesk_500Medium', marginTop: 30, fontSize: 12 }
});
