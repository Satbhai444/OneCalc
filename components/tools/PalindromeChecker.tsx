import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function PalindromeChecker() {
  const { colors: Colors } = useApp();
  const [text, setText] = useState('Madam');
  const [isPal, setIsPal] = useState(true);

  useEffect(() => {
    const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = clean.split('').reverse().join('');
    setIsPal(clean.length > 0 && clean === reversed);
  }, [text]);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: isPal ? '#10B981' : Colors.cardBg, borderColor: isPal ? '#10B981' : Colors.border, borderWidth: 1 }]}>
         <Text style={[styles.label, { color: isPal ? 'rgba(255,255,255,0.7)' : Colors.textMuted }]}>IS IT A PALINDROME?</Text>
         <Text style={[styles.val, { color: isPal ? '#FFF' : Colors.text }]}>{isPal ? 'YES!' : 'NO'}</Text>
      </View>

      <Text style={[styles.inLabel, { color: Colors.text }]}>Enter Word or Phrase</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={text} 
        onChangeText={setText} 
        placeholder="e.g. Racecar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  label: { fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  val: { fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 10 },
  inLabel: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 20, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
});
