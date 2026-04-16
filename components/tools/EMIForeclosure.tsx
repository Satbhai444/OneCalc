import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function EMIForeclosure() {
  const { colors: Colors } = useApp();
  const [balance, setBalance] = useState('500000');
  const [interest, setInterest] = useState('9');
  const [charge, setCharge] = useState('2');
  
  const calculate = () => {
    const b = parseFloat(balance) || 0;
    const c = parseFloat(charge) || 0;
    const foreCharge = (b * c) / 100;
    const total = b + foreCharge;
    return { foreCharge, total };
  };

  const res = calculate();

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.mainCard, { backgroundColor: '#F43F5E' }]}>
         <Text style={styles.label}>FORECLOSURE SETTLEMENT</Text>
         <Text style={styles.total}>₹{res.total.toLocaleString()}</Text>
         <Text style={styles.hint}>Closing Charge: ₹{res.foreCharge.toLocaleString()}</Text>
      </View>

      <View style={styles.form}>
         <View style={styles.inputGroup}>
            <Text style={[styles.inLabel, { color: Colors.text }]}>Outstanding Principal (₹)</Text>
            <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={balance} onChangeText={setBalance} keyboardType="numeric" />
         </View>
         <View style={styles.inputGroup}>
            <Text style={[styles.inLabel, { color: Colors.text }]}>Foreclosure Charge (%)</Text>
            <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={charge} onChangeText={setCharge} keyboardType="numeric" />
         </View>
      </View>

      <View style={[styles.info, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.infoTitle, { color: Colors.text }]}>What is Foreclosure?</Text>
         <Text style={[styles.infoText, { color: Colors.textMuted }]}>
            Foreclosure means paying off your loan before the tenure ends. Banks usually charge a penalty (1-4%) on the outstanding principal.
         </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  mainCard: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  total: { color: '#FFF', fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 5 },
  hint: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: 'SpaceGrotesk_500Medium', marginTop: 10 },
  form: { gap: 16, marginBottom: 30 },
  inputGroup: { gap: 8 },
  inLabel: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5 },
  info: { padding: 24, borderRadius: 24, borderWidth: 1 },
  infoTitle: { fontSize: 16, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 10 },
  infoText: { fontSize: 13, fontFamily: 'SpaceGrotesk_500Medium', lineHeight: 20 }
});
