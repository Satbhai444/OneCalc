import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');

export default function ScientificCalculator() {
  const { colors: Colors } = useApp();
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handlePress = (token: string) => {
    if (token === 'AC') {
      setDisplay('0');
      setEquation('');
    } else if (token === 'DEL') {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay('0');
      }
    } else if (token === '=') {
      try {
        // Safe math evaluation (simple version)
        const res = eval(display.replace(/×/g, '*').replace(/÷/g, '/'));
        setEquation(display + ' =');
        setDisplay(String(res).slice(0, 15));
      } catch (e) {
        setDisplay('Error');
      }
    } else {
      setDisplay(prev => (prev === '0' ? token : prev + token));
    }
  };

  const Btn = ({ label, style, textStyle }: { label: string, style?: any, textStyle?: any }) => (
    <TouchableOpacity 
      style={[styles.btn, { backgroundColor: Colors.cardBg, borderColor: Colors.border }, style]}
      onPress={() => handlePress(label)}
      activeOpacity={0.7}
    >
      <Text style={[styles.btnText, { color: Colors.text }, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Display */}
      <View style={[styles.displayContainer, { backgroundColor: '#191C1D' }]}>
        <Text style={styles.equationText}>{equation}</Text>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>{display}</Text>
      </View>

      {/* Grid */}
      <View style={styles.keypad}>
        <View style={styles.row}>
          <Btn label="sin" style={styles.sciBtn} textStyle={styles.sciText} />
          <Btn label="cos" style={styles.sciBtn} textStyle={styles.sciText} />
          <Btn label="tan" style={styles.sciBtn} textStyle={styles.sciText} />
          <Btn label="log" style={styles.sciBtn} textStyle={styles.sciText} />
        </View>
        <View style={styles.row}>
          <Btn label="AC" textStyle={{ color: '#FF3B30' }} />
          <Btn label="DEL" />
          <Btn label="%" />
          <Btn label="÷" textStyle={{ color: Colors.primary, fontSize: 32 }} />
        </View>
        <View style={styles.row}>
          <Btn label="7" />
          <Btn label="8" />
          <Btn label="9" />
          <Btn label="×" textStyle={{ color: Colors.primary, fontSize: 32 }} />
        </View>
        <View style={styles.row}>
          <Btn label="4" />
          <Btn label="5" />
          <Btn label="6" />
          <Btn label="-" textStyle={{ color: Colors.primary, fontSize: 40 }} />
        </View>
        <View style={styles.row}>
          <Btn label="1" />
          <Btn label="2" />
          <Btn label="3" />
          <Btn label="+" textStyle={{ color: Colors.primary, fontSize: 32 }} />
        </View>
        <View style={styles.row}>
          <Btn label="0" style={{ flex: 2.15 }} />
          <Btn label="." />
          <Btn label="=" style={{ backgroundColor: Colors.primary }} textStyle={{ color: '#FFF' }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  displayContainer: {
    height: 180,
    margin: 20,
    borderRadius: 30,
    padding: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  equationText: { color: 'rgba(255,255,255,0.4)', fontSize: 18, fontFamily: 'SpaceGrotesk_500Medium', marginBottom: 8 },
  displayText: { color: '#FFF', fontSize: 60, fontFamily: 'SpaceGrotesk_700Bold' },

  keypad: { paddingHorizontal: 15, gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
  btn: {
    flex: 1,
    height: (width - 60) / 4,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  btnText: { fontSize: 22, fontFamily: 'SpaceGrotesk_600SemiBold' },
  
  sciBtn: { backgroundColor: 'rgba(0,0,0,0.03)', height: 50, borderRadius: 12 },
  sciText: { fontSize: 14, color: '#666', fontFamily: 'SpaceGrotesk_700Bold' }
});
