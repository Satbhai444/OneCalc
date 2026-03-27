import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as IntentLauncher from 'expo-intent-launcher';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

export default function AgeCalculator() {
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const [inputMode, setInputMode] = useState<'calendar' | 'manual'>('calendar');
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [showPicker, setShowPicker] = useState(false);

  // Manual Input States
  const [day, setDay] = useState('01');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2000');
  
  const [note, setNote] = useState('');

  useEffect(() => {
    if (inputMode === 'manual') {
      const d = parseInt(day) || 1;
      const m = (parseInt(month) || 1) - 1;
      const y = parseInt(year) || 2000;
      if (y > 1000 && m >= 0 && m <= 11 && d >= 1 && d <= 31) {
        setDate(new Date(y, m, d));
      }
    }
  }, [day, month, year, inputMode]);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setDay(selectedDate.getDate().toString().padStart(2, '0'));
      setMonth((selectedDate.getMonth() + 1).toString().padStart(2, '0'));
      setYear(selectedDate.getFullYear().toString());
    }
  };

  const calculateAge = () => {
    const today = new Date();
    let years = today.getFullYear() - date.getFullYear();
    let months = today.getMonth() - date.getMonth();
    let days = today.getDate() - date.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  };

  const calculateNextBirthday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextBday = new Date(today.getFullYear(), date.getMonth(), date.getDate());
    nextBday.setHours(0, 0, 0, 0);
    
    if (nextBday <= today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diff = nextBday.getTime() - today.getTime();
    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { daysLeft, nextBday };
  };

  const calculateLifeStats = () => {
    const diffTime = Math.abs(new Date().getTime() - date.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (new Date().getFullYear() - date.getFullYear()) * 12 + (new Date().getMonth() - date.getMonth());
    const totalHours = totalDays * 24;
    return { totalDays, totalWeeks, totalMonths, totalHours };
  };

  const getZodiac = (d: number, m: number) => {
    const days = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 22, 22];
    const signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
    return d > days[m - 1] ? signs[m % 12] : signs[m - 1];
  };

  const handleSetReminder = async () => {
    triggerHaptic();
    const { nextBday } = calculateNextBirthday();
    // Set time to 9 AM on the birthday
    nextBday.setHours(9, 0, 0, 0);
    const birthdayTimestamp = nextBday.getTime();

    try {
      if (Platform.OS === 'android') {
        await IntentLauncher.startActivityAsync(
          'android.intent.action.INSERT',
          {
            data: 'content://com.android.calendar/events',
            extra: {
              title: '🎂 My Birthday!',
              description: note || 'Plan a party! (OneCalc Reminder)',
              beginTime: birthdayTimestamp,
              endTime: birthdayTimestamp + 3600000,
              allDay: false, // Setting to false so it has a specific time
              rrule: 'FREQ=YEARLY'
            }
          }
        );
      } else {
        alert("Calendar Reminder only supported on Android via IntentLauncher right now.");
      }
    } catch (e) {
      alert("Failed to open Calendar app.");
    }
  };

  const { years, months, days } = calculateAge();
  const { daysLeft, nextBday } = calculateNextBirthday();
  const { totalDays, totalWeeks, totalMonths, totalHours } = calculateLifeStats();
  const zodiac = getZodiac(date.getDate(), date.getMonth() + 1);

  const triggerSave = () => {
    const dobStr = inputMode === 'calendar' ? date.toLocaleDateString('en-GB') : `${day}/${month}/${year}`;
    saveHistory('age', `DOB: ${dobStr}`, `${years}Y ${months}M ${days}D`);
    scheduleToolNotification('age');
  };

  const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedNextBday = `${nextBday.getDate()} ${monthsNames[nextBday.getMonth()]} ${nextBday.getFullYear()}`;

  return (
    <View style={styles.container}>
      <Header title="Age Calculator" accentColor="#FF6B9D" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        {/* Input Method Toggle */}
        <View style={styles.toggleRow}>
          <TouchableOpacity style={[styles.toggleBtn, inputMode === 'calendar' && styles.toggleBtnActive]} onPress={() => { triggerHaptic(); setInputMode('calendar'); }}>
            <Text style={[styles.toggleText, inputMode === 'calendar' && styles.toggleTextActive]}>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toggleBtn, inputMode === 'manual' && styles.toggleBtnActive]} onPress={() => { triggerHaptic(); setInputMode('manual'); }}>
            <Text style={[styles.toggleText, inputMode === 'manual' && styles.toggleTextActive]}>Manual</Text>
          </TouchableOpacity>
        </View>

        {/* Date Inputs */}
        <View style={styles.card}>
          <Text style={styles.label}>Date of Birth</Text>
          {inputMode === 'calendar' ? (
            <TouchableOpacity style={styles.inputField} onPress={() => setShowPicker(true)}>
              <Text style={styles.inputText}>{date.toLocaleDateString('en-GB')}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.manualInputs}>
              <TextInput style={styles.manualInput} value={day} onChangeText={setDay} keyboardType="numeric" maxLength={2} placeholder="DD" selectionColor="#FF6B9D" onSubmitEditing={triggerSave}/>
              <Text style={styles.dividerSlash}>/</Text>
              <TextInput style={styles.manualInput} value={month} onChangeText={setMonth} keyboardType="numeric" maxLength={2} placeholder="MM" selectionColor="#FF6B9D" onSubmitEditing={triggerSave}/>
              <Text style={styles.dividerSlash}>/</Text>
              <TextInput style={[styles.manualInput, { flex: 1.5 }]} value={year} onChangeText={setYear} keyboardType="numeric" maxLength={4} placeholder="YYYY" selectionColor="#FF6B9D" onSubmitEditing={triggerSave}/>
            </View>
          )}

          {showPicker && (
            <DateTimePicker value={date} mode="date" display="default" maximumDate={new Date()} onChange={onDateChange} />
          )}
        </View>

        {/* Card 1: Your Age */}
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Your Current Age</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
            {years} <Text style={styles.displaySub}>Y</Text> {months} <Text style={styles.displaySub}>M</Text> {days} <Text style={styles.displaySub}>D</Text>
          </Text>
          <View style={styles.zodiacTag}>
             <Text style={styles.zodiacText}>✨ {zodiac}</Text>
          </View>
        </View>

        {/* Card 2: Next Birthday */}
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Next Birthday is in</Text>
          <Text style={[styles.displayText, { color: '#00897B' }]}>{daysLeft} <Text style={styles.displaySub}>Days</Text></Text>
          <View style={styles.divider} />
          <Text style={styles.statLabel}>Exact Date: <Text style={{fontWeight:'bold', color: Colors.text}}>{formattedNextBday}</Text></Text>
        </View>

        {/* Card 3: Life Journey Stats */}
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Your Life Journey</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}><Text style={styles.gridStatValue}>{totalMonths.toLocaleString()}</Text><Text style={styles.gridStatLabel}>Months</Text></View>
            <View style={styles.statBox}><Text style={styles.gridStatValue}>{totalWeeks.toLocaleString()}</Text><Text style={styles.gridStatLabel}>Weeks</Text></View>
            <View style={styles.statBox}><Text style={styles.gridStatValue}>{totalDays.toLocaleString()}</Text><Text style={styles.gridStatLabel}>Days</Text></View>
            <View style={styles.statBox}><Text style={styles.gridStatValue}>{totalHours.toLocaleString()}</Text><Text style={styles.gridStatLabel}>Hours</Text></View>
          </View>
        </View>

        {/* Card 3: Reminder */}
        <View style={styles.card}>
          <Text style={styles.label}>Birthday Reminder</Text>
          <TextInput style={styles.noteInput} value={note} onChangeText={setNote} placeholder="Add a note (optional, e.g., Plan a party)" selectionColor="#FF6B9D" placeholderTextColor="#A0A0A0" />
          <TouchableOpacity style={styles.reminderBtn} onPress={handleSetReminder}>
            <Text style={styles.reminderBtnText}>Set Birthday Reminder</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contentContainer: { padding: 20 },
  toggleRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, backgroundColor: Colors.cardBg, borderWidth: 1, borderColor: Colors.border },
  toggleBtnActive: { backgroundColor: '#FF6B9D', borderColor: '#FF6B9D' },
  toggleText: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 14 },
  toggleTextActive: { color: '#FFFFFF' },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  inputField: { backgroundColor: Colors.background, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: Colors.border },
  inputText: { fontFamily: 'DMSans_700Bold', fontSize: 16, color: Colors.text },
  manualInputs: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  manualInput: { flex: 1, backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 16, borderRadius: 16, padding: 14, textAlign: 'center', borderWidth: 1, borderColor: Colors.border },
  dividerSlash: { fontSize: 20, color: Colors.textMuted },
  displayCard: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border, elevation: 2 },
  displayLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 14, marginBottom: 8 },
  displayText: { fontFamily: 'DMSans_700Bold', color: '#0A1F44', fontSize: 36 },
  displaySub: { fontSize: 18, color: Colors.textMuted },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: 12 },
  statLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 14 },
  noteInput: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_400Regular', fontSize: 14, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border },
  reminderBtn: { backgroundColor: '#FF6B9D', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  reminderBtnText: { fontFamily: 'DMSans_700Bold', color: '#FFFFFF', fontSize: 16 },
  zodiacTag: { backgroundColor: '#FCE4EC', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 12 },
  zodiacText: { fontFamily: 'DMSans_700Bold', color: '#C2185B', fontSize: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, width: '100%', marginTop: 8 },
  statBox: { width: '47%', backgroundColor: Colors.background, padding: 12, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  gridStatValue: { fontFamily: 'DMSans_700Bold', color: '#FF6B9D', fontSize: 16 },
  gridStatLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 11, marginTop: 2 }
});
