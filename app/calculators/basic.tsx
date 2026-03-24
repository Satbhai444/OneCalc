import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, useWindowDimensions } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

const CalcButton = ({ label, onPress, containerStyle, textStyle, isPill = false, btnWidth, btnHeight }: any) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, { toValue: 0.92, useNativeDriver: true, speed: 100 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, friction: 3 }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }], width: isPill ? btnWidth * 2 + 12 : btnWidth, height: btnHeight }, containerStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[
          styles.button, 
          { backgroundColor: textStyle.backgroundColor, height: btnHeight, borderRadius: btnHeight / 2 },
          isPill && styles.pillButton
        ]}
      >
        <Text style={[styles.buttonText, { color: textStyle.color, lineHeight: btnHeight }]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function BasicCalculator() {
  const { width } = useWindowDimensions();
  const [input, setInput] = useState('');
  const [secondary, setSecondary] = useState('');
  const { effectiveTheme, triggerHaptic } = useApp();
  const isDark = effectiveTheme === 'dark';

  // Math sizing
  const gap = 12;
  const padding = 16;
  const btnWidth = (width - (padding * 2) - (gap * 3)) / 4;
  const btnHeight = btnWidth; // Perfect Circle

  // Local Color Settings
  const themeColors = {
    bg: isDark ? '#000000' : '#F2F2F7',
    text: isDark ? '#FFFFFF' : '#000000',
    muted: isDark ? '#8E8E93' : '#8E8E93',
    numBtn: isDark ? '#333333' : '#FFFFFF',
    numText: isDark ? '#FFFFFF' : '#000000',
    fnBtn: isDark ? '#252525' : '#D4D4D4',
    fnText: isDark ? '#FFFFFF' : '#000000',
    opBtn: isDark ? '#252525' : '#D4D4D4',
    opText: isDark ? '#FFFFFF' : '#000000',
    eqBtn: isDark ? '#FFD60A' : '#000000',
    eqText: isDark ? '#000000' : '#FFFFFF',
    shadow: isDark ? 'transparent' : 'rgba(0,0,0,0.06)'
  };

  const handlePress = async (value: string) => {
    triggerHaptic();
    if (value === 'AC') {
      setInput('');
      setSecondary('');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1));
    } else if (value === '±') {
      if (!input) return;
      if (input.startsWith('-')) setInput(input.substring(1));
      else setInput('-' + input);
    } else if (value === '=') {
      try {
        const calcStr = input.replace(/×/g, '*').replace(/÷/g, '/');
        const calcResult = Function(`'use strict'; return (${calcStr})`)();
        setSecondary(input + ' =');
        setInput(calcResult.toString());
        await saveHistory('basic', input, calcResult.toString());
        scheduleToolNotification('basic');
      } catch {
        setInput('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <Header title="Basic Calculator" accentColor="#0A1F44" showBack={true} />
      
      {/* Display on Top */}
      <View style={styles.displayContainer}>
        <Text style={[styles.inputText, { color: themeColors.text }]} numberOfLines={1} adjustsFontSizeToFit>
          {input || '0'}
        </Text>
        {secondary ? <Text style={[styles.secondaryText, { color: themeColors.muted }]}>{secondary}</Text> : null}
      </View>

      {/* Keypad on Bottom */}
      <View style={[styles.keypad, { padding }]}>
        {buttons.map((row, rIdx) => (
          <View key={rIdx} style={[styles.row, { gap }]}>
            {row.map((btn) => {
              const isOperator = ['÷', '×', '-', '+'].includes(btn);
              const isFn = ['AC', '±', '%'].includes(btn);
              const isEq = btn === '=';
              const isPill = btn === '0';

              let bgColor = themeColors.numBtn;
              let textColor = themeColors.numText;

              if (isFn) { bgColor = themeColors.fnBtn; textColor = themeColors.fnText; }
              else if (isOperator) { bgColor = themeColors.opBtn; textColor = themeColors.opText; }
              else if (isEq) { bgColor = themeColors.eqBtn; textColor = themeColors.eqText; }

              return (
                <CalcButton
                  key={btn}
                  label={btn}
                  isPill={isPill}
                  btnWidth={btnWidth}
                  btnHeight={btnHeight}
                  onPress={() => handlePress(btn)}
                  containerStyle={[styles.buttonWrapper, { shadowColor: themeColors.shadow }]}
                  textStyle={{ backgroundColor: bgColor, color: textColor }}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  displayContainer: { 
    flex: 1, 
    minHeight: 180, 
    maxHeight: 220, 
    justifyContent: 'flex-start', 
    alignItems: 'flex-end', 
    padding: 24, 
    paddingTop: 40 
  },
  secondaryText: { fontFamily: 'DMSans_500Medium', fontSize: 20, marginTop: 4 },
  inputText: { fontFamily: 'DMSans_700Bold', fontSize: 64, textAlign: 'right' },
  keypad: { gap: 12 },
  row: { flexDirection: 'row' },
  buttonWrapper: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1, shadowRadius: 3, elevation: 1
  },
  button: {
    justifyContent: 'center', alignItems: 'center'
  },
  pillButton: {
    paddingLeft: 24, alignItems: 'flex-start'
  },
  buttonText: {
    fontFamily: 'DMSans_700Bold', fontSize: 28, width: '100%', height: '100%',
    textAlign: 'center'
  }
});
