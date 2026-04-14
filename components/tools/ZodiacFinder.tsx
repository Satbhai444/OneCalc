import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '../../context/AppContext';

export default function ZodiacFinder() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [zodiac, setZodiac] = useState<{ name: string, icon: string } | null>(null);

  const getZodiac = (d: Date) => {
    const month = d.getMonth() + 1;
    const day = d.getDate();
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: "Aquarius", icon: "♒" };
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return { name: "Pisces", icon: "♓" };
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: "Aries", icon: "♈" };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: "Taurus", icon: "♉" };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: "Gemini", icon: "♊" };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: "Cancer", icon: "♋" };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: "Leo", icon: "♌" };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: "Virgo", icon: "♍" };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: "Libra", icon: "♎" };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: "Scorpio", icon: "♏" };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: "Sagittarius", icon: "♐" };
    return { name: "Capricorn", icon: "♑" };
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      triggerHaptic();
      setZodiac(getZodiac(selectedDate));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors.text }]}>Find Your Sign</Text>
      
      <TouchableOpacity style={[styles.datePicker, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]} onPress={() => setShow(true)}>
         <Text style={[styles.dateText, { color: Colors.text }]}>{date.toDateString()}</Text>
         <Text style={[styles.label, { color: Colors.primary }]}>SELECT BIRTHDATE</Text>
      </TouchableOpacity>

      {zodiac && (
        <View style={[styles.result, { backgroundColor: Colors.primary + '10' }]}>
           <Text style={styles.icon}>{zodiac.icon}</Text>
           <Text style={[styles.name, { color: Colors.text }]}>{zodiac.name}</Text>
        </View>
      )}

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, marginBottom: 40 },
  datePicker: { width: '100%', padding: 30, borderRadius: 24, borderWidth: 1, alignItems: 'center', gap: 10 },
  dateText: { fontSize: 20, fontFamily: 'SpaceGrotesk_700Bold' },
  label: { fontSize: 12, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1 },
  result: { marginTop: 40, width: '100%', padding: 40, borderRadius: 32, alignItems: 'center' },
  icon: { fontSize: 80, marginBottom: 10 },
  name: { fontSize: 32, fontFamily: 'SpaceGrotesk_700Bold' }
});
