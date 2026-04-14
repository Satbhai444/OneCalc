import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function SpeedCalculator() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [dist, setDist] = useState('100');
  const [time, setTime] = useState('2');
  const [speed, setSpeed] = useState('50');
  const [mode, setMode] = useState<'speed' | 'dist' | 'time'>('speed');

  useEffect(() => {
    const d = parseFloat(dist) || 0;
    const t = parseFloat(time) || 0;
    const s = parseFloat(speed) || 0;

    if (mode === 'speed' && t !== 0) setSpeed((d / t).toFixed(2));
    if (mode === 'dist') setDist((s * t).toFixed(2));
    if (mode === 'time' && s !== 0) setTime((d / s).toFixed(2));
  }, [dist, time, speed, mode]);

  const modes = [
    { key: 'speed', label: 'Speed' },
    { key: 'dist', label: 'Distance' },
    { key: 'time', label: 'Time' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
         {modes.map(m => (
           <TouchableOpacity 
             key={m.key} 
             style={[styles.tab, { backgroundColor: mode === m.key ? Colors.primary : Colors.cardBg, borderColor: mode === m.key ? Colors.primary : Colors.border }]}
             onPress={() => { triggerHaptic(); setMode(m.key as any); }}
           >
              <Text style={[styles.tabText, { color: mode === m.key ? '#FFF' : Colors.text }]}>{m.label}</Text>
           </TouchableOpacity>
         ))}
      </View>

      <View style={styles.form}>
         {mode !== 'dist' && (
            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: Colors.text }]}>Distance (km)</Text>
               <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={dist} onChangeText={setDist} keyboardType="numeric" />
            </View>
         )}
         {mode !== 'time' && (
            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: Colors.text }]}>Time (hours)</Text>
               <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={time} onChangeText={setTime} keyboardType="numeric" />
            </View>
         )}
         {mode !== 'speed' && (
            <View style={styles.inputGroup}>
               <Text style={[styles.label, { color: Colors.text }]}>Speed (km/h)</Text>
               <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={speed} onChangeText={setSpeed} keyboardType="numeric" />
            </View>
         )}
      </View>

      <View style={[styles.resCard, { backgroundColor: Colors.primary }]}>
          <Text style={styles.resLabel}>CALCULATED {mode.toUpperCase()}</Text>
          <Text style={styles.resVal}>
            {mode === 'speed' ? speed : mode === 'dist' ? dist : time}
            <Text style={{fontSize: 18}}> {mode === 'speed' ? 'km/h' : mode === 'dist' ? 'km' : 'hrs'}</Text>
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  tab: { flex: 1, height: 44, borderRadius: 12, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  tabText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 12 },
  form: { gap: 16, marginBottom: 30 },
  inputGroup: { gap: 8 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
  resCard: { padding: 30, borderRadius: 24, alignItems: 'center' },
  resLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  resVal: { color: '#FFF', fontSize: 36, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 5 }
});
