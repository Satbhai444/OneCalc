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
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', rate: 0.012 },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', rate: 0.011 },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rate: 0.0094 },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', rate: 1.81 },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', rate: 0.018 },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', rate: 0.016 },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', rate: 0.086 },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', rate: 0.044 },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', rate: 0.045 },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', rate: 0.016 },
  { code: 'NZD', name: 'NZ Dollar', flag: '🇳🇿', rate: 0.020 },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', rate: 0.22 },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺', rate: 1.12 },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', rate: 0.062 },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭', rate: 0.011 },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰', rate: 0.094 },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪', rate: 0.13 },
  { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷', rate: 16.1 },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴', rate: 0.13 },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽', rate: 0.20 },
  { code: 'TWD', name: 'Taiwan Dollar', flag: '🇹🇼', rate: 0.38 },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰', rate: 0.084 },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱', rate: 0.048 },
  { code: 'THB', name: 'Thai Baht', flag: '🇹🇭', rate: 0.44 },
  { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩', rate: 190.2 },
  { code: 'HUF', name: 'Hungarian Forint', flag: '🇭🇺', rate: 4.41 },
  { code: 'CZK', name: 'Czech Koruna', flag: '🇨🇿', rate: 0.28 },
  { code: 'ILS', name: 'Israeli Shekel', flag: '🇮🇱', rate: 0.044 },
  { code: 'CLP', name: 'Chilean Peso', flag: '🇨🇱', rate: 11.2 },
  { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭', rate: 0.67 },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾', rate: 0.057 },
  { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰', rate: 3.35 },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩', rate: 1.32 },
  { code: 'VND', name: 'Vietnamese Dong', flag: '🇻🇳', rate: 297.8 },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷', rate: 0.39 },
  { code: 'KWD', name: 'Kuwaiti Dinar', flag: '🇰🇼', rate: 0.0037 },
  { code: 'OMR', name: 'Omani Rial', flag: '🇴🇲', rate: 0.0046 },
  { code: 'BHD', name: 'Bahraini Dinar', flag: '🇧🇭', rate: 0.0045 },
  { code: 'QAR', name: 'Qatari Rial', flag: '🇶🇦', rate: 0.044 },
  { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬', rate: 0.58 },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', rate: 18.2 },
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪', rate: 1.58 },
  { code: 'LKR', name: 'Sri Lankan Rupee', flag: '🇱🇰', rate: 3.65 },
  { code: 'AFN', name: 'Afghan Afghani', flag: '🇦🇫', rate: 0.84 },
  { code: 'ALL', name: 'Albanian Lek', flag: '🇦🇱', rate: 1.13 },
  { code: 'AMD', name: 'Armenian Dram', flag: '🇦🇲', rate: 4.82 },
  { code: 'ANG', name: 'Guelder', flag: '🇳🇱', rate: 0.022 },
  { code: 'AOA', name: 'Angolan Kwanza', flag: '🇦🇴', rate: 10.1 },
  { code: 'ARS', name: 'Argentine Peso', flag: '🇦🇷', rate: 10.5 },
  { code: 'AWG', name: 'Aruban Florin', flag: '🇦🇼', rate: 0.022 },
  { code: 'AZN', name: 'Azerbaijani Manat', flag: '🇦🇿', rate: 0.021 },
  { code: 'BAM', name: 'Bosnia Mark', flag: '🇧🇦', rate: 0.022 },
  { code: 'BBD', name: 'Barbadian Dollar', flag: '🇧🇧', rate: 0.024 },
  { code: 'BGN', name: 'Bulgarian Lev', flag: '🇧🇬', rate: 0.022 },
  { code: 'BIF', name: 'Burundian Franc', flag: '🇧🇮', rate: 34.5 },
  { code: 'BMD', name: 'Bermudan Dollar', flag: '🇧🇲', rate: 0.012 },
  { code: 'BND', name: 'Brunei Dollar', flag: '🇧🇳', rate: 0.016 },
  { code: 'BOB', name: 'Bolivian Boliviano', flag: '🇧🇴', rate: 0.084 },
  { code: 'BSD', name: 'Bahamian Dollar', flag: '🇧🇸', rate: 0.012 },
  { code: 'BTN', name: 'Bhutanese Ngultrum', flag: '🇧🇹', rate: 1 },
  { code: 'BWP', name: 'Botswanan Pula', flag: '🇧🇼', rate: 0.16 },
  { code: 'BYN', name: 'Belarusian Ruble', flag: '🇧🇾', rate: 0.039 },
  { code: 'BZD', name: 'Belize Dollar', flag: '🇧🇿', rate: 0.024 },
  { code: 'CDF', name: 'Congolese Franc', flag: '🇨🇩', rate: 33.5 },
  { code: 'CLF', name: 'Chilean Unit of Account', flag: '🇨🇱', rate: 0.0004 },
  { code: 'COP', name: 'Colombian Peso', flag: '🇨🇴', rate: 48.5 },
  { code: 'CRC', name: 'Costa Rican Colón', flag: '🇨🇷', rate: 6.2 },
  { code: 'CUP', name: 'Cuban Peso', flag: '🇨🇺', rate: 0.29 },
  { code: 'CVE', name: 'Cape Verdean Escudo', flag: '🇨🇻', rate: 1.25 },
  { code: 'DJF', name: 'Djiboutian Franc', flag: '🇩🇯', rate: 2.15 },
  { code: 'DOP', name: 'Dominican Peso', flag: '🇩🇴', rate: 0.72 },
  { code: 'DZD', name: 'Algerian Dinar', flag: '🇩🇿', rate: 1.62 },
  { code: 'ERN', name: 'Eritrean Nakfa', flag: '🇪🇷', rate: 0.18 },
  { code: 'ETB', name: 'Ethiopian Birr', flag: '🇪🇹', rate: 0.68 },
  { code: 'FJD', name: 'Fijian Dollar', flag: '🇫🇯', rate: 0.027 },
  { code: 'FKP', name: 'Falkland Islands Pound', flag: '🇫🇰', rate: 0.0094 },
  { code: 'GEL', name: 'Georgian Lari', flag: '🇬🇪', rate: 0.032 },
  { code: 'GGP', name: 'Guernsey Pound', flag: '🇬🇬', rate: 0.0094 },
  { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭', rate: 0.14 },
  { code: 'GIP', name: 'Gibraltar Pound', flag: '🇬🇮', rate: 0.0094 },
  { code: 'GMD', name: 'Gambian Dalasi', flag: '🇬🇲', rate: 0.81 },
  { code: 'GNF', name: 'Guinean Franc', flag: '🇬🇳', rate: 104.5 },
  { code: 'GTQ', name: 'Guatemalan Quetzal', flag: '🇬🇹', rate: 0.094 },
  { code: 'GYD', name: 'Guyanese Dollar', flag: '🇬🇾', rate: 2.52 },
  { code: 'HNL', name: 'Honduran Lempira', flag: '🇭🇳', rate: 0.30 },
  { code: 'HRK', name: 'Croatian Kuna', flag: '🇭🇷', rate: 0.084 },
  { code: 'HTG', name: 'Haitian Gourde', flag: '🇭🇹', rate: 1.62 },
  { code: 'IQD', name: 'Iraqi Dinar', flag: '🇮🇶', rate: 15.8 },
  { code: 'IRR', name: 'Iranian Rial', flag: '🇮🇷', rate: 508.5 },
  { code: 'ISK', name: 'Icelandic Króna', flag: '🇮🇸', rate: 1.68 },
  { code: 'JEP', name: 'Jersey Pound', flag: '🇯🇪', rate: 0.0094 },
  { code: 'JMD', name: 'Jamaican Dollar', flag: '🇯🇲', rate: 1.88 },
  { code: 'JOD', name: 'Jordanian Dinar', flag: '🇯🇴', rate: 0.0085 },
  { code: 'KGS', name: 'Kyrgystani Som', flag: '🇰🇬', rate: 1.08 },
  { code: 'KHR', name: 'Cambodian Riel', flag: '🇰🇭', rate: 49.5 },
  { code: 'KMF', name: 'Comorian Franc', flag: '🇰🇲', rate: 5.42 },
  { code: 'KZT', name: 'Kazakhstani Tenge', flag: '🇰🇿', rate: 5.45 },
  { code: 'LAK', name: 'Laotian Kip', flag: '🇱🇦', rate: 252.5 },
  { code: 'LBP', name: 'Lebanese Pound', flag: '🇱🇧', rate: 181.5 },
  { code: 'LRD', name: 'Liberian Dollar', flag: '🇱🇷', rate: 2.22 },
  { code: 'LSL', name: 'Lesotho Loti', flag: '🇱🇸', rate: 0.22 },
  { code: 'LYD', name: 'Libyan Dinar', flag: '🇱🇾', rate: 0.058 },
  { code: 'MAD', name: 'Moroccan Dirham', flag: '🇲🇦', rate: 0.12 },
  { code: 'MDL', name: 'Moldovan Leu', flag: '🇲🇩', rate: 0.22 },
  { code: 'MGA', name: 'Malagasy Ariary', flag: '🇲🇬', rate: 54.5 },
  { code: 'MKD', name: 'Macedonian Denar', flag: '🇲🇰', rate: 0.70 },
  { code: 'MMK', name: 'Myanmar Kyat', flag: '🇲🇲', rate: 25.4 },
  { code: 'MNT', name: 'Mongolian Tugrik', flag: '🇲🇳', rate: 41.8 },
  { code: 'MOP', name: 'Macanese Pataca', flag: '🇲🇴', rate: 0.096 },
  { code: 'MRU', name: 'Mauritanian Ouguiya', flag: '🇲🇷', rate: 0.48 },
  { code: 'MUR', name: 'Mauritian Rupee', flag: '🇲🇺', rate: 0.55 },
  { code: 'MVR', name: 'Maldivian Rufiyaa', flag: '🇲🇻', rate: 0.18 },
  { code: 'MWK', name: 'Malawian Kwacha', flag: '🇲🇼', rate: 20.8 },
  { code: 'MZN', name: 'Mozambican Metical', flag: '🇲🇿', rate: 0.76 },
  { code: 'NAD', name: 'Namibian Dollar', flag: '🇳🇦', rate: 0.22 },
  { code: 'NIO', name: 'Nicaraguan Córdoba', flag: '🇳🇮', rate: 0.44 },
  { code: 'NPR', name: 'Nepalese Rupee', flag: '🇳🇵', rate: 1.60 },
  { code: 'PAB', name: 'Panamanian Balboa', flag: '🇵🇦', rate: 0.012 },
  { code: 'PEN', name: 'Peruvian Sol', flag: '🇵🇪', rate: 0.045 },
  { code: 'PGK', name: 'Papua New Guinean Kina', flag: '🇵🇬', rate: 0.046 },
  { code: 'PYG', name: 'Paraguayan Guarani', flag: '🇵🇾', rate: 88.5 },
  { code: 'RON', name: 'Romanian Leu', flag: '🇷🇴', rate: 0.055 },
  { code: 'RSD', name: 'Serbian Dinar', flag: '🇷🇸', rate: 1.28 },
  { code: 'RWF', name: 'Rwandan Franc', flag: '🇷🇼', rate: 15.5 },
  { code: 'SBD', name: 'Solomon Islands Dollar', flag: '🇸🇧', rate: 0.10 },
  { code: 'SCR', name: 'Seychellois Rupee', flag: '🇸🇨', rate: 0.16 },
  { code: 'SDG', name: 'Sudanese Pound', flag: '🇸🇩', rate: 7.22 },
  { code: 'SHP', name: 'Saint Helena Pound', flag: '🇸🇭', rate: 0.0094 },
  { code: 'SLL', name: 'Sierra Leonean Leone', flag: '🇸🇱', rate: 252.5 },
  { code: 'SOS', name: 'Somali Shilling', flag: '🇸🇴', rate: 6.85 },
  { code: 'SRD', name: 'Surinamese Dollar', flag: '🇸🇷', rate: 0.45 },
  { code: 'SSP', name: 'South Sudanese Pound', flag: '🇸🇸', rate: 1.58 },
  { code: 'STN', name: 'São Tomé Dobra', flag: '🇸🇹', rate: 0.27 },
  { code: 'SYP', name: 'Syrian Pound', flag: '🇸🇾', rate: 30.2 },
  { code: 'SZL', name: 'Swazi Lilangeni', flag: '🇸🇿', rate: 0.22 },
  { code: 'TJS', name: 'Tajikistani Somoni', flag: '🇹🇯', rate: 0.13 },
  { code: 'TMT', name: 'Turkmenistani Manat', flag: '🇹🇲', rate: 0.042 },
  { code: 'TND', name: 'Tunisian Dinar', flag: '🇹🇳', rate: 0.038 },
  { code: 'TOP', name: 'Tongan Paʻanga', flag: '🇹🇴', rate: 0.028 },
  { code: 'TTD', name: 'Trinidad and Tobago Dollar', flag: '🇹🇹', rate: 0.081 },
  { code: 'TZS', name: 'Tanzanian Shilling', flag: '🇹🇿', rate: 30.5 },
  { code: 'UAH', name: 'Ukrainian Hryvnia', flag: '🇺🇦', rate: 0.45 },
  { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬', rate: 45.8 },
  { code: 'UYU', name: 'Uruguayan Peso', flag: '🇺🇾', rate: 0.47 },
  { code: 'UZS', name: 'Uzbekistani Som', flag: '🇺🇿', rate: 152.5 },
  { code: 'VES', name: 'Venezuelan Bolívar', flag: '🇻🇪', rate: 0.44 },
  { code: 'VUV', name: 'Vanuatu Vatu', flag: '🇻🇺', rate: 1.45 },
  { code: 'WST', name: 'Samoan Tala', flag: '🇼🇸', rate: 0.033 },
  { code: 'XAF', name: 'Central African CFA Franc', flag: '🇨🇲', rate: 7.35 },
  { code: 'XCD', name: 'East Caribbean Dollar', flag: '🇦🇬', rate: 0.032 },
  { code: 'XOF', name: 'West African CFA Franc', flag: '🇸🇳', rate: 7.35 },
  { code: 'XPF', name: 'CFP Franc', flag: '🇵🇫', rate: 1.33 },
  { code: 'YER', name: 'Yemeni Rial', flag: '🇾🇪', rate: 3.02 },
  { code: 'ZMW', name: 'Zambian Kwacha', flag: '🇿🇲', rate: 0.32 },
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
    const timer = setTimeout(() => {
       fetchLatestRates(false);
    }, 1000);
    return () => clearTimeout(timer);
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

  const fetchLatestRates = async (showModalOnFail = true) => {
    if (loading) return;
    setLoading(true);
    triggerHaptic();
    try {
      const resp = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
      const data = await resp.json();
      if (data && data.rates) {
        setApiRates(data.rates);
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastUpdated(timeStr);
        await AsyncStorage.setItem('@currency_api_rates', JSON.stringify(data.rates));
        await AsyncStorage.setItem('@currency_last_updated', timeStr);
        setShowModal(false);
      }
    } catch (e) {
      console.log("Network error fetching rates");
      if (showModalOnFail) setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSettings = async () => {
    try {
      if (Platform.OS === 'android') {
        await IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.WIRELESS_SETTINGS);
      } else {
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
    if (apiRates && apiRates[fromCurr] && apiRates[toCurr]) {
      return (amt / apiRates[fromCurr]) * apiRates[toCurr];
    }
    const f = CURRENCIES.find(c => c.code === fromCurr)?.rate || 1;
    const t = CURRENCIES.find(c => c.code === toCurr)?.rate || 1;
    return amt * (f / t);
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
          <Ionicons name="time-outline" size={14} color={Colors.textMuted} style={{ marginRight: 4 }} />
          <Text style={styles.statusText}>
            {apiRates ? `Live Rates (${lastUpdated || 'Offline Cache'})` : 'Using Offline Defaults'}
          </Text>
          <TouchableOpacity onPress={() => fetchLatestRates(true)} style={styles.refreshBtn}>
            {loading ? (
              <ActivityIndicator size="small" color="#00C853" />
            ) : (
              <Ionicons name="refresh" size={16} color="#00C853" />
            )}
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
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
                <Picker selectedValue={fromCurr} onValueChange={(v: string) => { triggerHaptic(); setFromCurr(v); }}>
                  {CURRENCIES.map(c => <Picker.Item key={c.code} label={`${c.flag} ${c.code}`} value={c.code} />)}
                </Picker>
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.label}>To</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={toCurr} onValueChange={(v: string) => { triggerHaptic(); setToCurr(v); }}>
                  {CURRENCIES.map(c => <Picker.Item key={c.code} label={`${c.flag} ${c.code}`} value={c.code} />)}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

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
  statusRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  statusText: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 12 },
  refreshBtn: { marginLeft: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, borderWidth: 1, borderColor: Colors.border },
  refreshText: { fontFamily: 'DMSans_700Bold', color: '#00C853', fontSize: 11, marginLeft: 4 },
  displayCard: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', elevation: 2 },
  displayLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 14, marginBottom: 8 },
  displayText: { fontFamily: 'DMSans_700Bold', color: '#00C853', fontSize: 42 },
  displaySub: { fontSize: 24, color: Colors.textMuted },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border },
  row: { flexDirection: 'row', gap: 12 },
  pickerWrapper: { backgroundColor: Colors.background, borderRadius: 16, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
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
