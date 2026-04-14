import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function BasesConverter() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [val, setVal] = useState('10');
  const [base, setBase] = useState(10);
  
  const [binary, setBinary] = useState('0');
  const [octal, setOctal] = useState('0');
  const [decimal, setDecimal] = useState('0');
  const [hex, setHex] = useState('0');

  useEffect(() => {
    try {
      if (!val) {
        setBinary('0'); setOctal('0'); setDecimal('0'); setHex('0');
        return;
      }
      
      const num = parseInt(val, base);
      if (isNaN(num)) return;

      setBinary(num.toString(2));
      setOctal(num.toString(8));
      setDecimal(num.toString(10));
      setHex(num.toString(16).toUpperCase());
    } catch (e) {
      // Ignore invalid input error
    }
  }, [val, base]);

  const bases = [
    { label: 'Bin', val: 2 },
    { label: 'Oct', val: 8 },
    { label: 'Dec', val: 10 },
    { label: 'Hex', val: 16 }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.inputBox, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <View style={styles.baseSelector}>
            {bases.map(b => (
              <TouchableOpacity 
                key={b.val} 
                onPress={() => { triggerHaptic(); setBase(b.val); }}
                style={[styles.baseBtn, { backgroundColor: base === b.val ? Colors.primary : 'transparent' }]}
              >
                <Text style={[styles.baseBtnText, { color: base === b.val ? '#FFF' : Colors.text }]}>{b.label}</Text>
              </TouchableOpacity>
            ))}
         </View>
         <TextInput 
            style={[styles.input, { color: Colors.text }]} 
            value={val} 
            onChangeText={setVal} 
            placeholder="Enter value"
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="characters"
         />
      </View>

      <View style={styles.results}>
         <ResultItem label="BINARY (BASE 2)" value={binary} color="#3B82F6" colors={Colors} />
         <ResultItem label="OCTAL (BASE 8)" value={octal} color="#F59E0B" colors={Colors} />
         <ResultItem label="DECIMAL (BASE 10)" value={decimal} color="#10B981" colors={Colors} />
         <ResultItem label="HEXADECIMAL (BASE 16)" value={hex} color="#8B5CF6" colors={Colors} />
      </View>
    </ScrollView>
  );
}

const ResultItem = ({ label, value, color, colors }: any) => (
  <View style={[styles.resItem, { borderColor: colors.border, backgroundColor: colors.cardBg }]}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <View style={{flex: 1}}>
        <Text style={[styles.resLabel, { color: colors.textMuted }]}>{label}</Text>
        <Text style={[styles.resValue, { color: colors.text }]} numberOfLines={2}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  inputBox: { padding: 20, borderRadius: 24, borderWidth: 1, marginBottom: 30 },
  baseSelector: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  baseBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  baseBtnText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 12 },
  input: { fontSize: 32, fontFamily: 'SpaceGrotesk_700Bold' },
  results: { gap: 12 },
  resItem: { padding: 16, borderRadius: 20, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 16 },
  dot: { width: 4, height: 40, borderRadius: 2 },
  resLabel: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1, marginBottom: 4 },
  resValue: { fontSize: 20, fontFamily: 'SpaceGrotesk_600SemiBold' },
});
