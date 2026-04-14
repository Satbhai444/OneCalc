import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function TextCounter() {
  const { colors: Colors } = useApp();
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ chars: 0, words: 0, lines: 0, spaces: 0 });

  useEffect(() => {
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lines = text === '' ? 0 : text.split('\n').length;
    const spaces = text.split(' ').length - 1;
    setStats({ chars, words, lines, spaces });
  }, [text]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
         <StatBox label="WORDS" val={stats.words} color="#3B82F6" />
         <StatBox label="CHARACTERS" val={stats.chars} color="#10B981" />
         <StatBox label="LINES" val={stats.lines} color="#F59E0B" />
         <StatBox label="SPACES" val={stats.spaces} color="#8B5CF6" />
      </View>

      <Text style={[styles.label, { color: Colors.text, marginTop: 20 }]}>Paste Text to Analyze</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={text} 
        onChangeText={setText} 
        multiline
        placeholder="Type here..."
        placeholderTextColor={Colors.textMuted}
      />
    </ScrollView>
  );
}

const StatBox = ({ label, val, color }: any) => (
  <View style={[styles.box, { backgroundColor: color }]}>
     <Text style={styles.boxLabel}>{label}</Text>
     <Text style={styles.boxVal}>{val}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  box: { width: '48%', padding: 20, borderRadius: 20, alignItems: 'center' },
  boxLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1 },
  boxVal: { color: '#FFF', fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 4 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 250, borderRadius: 24, padding: 20, fontSize: 16, fontFamily: 'SpaceGrotesk_500Medium', borderWidth: 1.5, textAlignVertical: 'top', marginBottom: 40 },
});
