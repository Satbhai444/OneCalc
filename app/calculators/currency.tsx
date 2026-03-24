import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Modal, Platform } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { Picker } from '@react-native-picker/picker';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';

const CURRENCIES = [
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', rate: 1 },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', rate: 82.5 },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', rate: 89.2 },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rate: 102.4 },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', rate: 0.56 },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', rate: 54.1 },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', rate: 60.8 },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', rate: 11.5 },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', rate: 22.4 },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', rate: 22.0 },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', rate: 61.3 },
  { code: 'NZD', name: 'NZ Dollar', flag: '🇳🇿', rate: 50.7 },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', rate: 4.5 },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺', rate: 0.9 },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', rate: 16.5 },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('INR');
  const [apiRates, setApiRates] = useState<Record<string, number> | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  useEffect(() => {
    loadCachedRates();
    fetchLatestRates();
  }, []);

  const loadCachedRates = async () => {
    try {
      const cached = await AsyncStorage.getItem('@currency_api_rates');
      const cachedTime = await AsyncStorage.getItem('@currency_last_updated');
      if (cached) setApiRates(JSON.parse(cached));
      if (cachedTime) setLastUpdated(cachedTime);
    } catch (e) {
      console.warn("Failed to load cached rates", e);
    }
  };

  const fetchLatestRates = async () => {
    setLoading(true);
    try {
      const resp = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
      const data = await resp.json();
      if (data && data.rates) {
        setApiRates(data.rates);
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastUpdated(timeStr);
        await AsyncStorage.setItem('@currency_api_rates', JSON.stringify(data.rates));
        await AsyncStorage.setItem('@currency_last_updated', timeStr);
        setShowModal(false); // Hide modal on success
      }
    } catch (e) {
      console.log("Offline mode triggers popup");
      setShowModal(true); // Trigger offline modal
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSettings = async () => {
    try {
      if (Platform.OS === 'android') {
        await IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.WIRELESS_SETTINGS);
      } else {
        // iOS Link fallback
        const supported = await Linking.canOpenURL('App-Prefs:root=WIFI');
        if (supported) {
          Linking.openURL('App-Prefs:root=WIFI');
        } else {
          Linking.openURL('app-settings:');
        }
      }
    } catch (err) {
      console.warn("Failed to open settings", err);
    }
  };

  const calculate = () => {
    const amt = parseFloat(amount) || 0;
    
    // If API rates are available, use them (Formula: Amount / RateFrom * RateTo)
    if (apiRates && apiRates[fromCurr] && apiRates[toCurr]) {
      return (amt / apiRates[fromCurr]) * apiRates[toCurr];
    }

    // Fallback to hardcoded rates
    const f = CURRENCIES.find(c => c.code === fromCurr)?.rate || 1;
    const t = CURRENCIES.find(c => c.code === toCurr)?.rate || 1;
    return (amt * f) / t;
  };

  const result = calculate();

  const triggerSave = () => {
    saveHistory('currency', `${amount} ${fromCurr}`, `${result.toFixed(2)} ${toCurr}`);
    scheduleToolNotification('currency');
  };

  return (
    <View style={styles.container}>
      <Header title="Currency Converter" accentColor="#00C853" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.statusRow}>
          {loading ? (
            <ActivityIndicator size="small" color="#00C853" />
          ) : (
            <Text style={styles.statusText}>
              {apiRates ? `Live Rates (${lastUpdated || 'Offline Cache'})` : 'Using Offline Defaults'}
            </Text>
          )}
        </View>

        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Converted Amount</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
            {result.toFixed(2)} <Text style={styles.displaySub}>{toCurr}</Text>
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Amount</Text>
          <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" selectionColor="#00C853" onSubmitEditing={triggerSave}/>

          <View style={styles.row}>
            <View style={{flex:1}}>
              <Text style={styles.label}>From</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={fromCurr} onValueChange={(v) => { triggerHaptic(); setFromCurr(v); }}>
                  {CURRENCIES.map(c => <Picker.Item key={c.code} label={`${c.flag} ${c.code}`} value={c.code} />)}
                </Picker>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.label}>To</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={toCurr} onValueChange={(v) => { triggerHaptic(); setToCurr(v); }}>
                  {CURRENCIES.map(c => <Picker.Item key={c.code} label={`${c.flag} ${c.code}`} value={c.code} />)}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Offline Modal */}
      <Modal visible={showModal} animationType="fade" transparent={true} onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="cloud-offline-outline" size={48} color="#E53935" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>No Internet Connection</Text>
            <Text style={styles.modalText}>
              Connect to the internet to fetch real-time exchange rates.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border }]} onPress={handleOpenSettings}>
                <Text style={[styles.modalBtnText, { color: Colors.text }]}>Settings</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#00C853' }]} onPress={() => { triggerHaptic(); fetchLatestRates(); }}>
                <Text style={[styles.modalBtnText, { color: '#FFF' }]}>Retry</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.modalSubBtn} onPress={() => setShowModal(false)}>
              <Text style={styles.modalSubBtnText}>Continue Offline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contentContainer: { padding: 20, paddingBottom: 40 },
  statusRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
  statusText: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 12 },
  displayCard: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', elevation: 2 },
  displayLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 14, marginBottom: 8 },
  displayText: { fontFamily: 'DMSans_700Bold', color: '#00C853', fontSize: 42 },
  displaySub: { fontSize: 24, color: Colors.textMuted },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border },
  row: { flexDirection: 'row', gap: 12 },
  pickerWrapper: { backgroundColor: Colors.background, borderRadius: 16, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalContainer: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 24, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', elevation: 5 },
  modalTitle: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 18, marginBottom: 8 },
  modalText: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 14, textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  modalActions: { flexDirection: 'row', gap: 12, width: '100%', marginBottom: 16 },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  modalBtnText: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
  modalSubBtn: { paddingVertical: 8 },
  modalSubBtnText: { fontFamily: 'DMSans_700Bold', color: '#00C853', fontSize: 13 }
});
