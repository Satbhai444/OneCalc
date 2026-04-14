import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function TemperatureConverter() {
  const { colors: Colors } = useApp();
  const [celsius, setCelsius] = useState('25');
  
  const c = parseFloat(celsius) || 0;
  const f = (c * 9/5) + 32;
  const k = c + 273.15;

  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <Text style={[styles.label, { color: Colors.textMuted }]}>Enter Celsius (°C)</Text>
        <TextInput 
          style={[styles.mainInput, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: '#F97316' }]}
          value={celsius}
          onChangeText={setCelsius}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
         <View style={[styles.resCard, { backgroundColor: '#3B82F6' }]}>
            <Text style={styles.resLabel}>Fahrenheit</Text>
            <Text style={styles.resValue}>{f.toFixed(1)}°F</Text>
         </View>
         <View style={[styles.resCard, { backgroundColor: '#8B5CF6' }]}>
            <Text style={styles.resLabel}>Kelvin</Text>
            <Text style={styles.resValue}>{k.toFixed(1)}K</Text>
         </View>
      </View>

      <View style={[styles.scale, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.scaleText, { color: Colors.text }]}>
            {c <= 0 ? '❄️ Freezing' : c >= 100 ? '🔥 Boiling' : '🌡️ Ambient'}
         </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  inputSection: { marginBottom: 30 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13, marginBottom: 8 },
  mainInput: { height: 72, borderRadius: 24, paddingHorizontal: 24, fontSize: 32, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 2 },
  row: { flexDirection: 'row', gap: 12 },
  resCard: { flex: 1, padding: 24, borderRadius: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 },
  resLabel: { color: 'rgba(255,255,255,0.8)', fontFamily: 'SpaceGrotesk_500Medium', fontSize: 12, marginBottom: 4 },
  resValue: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24 },
  scale: { marginTop: 30, padding: 20, borderRadius: 20, borderWidth: 1, alignItems: 'center' },
  scaleText: { fontFamily: 'SpaceGrotesk_600SemiBold', fontSize: 16 }
});
