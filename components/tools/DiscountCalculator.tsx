import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function DiscountCalculator() {
  const { colors: Colors } = useApp();
  const [price, setPrice] = useState('1000');
  const [discount, setDiscount] = useState('20');
  
  const [finalPrice, setFinalPrice] = useState('0');
  const [savings, setSavings] = useState('0');

  useEffect(() => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;

    if (p > 0) {
      const save = (p * d) / 100;
      const final = p - save;
      setFinalPrice(final.toFixed(2));
      setSavings(save.toFixed(2));
    }
  }, [price, discount]);

  return (
    <View style={styles.container}>
      {/* Result Display */}
      <View style={[styles.resultCard, { backgroundColor: '#22C55E' }]}>
        <Text style={styles.resultLabel}>Final Price After Discount</Text>
        <Text style={styles.resultValue}>₹ {Number(finalPrice).toLocaleString('en-IN')}</Text>
        
        <View style={styles.statsRow}>
           <Text style={styles.statText}>You Save: ₹ {Number(savings).toLocaleString('en-IN')}</Text>
        </View>
      </View>

      {/* Input Group */}
      <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors.text }]}>Original Price</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="0.00"
          />

          <Text style={[styles.label, { color: Colors.text }]}>Discount Percentage (%)</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={discount}
            onChangeText={setDiscount}
            keyboardType="numeric"
            placeholder="0"
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 48 },
  statsRow: { marginTop: 16, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100 },
  statText: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 14 },

  inputGroup: { marginTop: 30, gap: 10 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 64, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 16 },
});
