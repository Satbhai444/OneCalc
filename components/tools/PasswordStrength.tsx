import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function PasswordStrength() {
  const { colors: Colors } = useApp();
  const [pass, setPass] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    let s = 0;
    if (pass.length > 8) s++;
    if (/[A-Z]/.test(pass)) s++;
    if (/[0-9]/.test(pass)) s++;
    if (/[^A-Za-z0-9]/.test(pass)) s++;
    if (pass.length > 12) s++;
    setScore(s);
  }, [pass]);

  const levels = [
    { label: 'Very Weak', color: '#EF4444' },
    { label: 'Weak', color: '#F87171' },
    { label: 'Fair', color: '#F59E0B' },
    { label: 'Good', color: '#3B82F6' },
    { label: 'Strong', color: '#10B981' },
    { label: 'Very Strong', color: '#059669' }
  ];

  const current = levels[score];

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
          <Text style={[styles.label, { color: Colors.textMuted }]}>STRENGTH SCORE</Text>
          <Text style={[styles.stText, { color: current.color }]}>{current.label.toUpperCase()}</Text>
          
          <View style={styles.meter}>
             {[0,1,2,3,4,5].map(i => (
               <View key={i} style={[styles.bar, { backgroundColor: i <= score ? current.color : Colors.border }]} />
             ))}
          </View>
      </View>

      <Text style={[styles.inLabel, { color: Colors.text }]}>Test your password</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={pass} 
        onChangeText={setPass} 
        secureTextEntry
        placeholder="Enter password..."
      />

      <View style={styles.tips}>
         <Text style={[styles.tipTitle, { color: Colors.text }]}>Security Tips:</Text>
         <Text style={[styles.tip, { color: Colors.textMuted }]}>• Use at least 12 characters</Text>
         <Text style={[styles.tip, { color: Colors.textMuted }]}>• Combine numbers, letters, and symbols</Text>
         <Text style={[styles.tip, { color: Colors.textMuted }]}>• Avoid common words like "password"</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { padding: 30, borderRadius: 24, borderWidth: 1, alignItems: 'center', marginBottom: 30 },
  label: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2, marginBottom: 5 },
  stText: { fontSize: 28, fontFamily: 'SpaceGrotesk_700Bold' },
  meter: { flexDirection: 'row', gap: 6, width: '100%', height: 6, marginTop: 20 },
  bar: { flex: 1, borderRadius: 3 },
  inLabel: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
  tips: { marginTop: 30, gap: 8 },
  tipTitle: { fontSize: 15, fontFamily: 'SpaceGrotesk_700Bold' },
  tip: { fontSize: 13, fontFamily: 'SpaceGrotesk_500Medium' }
});
