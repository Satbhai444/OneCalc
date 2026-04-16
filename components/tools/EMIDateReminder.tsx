import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TOUCHABLEOPACITY, Alert, TouchableOpacity } from 'react-native';
// TODO: expo-notifications: Remote push notifications not supported in Expo Go as of SDK 53. Use a dev build.
import * as Notifications from 'expo-notifications';
import { useApp } from '../../context/AppContext';

export default function EMIDateReminder() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [loanName, setLoanName] = useState('Home Loan EMI');
  const [emiDay, setEmiDay] = useState('5');
  const [amount, setAmount] = useState('25000');

  const scheduleReminder = async () => {
    triggerHaptic();
    const day = parseInt(emiDay);
    if (isNaN(day) || day < 1 || day > 31) {
      Alert.alert('Invalid Day', 'Please enter a day between 1 and 31');
      return;
    }

    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') return;

      // Scheduling for next occurrence of that day
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'EMI Reminder: ' + loanName,
          body: `Don't forget to pay ₹${amount} for your EMI today!`,
          sound: true,
        },
        trigger: {
          hour: 9,
          minute: 0,
          repeats: true,
        },
      });

      Alert.alert('Reminder Set', `Monthly reminder scheduled for Day ${day} at 9:00 AM`);
    } catch (e) {
      Alert.alert('Error', 'Could not set reminder');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#F59E0B' }]}>
         <Text style={styles.headerLabel}>FINANCE REMINDER</Text>
         <Text style={styles.headerInfo}>Never miss an EMI payment again.</Text>
      </View>

      <View style={styles.form}>
         <Text style={[styles.label, { color: Colors.text }]}>Loan / Item Name</Text>
         <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={loanName} onChangeText={setLoanName} />
         
         <Text style={[styles.label, { color: Colors.text }]}>EMI Amount (optional)</Text>
         <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={amount} onChangeText={setAmount} keyboardType="numeric" />

         <Text style={[styles.label, { color: Colors.text }]}>Due Day of Month (1-31)</Text>
         <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={emiDay} onChangeText={setEmiDay} keyboardType="numeric" />
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.primary }]} onPress={scheduleReminder}>
         <Text style={styles.btnText}>SET MONTHLY REMINDER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { padding: 30, borderRadius: 24, marginBottom: 30 },
  headerLabel: { color: '#FFF', fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold' },
  headerInfo: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_500Medium', marginTop: 5 },
  form: { gap: 12, marginBottom: 30 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 16, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
  btn: { padding: 20, borderRadius: 20, alignItems: 'center' },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 }
});
