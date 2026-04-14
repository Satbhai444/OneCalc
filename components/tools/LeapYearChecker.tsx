import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function LeapYearChecker() {
  const { colors: Colors } = useApp();
  const [year, setYear] = useState('2024');
  const [isLeap, setIsLeap] = useState(true);

  useEffect(() => {
    const y = parseInt(year);
    if (isNaN(y)) {
      setIsLeap(false);
      return;
    }
    const leap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    setIsLeap(leap);
  }, [year]);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: isLeap ? '#10B981' : '#F43F5E' }]}>
         <Text style={styles.label}>IS IT A LEAP YEAR?</Text>
         <Text style={styles.val}>{isLeap ? 'YES' : 'NO'}</Text>
      </View>

      <Text style={[styles.inLabel, { color: Colors.text }]}>Enter Year</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={year} 
        onChangeText={setYear} 
        keyboardType="numeric" 
        placeholder="e.g. 2024"
      />

      <View style={[styles.info, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.infoText, { color: Colors.textMuted }]}>
             A leap year has 366 days instead of 365, with an extra day on February 29th.
         </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  val: { color: '#FFF', fontSize: 56, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 10 },
  inLabel: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 64, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5 },
  info: { marginTop: 30, padding: 20, borderRadius: 20, borderWidth: 1 },
  infoText: { fontSize: 13, fontFamily: 'SpaceGrotesk_500Medium', textAlign: 'center', lineHeight: 20 }
});
