import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function PasswordGenerator() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [length, setLength] = useState('12');
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    triggerHaptic();
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let chars = lower;
    if (includeUpper) chars += upper;
    if (includeNumbers) chars += nums;
    if (includeSymbols) chars += syms;
    
    let result = '';
    const len = parseInt(length) || 12;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.passCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.passText, { color: Colors.primary }]} numberOfLines={2}>
           {password || 'Click Generate'}
         </Text>
      </View>

      <View style={styles.form}>
         <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Colors.text }]}>Password Length</Text>
            <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={length} onChangeText={setLength} keyboardType="numeric" />
         </View>

         <View style={styles.switchRow}>
            <Text style={[styles.switchLabel, { color: Colors.text }]}>Include Uppercase</Text>
            <Switch value={includeUpper} onValueChange={setIncludeUpper} trackColor={{ true: Colors.primary }} />
         </View>
         <View style={styles.switchRow}>
            <Text style={[styles.switchLabel, { color: Colors.text }]}>Include Numbers</Text>
            <Switch value={includeNumbers} onValueChange={setIncludeNumbers} trackColor={{ true: Colors.primary }} />
         </View>
         <View style={styles.switchRow}>
            <Text style={[styles.switchLabel, { color: Colors.text }]}>Include Symbols</Text>
            <Switch value={includeSymbols} onValueChange={setIncludeSymbols} trackColor={{ true: Colors.primary }} />
         </View>
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.primary }]} onPress={generate}>
         <Text style={styles.btnText}>GENERATE SECURE PASSWORD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  passCard: { padding: 30, borderRadius: 24, borderWidth: 1, alignItems: 'center', minHeight: 120, justifyContent: 'center', marginBottom: 30 },
  passText: { fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', textAlign: 'center' },
  form: { gap: 12, marginBottom: 30 },
  inputGroup: { gap: 8, marginBottom: 10 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  switchLabel: { fontSize: 15, fontFamily: 'SpaceGrotesk_500Medium' },
  btn: { padding: 20, borderRadius: 20, alignItems: 'center' },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 }
});
