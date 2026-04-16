import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
// TODO: expo-notifications: Remote push notifications not supported in Expo Go as of SDK 53. Use a dev build.
import * as Notifications from 'expo-notifications';
import { useApp } from '../../context/AppContext';

export default function NotificationManager() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [title, setTitle] = useState('Drink Water!');
  const [body, setBody] = useState('Time to stay hydrated 💧');
  const [seconds, setSeconds] = useState('5');

  const scheduleNotification = async () => {
    triggerHaptic();
    const s = parseInt(seconds) || 5;
    
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please enable notifications in settings');
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: { title, body, sound: true },
        trigger: { seconds: s },
      });

      Alert.alert('Success', `Notification scheduled in ${s} seconds!`);
    } catch (e) {
      Alert.alert('Error', 'Could not schedule notification');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: Colors.primary }]}>
         <Text style={styles.cardLabel}>SCHEDULE A REMINDER</Text>
         <Text style={styles.cardInfo}>Test the OneCalc notification engine instantly.</Text>
      </View>

      <View style={styles.form}>
         <Text style={[styles.label, { color: Colors.text }]}>Title</Text>
         <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={title} onChangeText={setTitle} />
         
         <Text style={[styles.label, { color: Colors.text }]}>Message</Text>
         <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={body} onChangeText={setBody} multiline />

         <Text style={[styles.label, { color: Colors.text }]}>Delay (Seconds)</Text>
         <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={seconds} onChangeText={setSeconds} keyboardType="numeric" />
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: '#1E293B' }]} onPress={scheduleNotification}>
         <Text style={styles.btnText}>SCHEDULE NOTIFICATION</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { padding: 30, borderRadius: 24, marginBottom: 30 },
  cardLabel: { color: '#FFF', fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold' },
  cardInfo: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_500Medium', marginTop: 5 },
  form: { gap: 12, marginBottom: 30 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 16, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
  btn: { padding: 20, borderRadius: 20, alignItems: 'center' },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 }
});
