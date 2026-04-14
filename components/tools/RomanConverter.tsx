import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

const valMap: Record<string, number> = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };

export default function RomanConverter() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [num, setNum] = useState('2024');
  const [roman, setRoman] = useState('MMXXIV');
  const [mode, setMode] = useState<'toRoman' | 'fromRoman'>('toRoman');

  useEffect(() => {
    if (mode === 'toRoman') {
      let n = parseInt(num);
      if (isNaN(n) || n < 1 || n > 3999) {
        setRoman('1-3999 only');
        return;
      }
      let result = '';
      for (const key in valMap) {
        while (n >= valMap[key]) {
          result += key;
          n -= valMap[key];
        }
      }
      setRoman(result);
    } else {
      let s = num.toUpperCase();
      let res = 0;
      for (let i = 0; i < s.length; i++) {
        const s1 = valMap[s[i]];
        if (i + 1 < s.length) {
          const s2 = valMap[s[i + 1]];
          if (s1 >= s2) res += s1;
          else { res += s2 - s1; i++; }
        } else res += s1;
      }
      setRoman(isNaN(res) ? 'Invalid' : res.toString());
    }
  }, [num, mode]);

  return (
    <View style={styles.container}>
      <View style={[styles.displayCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
          <Text style={[styles.displayLabel, { color: Colors.textMuted }]}>RESULT</Text>
          <Text style={[styles.displayValue, { color: Colors.primary }]}>{roman}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.modeToggle, { backgroundColor: Colors.primary + '10', borderColor: Colors.primary }]}
        onPress={() => { triggerHaptic(); setMode(mode === 'toRoman' ? 'fromRoman' : 'toRoman'); setNum(''); }}
      >
         <Text style={[styles.modeText, { color: Colors.primary }]}>
           {mode === 'toRoman' ? 'Number ➔ Roman' : 'Roman ➔ Number'}
         </Text>
      </TouchableOpacity>

      <Text style={[styles.label, { color: Colors.text }]}>{mode === 'toRoman' ? 'Enter Number' : 'Enter Roman (e.g. XIV)'}</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={num} 
        onChangeText={setNum} 
        autoCapitalize="characters"
        placeholder={mode === 'toRoman' ? 'e.g. 50' : 'e.g. L'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  displayCard: { padding: 30, borderRadius: 24, borderWidth: 1, alignItems: 'center', marginBottom: 20 },
  displayLabel: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2, marginBottom: 8 },
  displayValue: { fontSize: 32, fontFamily: 'SpaceGrotesk_700Bold' },
  modeToggle: { padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center', marginBottom: 30 },
  modeText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5 },
});
