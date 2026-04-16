import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function CurrencyConverter() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [rates, setRates] = useState<any>({});
  const [converted, setConverted] = useState('0');

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(e => console.log('Rates fetch error'));
  }, []);

  useEffect(() => {
    if (rates[from] && rates[to]) {
      const result = (parseFloat(amount) / rates[from]) * rates[to];
      setConverted(result.toFixed(2));
    }
  }, [amount, from, to, rates]);

  const currencies = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AED', 'CAD'];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.mainCard, { backgroundColor: Colors.primary }]}>
         <Text style={styles.label}>CONVERTED AMOUNT</Text>
         <Text style={styles.val}>{to} {converted}</Text>
      </View>

      <View style={styles.form}>
         <View style={styles.inputGroup}>
            <Text style={[styles.inLabel, { color: Colors.text }]}>Amount</Text>
            <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={amount} onChangeText={setAmount} keyboardType="numeric" />
         </View>

         <View style={styles.selectors}>
            <View style={{flex: 1}}>
               <Text style={[styles.inLabel, { color: Colors.text }]}>From</Text>
               <View style={styles.grid}>
                 {currencies.map(c => (
                   <TouchableOpacity key={c} style={[styles.chip, { backgroundColor: from === c ? Colors.primary : Colors.cardBg, borderColor: Colors.border }]} onPress={() => { triggerHaptic(); setFrom(c); }}>
                      <Text style={{color: from === c ? '#FFF' : Colors.text, fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold'}}>{c}</Text>
                   </TouchableOpacity>
                 ))}
               </View>
            </View>
            
            <View style={{flex: 1}}>
               <Text style={[styles.inLabel, { color: Colors.text }]}>To</Text>
               <View style={styles.grid}>
                 {currencies.map(c => (
                   <TouchableOpacity key={c} style={[styles.chip, { backgroundColor: to === c ? Colors.primary : Colors.cardBg, borderColor: Colors.border }]} onPress={() => { triggerHaptic(); setTo(c); }}>
                      <Text style={{color: to === c ? '#FFF' : Colors.text, fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold'}}>{c}</Text>
                   </TouchableOpacity>
                 ))}
               </View>
            </View>
         </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  mainCard: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  val: { color: '#FFF', fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 10 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  inLabel: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4, marginBottom: 8 },
  input: { height: 64, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5 },
  selectors: { flexDirection: 'row', gap: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, borderWidth: 1, minWidth: 45, alignItems: 'center' }
});
