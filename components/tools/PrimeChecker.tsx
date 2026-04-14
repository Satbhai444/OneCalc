import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function PrimeChecker() {
  const { colors: Colors } = useApp();
  const [num, setNum] = useState('17');
  const [isPrime, setIsPrime] = useState(true);
  const [factors, setFactors] = useState<number[]>([]);

  useEffect(() => {
    const n = parseInt(num);
    if (isNaN(n) || n < 1) {
      setIsPrime(false);
      setFactors([]);
      return;
    }
    
    if (n === 1) {
      setIsPrime(false);
      setFactors([1]);
      return;
    }

    let f: number[] = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        f.push(i);
        if (i !== n / i) f.push(n / i);
      }
    }
    f.sort((a, b) => a - b);
    setFactors(f);
    setIsPrime(f.length === 2);
  }, [num]);

  return (
    <View style={styles.container}>
      <View style={[styles.statusCard, { backgroundColor: isPrime ? '#10B981' : '#F43F5E' }]}>
         <Text style={styles.statusLabel}>IS IT PRIME?</Text>
         <Text style={styles.statusValue}>{isPrime ? 'YES' : 'NO'}</Text>
      </View>

      <Text style={[styles.label, { color: Colors.text }]}>Enter Number</Text>
      <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={num} onChangeText={setNum} keyboardType="numeric" />

      <View style={[styles.infoBox, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.infoTitle, { color: Colors.textMuted }]}>FACTORS FOUND ({factors.length})</Text>
         <Text style={[styles.infoVal, { color: Colors.text }]}>{factors.join(' , ')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  statusCard: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  statusLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  statusValue: { color: '#FFF', fontSize: 48, fontFamily: 'SpaceGrotesk_700Bold' },
  label: { fontSize: 14, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5, marginBottom: 20 },
  infoBox: { padding: 20, borderRadius: 20, borderWidth: 1 },
  infoTitle: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1, marginBottom: 8 },
  infoVal: { fontSize: 16, fontFamily: 'SpaceGrotesk_600SemiBold', lineHeight: 24 }
});
