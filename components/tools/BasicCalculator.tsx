import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');

export default function BasicCalculator() {
  const { colors: Colors } = useApp();
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState('');

  const handlePress = (token: string) => {
    if (token === 'AC') {
      setDisplay('0');
      setHistory('');
    } else if (token === 'DEL') {
      setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (token === '=') {
      try {
        const result = eval(display.replace(/×/g, '*').replace(/÷/g, '/'));
        setHistory(display + ' =');
        setDisplay(String(result));
      } catch {
        setDisplay('Error');
      }
    } else {
      setDisplay(prev => prev === '0' ? token : prev + token);
    }
  };

  const CalcBtn = ({ label, style, textStyle }: { label: string, style?: any, textStyle?: any }) => (
    <TouchableOpacity 
      style={[styles.btn, { backgroundColor: Colors.cardBg, borderColor: Colors.border }, style]}
      onPress={() => handlePress(label)}
    >
      <Text style={[styles.btnText, { color: Colors.text }, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.displayArea, { backgroundColor: Colors.cardBg + '50' }]}>
        <Text style={[styles.historyText, { color: Colors.textMuted }]}>{history}</Text>
        <Text style={[styles.displayText, { color: Colors.text }]} numberOfLines={1} adjustsFontSizeToFit>{display}</Text>
      </View>

      <View style={styles.keypad}>
        <View style={styles.row}>
          <CalcBtn label="AC" textStyle={{ color: '#EF4444' }} />
          <CalcBtn label="DEL" textStyle={{ color: Colors.primary }} />
          <CalcBtn label="%" textStyle={{ color: Colors.primary }} />
          <CalcBtn label="÷" style={styles.opBtn} textStyle={styles.opText} />
        </View>
        <View style={styles.row}>
          <CalcBtn label="7" />
          <CalcBtn label="8" />
          <CalcBtn label="9" />
          <CalcBtn label="×" style={styles.opBtn} textStyle={styles.opText} />
        </View>
        <View style={styles.row}>
          <CalcBtn label="4" />
          <CalcBtn label="5" />
          <CalcBtn label="6" />
          <CalcBtn label="-" style={styles.opBtn} textStyle={styles.opText} />
        </View>
        <View style={styles.row}>
          <CalcBtn label="1" />
          <CalcBtn label="2" />
          <CalcBtn label="3" />
          <CalcBtn label="+" style={styles.opBtn} textStyle={styles.opText} />
        </View>
        <View style={styles.row}>
          <CalcBtn label="0" style={{ flex: 2.15 }} />
          <CalcBtn label="." />
          <CalcBtn label="=" style={{ backgroundColor: Colors.primary }} textStyle={{ color: '#FFF' }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  displayArea: { height: 180, borderRadius: 32, padding: 24, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(0,0,0,0.02)' },
  historyText: { fontSize: 18, fontFamily: 'SpaceGrotesk_500Medium', marginBottom: 4 },
  displayText: { fontSize: 56, fontFamily: 'SpaceGrotesk_700Bold' },

  keypad: { gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1, height: (width - 64) / 4, borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  btnText: { fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold' },
  opBtn: { backgroundColor: 'rgba(0,0,0,0.02)' },
  opText: { fontSize: 32, fontWeight: '500' }
});
