import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

export default function ScientificCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isRad, setIsRad] = useState(true);
  const [memory, setMemory] = useState(0);
  const [lastAns, setLastAns] = useState('');
  
  const { colors: GlobalColors, triggerHaptic, effectiveTheme } = useApp();
  const isDark = effectiveTheme === 'dark';
  const toolColors = GlobalColors.tools.scientific;
  const styles = getStyles(toolColors, isDark);

  const factorialize = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const evaluateSci = (expression: string) => {
    try {
      let calcStr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e\^/g, 'Math.exp')
        .replace(/e/g, 'Math.E')
        .replace(/√/g, 'Math.sqrt')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/\^/g, '**');

      // Inverse Trig Support
      calcStr = calcStr
        .replace(/sin⁻¹\(/g, 'Math.asin(')
        .replace(/cos⁻¹\(/g, 'Math.acos(')
        .replace(/tan⁻¹\(/g, 'Math.atan(');

      // Trig fixes
      const trigFix = (fnName: string) => {
        const regex = new RegExp(`Math\\.${fnName}\\(([^)]+)\\)`, 'g');
        calcStr = calcStr.replace(regex, (match, val) => {
          let inner = eval(val);
          if (!isRad) inner = (inner * Math.PI) / 180;
          return `Math.${fnName}(${inner})`;
        });
      };
      trigFix('sin'); trigFix('cos'); trigFix('tan');

      // Inverse Trig fixes Deg to Rad conversion 
      const invTrigFix = (fnName: string) => {
         const regex = new RegExp(`Math\\.${fnName}\\(([^)]+)\\)`, 'g');
         calcStr = calcStr.replace(regex, (match, val) => {
            let res = eval(`Math.${fnName}(${val})`);
            if (!isRad) res = (res * 180) / Math.PI; 
            return res.toString();
         });
      };
      invTrigFix('asin'); invTrigFix('acos'); invTrigFix('atan');

      // Factorial Fix
      calcStr = calcStr.replace(/(\d+)!/g, (match, n) => `factorialize(${n})`);

      // Evaluate
      const calcResult = Function('factorialize', `'use strict'; return (${calcStr})`)(factorialize) as number;
      if (!isFinite(calcResult) || isNaN(calcResult)) throw new Error('Err');
      let finalResult = calcResult.toString();
      if (finalResult.includes('.')) finalResult = parseFloat(finalResult).toFixed(6).replace(/\.?0+$/, '');
      return finalResult;
    } catch { return 'Error'; }
  };

  const handlePress = (value: string) => {
    triggerHaptic();
    if (value === 'AC') { setInput(''); setResult(''); }
    else if (value === 'Back') { setInput(input.slice(0, -1)); }
    else if (value === '=') { 
      const res = evaluateSci(input); 
      setResult(res); 
      if (res !== 'Error') {
        setLastAns(res);
        saveHistory('scientific', input, res);
        scheduleToolNotification('scientific');
        setInput(res); 
      }
    }
    else if (['sin', 'cos', 'tan', 'log', 'ln', '√', 'sin⁻¹', 'cos⁻¹', 'tan⁻¹'].includes(value)) { setInput(prev => prev + value + '('); }
    else if (value === 'x²') { setInput(prev => prev + '^2'); }
    else if (value === 'x³') { setInput(prev => prev + '^3'); }
    else if (value === 'xʸ') { setInput(prev => prev + '^'); }
    else if (value === 'eˣ') { setInput(prev => prev + 'e^('); }
    else if (value === '10ˣ') { setInput(prev => prev + '10^('); }
    else if (value === '1/x') { setInput(prev => prev + '1/('); }
    else if (value === 'n!') { setInput(prev => prev + '!'); }
    else if (value === 'Ans') { setInput(prev => prev + lastAns); }
    else if (value === 'RND') { setInput(prev => prev + Math.random().toFixed(4)); }
    else if (value === 'M+') { const res = evaluateSci(input); if (res !== 'Error') setMemory(prev => prev + parseFloat(res)); }
    else if (value === 'M-') { const res = evaluateSci(input); if (res !== 'Error') setMemory(prev => prev - parseFloat(res)); }
    else if (value === 'MR') { setInput(prev => prev + memory.toString()); }
    else if (value === '±') { setInput(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev); }
    else if (value === 'EXP') { setInput(prev => prev + 'e'); }
    else { setInput(prev => prev + value); }
  };

  const buttons = [
    ['sin', 'cos', 'tan', 'RAD/DEG'],
    ['sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'π', 'e'],
    ['xʸ', 'x³', 'x²', 'eˣ', '10ˣ'],
    ['ʸ√x', '³√x', '√x', 'ln', 'log'],
    ['(', ')', '1/x', '%', 'n!'],
    ['7', '8', '9', '+', 'Back'],
    ['4', '5', '6', '-', 'Ans'],
    ['1', '2', '3', '×', 'M+'],
    ['0', '.', 'EXP', '÷', 'M-'],
    ['±', 'RND', 'AC', '=', 'MR']
  ];

  return (
    <View style={styles.container}>
      <Header title="Scientific Calc" accentColor={toolColors.op} showBack={true} />
      <View style={styles.displayContainer}>
        <Text style={styles.inputText} numberOfLines={2} adjustsFontSizeToFit>{input || '0'}</Text>
        <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>{result}</Text>
      </View>
      <View style={styles.keypad}>
        <ScrollView contentContainerStyle={styles.scrollPad} showsVerticalScrollIndicator={false}>
          {buttons.map((row, rIdx) => (
            <View key={`row-${rIdx}`} style={styles.row}>
              {row.map((btn) => {
                if (btn === 'RAD/DEG') return (
                  <TouchableOpacity key={btn} style={[styles.button, styles.radBtn]} onPress={() => setIsRad(!isRad)}>
                    <Text style={styles.radText}>{isRad ? 'RAD' : 'DEG'}</Text>
                  </TouchableOpacity>
                );
                
                const isOperator = ['÷', '×', '-', '+'].includes(btn);
                const isAction = ['AC', 'Back'].includes(btn);
                const isEq = btn === '=';
                let bgColor = toolColors.num;
                let txtColor = isDark ? '#FFFFFF' : '#000000';
                if (isOperator) { bgColor = toolColors.op; txtColor = '#FFFFFF'; }
                else if (isAction) { bgColor = toolColors.fn; txtColor = isDark ? '#FFFFFF' : '#0077FF'; }
                else if (isEq) { bgColor = toolColors.eq; txtColor = isDark ? '#000000' : '#FFFFFF'; }
                else if (buttons.slice(1, 5).flat().includes(btn)) {
                   bgColor = isDark ? '#2A2A2A' : '#E8E8E8';
                   txtColor = isDark ? '#FFFFFF' : '#333333';
                }

                return (
                  <TouchableOpacity key={btn} style={[styles.button, { backgroundColor: bgColor }]} onPress={() => handlePress(btn)}>
                    <Text style={[styles.buttonText, { color: txtColor }, buttons.slice(1, 5).flat().includes(btn) && styles.sciText]}>{btn}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const getStyles = (colors: any, isDark: boolean) => {
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const screenWidth = Dimensions.get('window').width;
  const btnSize = (screenWidth - 56) / 5;

  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.screen },
    displayContainer: { flex: 1, justifyContent: 'flex-end', padding: 24, backgroundColor: colors.screen },
    inputText: { fontFamily: 'DMSans_700Bold', color: textColor, fontSize: 36, textAlign: 'right', marginBottom: 8 },
    resultText: { fontFamily: 'DMSans_700Bold', color: colors.display, fontSize: 24, textAlign: 'right' },
    keypad: { height: '70%', backgroundColor: colors.screen, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 12, paddingTop: 16 },
    scrollPad: { gap: 8 },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 4 },
    button: { width: btnSize, height: btnSize * 0.75, justifyContent: 'center', alignItems: 'center', borderRadius: 12, elevation: 1 },
    radBtn: { backgroundColor: '#FF9500', width: btnSize, height: btnSize * 0.75, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
    radText: { fontFamily: 'DMSans_700Bold', color: '#FFFFFF', fontSize: 12, textAlign: 'center' },
    buttonText: { fontFamily: 'DMSans_700Bold', fontSize: 20 },
    sciText: { fontSize: 12 }
  });
};
