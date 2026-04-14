import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function GSTCalculator() {
  const { colors: Colors } = useApp();
  const [amount, setAmount] = useState('10000');
  const [gstRate, setGstRate] = useState(18);
  const rates = [5, 12, 18, 28];

  const [netAmount, setNetAmount] = useState('0');
  const [gstAmount, setGstAmount] = useState('0');
  const [totalAmount, setTotalAmount] = useState('0');

  useEffect(() => {
    const val = parseFloat(amount) || 0;
    const gst = (val * gstRate) / 100;
    const total = val + gst;

    setNetAmount(val.toFixed(2));
    setGstAmount(gst.toFixed(2));
    setTotalAmount(total.toFixed(2));
  }, [amount, gstRate]);

  return (
    <View style={styles.container}>
      {/* Result Card */}
      <View style={[styles.resultCard, { backgroundColor: Colors.primary }]}>
        <Text style={styles.resultLabel}>Total Amount (Inc. GST)</Text>
        <Text style={styles.resultValue}>₹ {Number(totalAmount).toLocaleString('en-IN')}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>GST ({gstRate}%)</Text>
            <Text style={styles.statValue}>+ ₹ {Number(gstAmount).toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Tax Split (CGST/SGST)</Text>
            <Text style={styles.statValue}>₹ {(Number(gstAmount)/2).toLocaleString('en-IN')} each</Text>
          </View>
        </View>
      </View>

      {/* Rate Selection */}
      <View style={styles.rateContainer}>
        <Text style={[styles.label, { color: Colors.text }]}>Select GST Rate</Text>
        <View style={styles.rateGrid}>
          {rates.map(r => (
            <TouchableOpacity 
              key={r} 
              onPress={() => setGstRate(r)}
              style={[
                styles.rateBtn, 
                { borderColor: Colors.border },
                gstRate === r && { backgroundColor: Colors.primary, borderColor: Colors.primary }
              ]}
            >
              <Text style={[styles.rateText, { color: Colors.text }, gstRate === r && { color: '#FFF' }]}>{r}%</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Inputs */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: Colors.text }]}>Base Amount (Excl. GST)</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="e.g. 10000"
          placeholderTextColor={Colors.textMuted}
        />
      </View>

      {/* Info Card */}
      <View style={[styles.infoCard, { backgroundColor: Colors.cardBg + '80', borderColor: Colors.border }]}>
         <Text style={[styles.infoTitle, { color: Colors.text }]}>GST Summary</Text>
         <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: Colors.textMuted }]}>Net Amount</Text>
            <Text style={[styles.infoValue, { color: Colors.text }]}>₹ {Number(netAmount).toLocaleString('en-IN')}</Text>
         </View>
         <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: Colors.textMuted }]}>CGST ({(gstRate/2).toFixed(1)}%)</Text>
            <Text style={[styles.infoValue, { color: Colors.text }]}>₹ {(Number(gstAmount)/2).toLocaleString('en-IN')}</Text>
         </View>
         <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: Colors.textMuted }]}>SGST ({(gstRate/2).toFixed(1)}%)</Text>
            <Text style={[styles.infoValue, { color: Colors.text }]}>₹ {(Number(gstAmount)/2).toLocaleString('en-IN')}</Text>
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: {
    padding: 24,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 36, letterSpacing: -1 },
  statsRow: { flexDirection: 'row', marginTop: 24, width: '100%', gap: 10 },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.6)', fontSize: 11, marginBottom: 4 },
  statValue: { fontFamily: 'SpaceGrotesk_600SemiBold', color: '#FFF', fontSize: 14 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', height: '100%' },
  
  rateContainer: { marginTop: 30 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 12, marginLeft: 4 },
  rateGrid: { flexDirection: 'row', gap: 10 },
  rateBtn: { flex: 1, height: 50, borderRadius: 15, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  rateText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 16 },

  inputGroup: { marginTop: 24, gap: 4 },
  input: { 
    height: 56, 
    borderRadius: 16, 
    paddingHorizontal: 16, 
    fontSize: 18, 
    fontFamily: 'SpaceGrotesk_600SemiBold', 
    borderWidth: 1.5,
    marginBottom: 20
  },

  infoCard: { padding: 20, borderRadius: 24, borderWidth: 1, marginTop: 10 },
  infoTitle: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 16, marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  infoLabel: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 13 },
  infoValue: { fontFamily: 'SpaceGrotesk_600SemiBold', fontSize: 14 },
});
