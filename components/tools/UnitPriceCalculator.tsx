import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function UnitPriceCalculator() {
  const { colors: Colors } = useApp();
  const [price, setPrice] = useState('500');
  const [quantity, setQuantity] = useState('2');
  
  const [unitPrice, setUnitPrice] = useState('0');

  useEffect(() => {
    const p = parseFloat(price) || 0;
    const q = parseFloat(quantity) || 0;
    if (q > 0) {
      setUnitPrice((p / q).toFixed(2));
    }
  }, [price, quantity]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#0284C7' }]}>
        <Text style={styles.resultLabel}>Price Per Unit</Text>
        <Text style={styles.resultValue}>₹ {unitPrice}</Text>
      </View>

      <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors.text }]}>Total Price (₹)</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { color: Colors.text }]}>Quantity / Units</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
      </View>

      <View style={[styles.infoCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.infoText, { color: Colors.textMuted }]}>
            Useful for comparing prices between different pack sizes at the supermarket.
         </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 48 },

  inputGroup: { marginTop: 30, gap: 12 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 60, borderRadius: 18, paddingHorizontal: 20, fontSize: 22, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 16 },

  infoCard: { padding: 20, borderRadius: 20, borderWidth: 1, marginTop: 20 },
  infoText: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 13, lineHeight: 20, textAlign: 'center' }
});
