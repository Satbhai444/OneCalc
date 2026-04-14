import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

const suits = ['heart', 'diamond', 'spade', 'club'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export default function CardPicker() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [card, setCard] = useState({ value: 'A', suit: 'heart' });
  const [picking, setPicking] = useState(false);
  const flipAnim = React.useRef(new Animated.Value(0)).current;

  const pickCard = () => {
    setPicking(true);
    triggerHaptic();
    
    Animated.timing(flipAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start(() => {
      setCard({
        value: values[Math.floor(Math.random() * values.length)],
        suit: suits[Math.floor(Math.random() * suits.length)]
      });
      Animated.timing(flipAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
        setPicking(false);
      });
    });
  };

  const spin = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const isRed = card.suit === 'heart' || card.suit === 'diamond';

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { backgroundColor: '#FFF', transform: [{ rotateY: spin }] }]}>
          <View style={styles.cardHeader}>
             <Text style={[styles.cardValue, { color: isRed ? '#EF4444' : '#111' }]}>{card.value}</Text>
             <MaterialCommunityIcons name={`cards-${card.suit}` as any} size={24} color={isRed ? '#EF4444' : '#111'} />
          </View>
          
          <MaterialCommunityIcons name={`cards-${card.suit}` as any} size={100} color={isRed ? '#EF4444' : '#111'} />

          <View style={[styles.cardFooter, { transform: [{ rotate: '180deg' }] }]}>
             <Text style={[styles.cardValue, { color: isRed ? '#EF4444' : '#111' }]}>{card.value}</Text>
             <MaterialCommunityIcons name={`cards-${card.suit}` as any} size={24} color={isRed ? '#EF4444' : '#111'} />
          </View>
      </Animated.View>

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: Colors.primary }]} 
        onPress={pickCard}
        disabled={picking}
      >
        <Text style={styles.btnText}>{picking ? 'Shuffling...' : 'PICK A CARD'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 450 },
  card: { width: 220, height: 320, borderRadius: 16, padding: 20, justifyContent: 'space-between', alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20 },
  cardHeader: { alignSelf: 'flex-start', alignItems: 'center' },
  cardFooter: { alignSelf: 'flex-start', alignItems: 'center' },
  cardValue: { fontSize: 32, fontFamily: 'SpaceGrotesk_700Bold' },
  btn: { marginTop: 50, paddingHorizontal: 40, paddingVertical: 18, borderRadius: 20 },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18, letterSpacing: 1 },
});
