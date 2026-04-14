import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function Base64Tool() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [input, setInput] = useState('Hello World');
  const [output, setOutput] = useState('');

  const encode = () => {
    triggerHaptic();
    try {
      setOutput(btoa(input));
    } catch (e) { setOutput('Error encoding'); }
  };

  const decode = () => {
    triggerHaptic();
    try {
      setOutput(atob(input));
    } catch (e) { setOutput('Invalid Base64 string'); }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: Colors.text }]}>Input Text</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={input} 
        onChangeText={setInput} 
        multiline
      />

      <View style={styles.btnRow}>
         <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.primary }]} onPress={encode}>
            <Text style={styles.btnText}>ENCODE</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.btn, { backgroundColor: '#334155' }]} onPress={decode}>
            <Text style={styles.btnText}>DECODE</Text>
         </TouchableOpacity>
      </View>

      <View style={[styles.outBox, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.outLabel, { color: Colors.textMuted }]}>OUTPUT</Text>
         <Text style={[styles.outVal, { color: Colors.text }]}>{output || '...'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 120, borderRadius: 20, padding: 20, fontSize: 16, fontFamily: 'SpaceGrotesk_500Medium', borderWidth: 1.5, textAlignVertical: 'top' },
  btnRow: { flexDirection: 'row', gap: 12, marginVertical: 24 },
  btn: { flex: 1, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13 },
  outBox: { padding: 20, borderRadius: 20, borderWidth: 1 },
  outLabel: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1, marginBottom: 8 },
  outVal: { fontSize: 16, fontFamily: 'SpaceGrotesk_600SemiBold' }
});
