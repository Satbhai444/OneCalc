import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

const units = [
  { label: 'Meters (m)', value: 1 },
  { label: 'Kilometers (km)', value: 0.001 },
  { label: 'Centimeters (cm)', value: 100 },
  { label: 'Millimeters (mm)', value: 1000 },
  { label: 'Miles (mi)', value: 0.000621371 },
  { label: 'Yards (yd)', value: 1.09361 },
  { label: 'Feet (ft)', value: 3.28084 },
  { label: 'Inches (in)', value: 39.3701 },
];

export default function LengthConverter() {
  const { colors: Colors } = useApp();
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(units[0]);
  
  const convert = (val: number, fromFactor: number, toFactor: number) => {
    return (val / fromFactor) * toFactor;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <Text style={[styles.label, { color: Colors.textMuted }]}>Convert From {fromUnit.label}</Text>
        <TextInput 
          style={[styles.mainInput, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.primary }]}
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />
      </View>

      <Text style={[styles.sectionTitle, { color: Colors.text }]}>Conversions</Text>
      <View style={styles.grid}>
        {units.map((u) => {
          const result = convert(parseFloat(value) || 0, fromUnit.value, u.value);
          return (
            <TouchableOpacity 
              key={u.label} 
              style={[styles.unitCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}
              onPress={() => setFromUnit(u)}
            >
              <Text style={[styles.unitValue, { color: Colors.primary }]} numberOfLines={1}>
                {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
              </Text>
              <Text style={[styles.unitLabel, { color: Colors.textMuted }]}>{u.label}</Text>
              {fromUnit.label === u.label && <View style={[styles.activeIndicator, { backgroundColor: Colors.primary }]} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  inputSection: { marginBottom: 30 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  mainInput: { height: 72, borderRadius: 24, paddingHorizontal: 24, fontSize: 32, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 2 },
  
  sectionTitle: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18, marginBottom: 16, marginLeft: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  unitCard: { width: '48%', padding: 20, borderRadius: 20, borderWidth: 1, gap: 4, position: 'overflow' },
  unitValue: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18 },
  unitLabel: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 11 },
  activeIndicator: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4 },
});
