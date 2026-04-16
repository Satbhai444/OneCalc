import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');

const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};

export default function ScientificCalculator() {
  const { colors: Colors } = useApp();
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState('');
  const [memory, setMemory] = useState(0);
  const [ans, setAns] = useState(0);
  const [isDeg, setIsDeg] = useState(true);

  const calculate = (expr: string) => {
    try {
      // Replace scientific notation, constants and functions
      let processed = expr
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString())
        .replace(/sin\(/g, isDeg ? 'Math.sin(Math.PI/180*' : 'Math.sin(')
        .replace(/cos\(/g, isDeg ? 'Math.cos(Math.PI/180*' : 'Math.cos(')
        .replace(/tan\(/g, isDeg ? 'Math.tan(Math.PI/180*' : 'Math.tan(')
        .replace(/asin\(/g, isDeg ? '(180/Math.PI)*Math.asin(' : 'Math.asin(')
        .replace(/acos\(/g, isDeg ? '(180/Math.PI)*Math.acos(' : 'Math.acos(')
        .replace(/atan\(/g, isDeg ? '(180/Math.PI)*Math.atan(' : 'Math.atan(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**')
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

      // Note: This is a simplified evaluator. For a production app, a robust parser like mathjs is better.
      const result = eval(processed);
      setAns(result);
      return Number.isFinite(result) ? String(parseFloat(result.toFixed(10))) : 'Error';
    } catch {
      return 'Error';
    }
  };

  const handlePress = (key: string) => {
    if (key === 'AC') {
      setDisplay('0');
      setHistory('');
    } else if (key === 'Back') {
      setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (key === '=') {
      setHistory(display + ' =');
      setDisplay(calculate(display));
    } else if (key === 'M+') {
      setMemory(prev => prev + parseFloat(display) || 0);
    } else if (key === 'M-') {
      setMemory(prev => prev - parseFloat(display) || 0);
    } else if (key === 'MR') {
      setDisplay(String(memory));
    } else if (key === 'MC') {
      setMemory(0);
    } else if (key === 'Ans') {
      setDisplay(prev => prev === '0' ? String(ans) : prev + String(ans));
    } else if (key === 'n!') {
      setDisplay(prev => String(factorial(parseFloat(prev) || 0)));
    } else if (key === '±') {
      setDisplay(prev => String(parseFloat(prev) * -1));
    } else if (key === 'RND') {
      setDisplay(String(Math.random().toFixed(5)));
    } else {
      setDisplay(prev => prev === '0' && !'()'.includes(key) ? key : prev + key);
    }
  };

  const Btn = ({ label, style, textStyle, sm }: any) => (
    <TouchableOpacity 
      style={[styles.btn, { backgroundColor: Colors.cardBg, borderColor: Colors.border }, style]}
      onPress={() => handlePress(label)}
    >
      <Text style={[styles.btnText, { color: Colors.text }, sm && { fontSize: 13 }, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={[styles.displayArea, { backgroundColor: Colors.cardBg + '50' }]}>
        <Text style={[styles.historyText, { color: Colors.textMuted }]}>{history}</Text>
        <Text style={[styles.displayText, { color: Colors.text }]} numberOfLines={1} adjustsFontSizeToFit>{display}</Text>
      </View>

      <View style={styles.modeRow}>
        <TouchableOpacity 
          style={[styles.modeBtn, isDeg && { backgroundColor: Colors.primary }]}
          onPress={() => setIsDeg(true)}
        >
          <Text style={[styles.modeText, { color: isDeg ? '#FFF' : Colors.textMuted }]}>Deg</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.modeBtn, !isDeg && { backgroundColor: Colors.primary }]}
          onPress={() => setIsDeg(false)}
        >
          <Text style={[styles.modeText, { color: !isDeg ? '#FFF' : Colors.textMuted }]}>Rad</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.keypad}>
        <View style={styles.row}>
          <Btn label="sin" sm />
          <Btn label="cos" sm />
          <Btn label="tan" sm />
          <Btn label="sin(" sm textStyle={styles.fnText} />
          <Btn label="cos(" sm textStyle={styles.fnText} />
        </View>
        <View style={styles.row}>
          <Btn label="asin(" sm textStyle={styles.fnText} />
          <Btn label="acos(" sm textStyle={styles.fnText} />
          <Btn label="atan(" sm textStyle={styles.fnText} />
          <Btn label="π" />
          <Btn label="e" />
        </View>
        <View style={styles.row}>
          <Btn label="^" sm />
          <Btn label="^3" sm />
          <Btn label="^2" sm />
          <Btn label="e^" sm />
          <Btn label="10^" sm />
        </View>
        <View style={styles.row}>
          <Btn label="√(" sm />
          <Btn label="ln(" sm />
          <Btn label="log(" sm />
          <Btn label="(" />
          <Btn label=")" />
        </View>
        <View style={styles.row}>
          <Btn label="7" />
          <Btn label="8" />
          <Btn label="9" />
          <Btn label="÷" textStyle={styles.opText} />
          <Btn label="Back" sm textStyle={{ color: '#EF4444' }} />
        </View>
        <View style={styles.row}>
          <Btn label="4" />
          <Btn label="5" />
          <Btn label="6" />
          <Btn label="×" textStyle={styles.opText} />
          <Btn label="Ans" sm />
        </View>
        <View style={styles.row}>
          <Btn label="1" />
          <Btn label="2" />
          <Btn label="3" />
          <Btn label="-" textStyle={styles.opText} />
          <Btn label="M+" sm />
        </View>
        <View style={styles.row}>
          <Btn label="0" />
          <Btn label="." />
          <Btn label="EXP" sm />
          <Btn label="+" textStyle={styles.opText} />
          <Btn label="M-" sm />
        </View>
        <View style={styles.row}>
          <Btn label="±" />
          <Btn label="RND" sm />
          <Btn label="AC" textStyle={{ color: '#EF4444' }} />
          <Btn label="=" style={{ backgroundColor: Colors.primary }} textStyle={{ color: '#FFF' }} />
          <Btn label="MR" sm />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  displayArea: { height: 140, borderRadius: 24, padding: 20, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 15, borderWidth: 1, borderColor: 'rgba(0,0,0,0.02)' },
  historyText: { fontSize: 16, fontFamily: 'SpaceGrotesk_500Medium', marginBottom: 4 },
  displayText: { fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold' },
  modeRow: { flexDirection: 'row', gap: 10, marginBottom: 15, justifyContent: 'flex-end' },
  modeBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  modeText: { fontSize: 12, fontFamily: 'SpaceGrotesk_700Bold' },
  keypad: { gap: 8 },
  row: { flexDirection: 'row', gap: 8 },
  btn: { flex: 1, height: (width - 70) / 5, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  btnText: { fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold' },
  opText: { color: '#FF6B35', fontSize: 24 },
  fnText: { color: '#4A90D9', fontSize: 12 }
});

