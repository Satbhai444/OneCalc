import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

export default function NumberToWords() {
  const { colors: Colors } = useApp();
  const [num, setNum] = useState('1234');
  const [words, setWords] = useState('');

  const convert = (n: number): string => {
    if (n === 0) return 'Zero';
    if (n < 0) return 'Minus ' + convert(Math.abs(n));
    
    let res = '';
    if (Math.floor(n / 1000000) > 0) {
      res += convert(Math.floor(n / 1000000)) + ' Million ';
      n %= 1000000;
    }
    if (Math.floor(n / 1000) > 0) {
      res += convert(Math.floor(n / 1000)) + ' Thousand ';
      n %= 1000;
    }
    if (Math.floor(n / 100) > 0) {
      res += convert(Math.floor(n / 100)) + ' Hundred ';
      n %= 100;
    }
    
    if (n > 0) {
      if (res !== '') res += 'and ';
      if (n < 10) res += ones[n];
      else if (n < 20) res += teens[n - 10];
      else {
        res += tens[Math.floor(n / 10)];
        if (n % 10 > 0) res += '-' + ones[n % 10];
      }
    }
    return res.trim();
  };

  useEffect(() => {
    const val = parseInt(num);
    if (isNaN(val)) setWords('Enter a number');
    else setWords(convert(val));
  }, [num]);

  return (
    <View style={styles.container}>
      <View style={[styles.wordCard, { backgroundColor: Colors.primary, borderColor: Colors.border, borderWidth: 1 }]}>
         <Text style={styles.wordText}>{words}</Text>
      </View>

      <Text style={[styles.label, { color: Colors.text }]}>Enter Number</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={num} 
        onChangeText={setNum} 
        keyboardType="numeric" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  wordCard: { padding: 30, borderRadius: 24, minHeight: 150, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  wordText: { color: '#FFF', fontSize: 22, fontFamily: 'SpaceGrotesk_700Bold', textAlign: 'center', lineHeight: 32 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 8, marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5 },
});
