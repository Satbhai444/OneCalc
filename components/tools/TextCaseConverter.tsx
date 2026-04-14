import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function TextCaseConverter() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [text, setText] = useState('onecalc premium tools');
  const [output, setOutput] = useState('');

  const convert = (type: string) => {
    triggerHaptic();
    if (type === 'upper') setOutput(text.toUpperCase());
    if (type === 'lower') setOutput(text.toLowerCase());
    if (type === 'title') setOutput(text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '));
    if (type === 'sentence') setOutput(text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
    if (type === 'camel') setOutput(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.label, { color: Colors.text }]}>Input Text</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={text} 
        onChangeText={setText} 
        multiline
      />

      <View style={styles.btnGrid}>
         <Btn label="UPPERCASE" onPress={() => convert('upper')} color="#3B82F6" />
         <Btn label="lowercase" onPress={() => convert('lower')} color="#10B981" />
         <Btn label="Title Case" onPress={() => convert('title')} color="#F59E0B" />
         <Btn label="Sentence case" onPress={() => convert('sentence')} color="#8B5CF6" />
         <Btn label="camelCase" onPress={() => convert('camel')} color="#EC4899" />
      </View>

      <View style={[styles.outBox, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.outLabel, { color: Colors.textMuted }]}>CONVERTED TEXT</Text>
         <Text style={[styles.outVal, { color: Colors.text }]}>{output || '...'}</Text>
      </View>
    </ScrollView>
  );
}

const Btn = ({ label, onPress, color }: any) => (
  <TouchableOpacity style={[styles.btn, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.btnText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 100, borderRadius: 20, padding: 15, fontSize: 16, fontFamily: 'SpaceGrotesk_500Medium', borderWidth: 1.5, textAlignVertical: 'top' },
  btnGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 24 },
  btn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 11 },
  outBox: { padding: 20, borderRadius: 20, borderWidth: 1, marginBottom: 40 },
  outLabel: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1, marginBottom: 8 },
  outVal: { fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold' }
});
