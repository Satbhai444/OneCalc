import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PrivacyPolicy() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={28} color="#0A1F44" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.updatedText}>Last updated: March 2026</Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.bodyText}>
          OneCalc ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our mobile application OneCalc.
        </Text>

        <Text style={styles.sectionTitle}>2. Information We Do NOT Collect</Text>
        <Text style={styles.bodyText}>
          OneCalc does not collect, store, or transmit any personal information. We do not require you to create an account. We do not track your location. We do not access your contacts, camera, or microphone.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Storage</Text>
        <Text style={styles.bodyText}>
          All your calculations and preferences are stored locally on your device only. We have no access to this data.
        </Text>

        <Text style={styles.sectionTitle}>4. Internet Usage</Text>
        <Text style={styles.bodyText}>
          OneCalc uses internet connection only for the Currency Converter feature to fetch live exchange rates. No personal data is sent during this process.
        </Text>

        <Text style={styles.sectionTitle}>5. Third Party Services</Text>
        <Text style={styles.bodyText}>
          OneCalc does not use any third-party analytics, advertising, or tracking services.
        </Text>

        <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
        <Text style={styles.bodyText}>
          OneCalc is safe for all ages. We do not knowingly collect any information from children under 13.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
        <Text style={styles.bodyText}>
          We may update this Privacy Policy from time to time. We will notify you of any changes by updating the date at the top.
        </Text>

        <Text style={styles.sectionTitle}>8. Contact Us</Text>
        <Text style={styles.bodyText}>onecalc.app@gmail.com</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#D8E4F0', backgroundColor: '#FFFFFF' },
  backBtn: { padding: 8 },
  headerTitle: { fontFamily: 'DMSans_700Bold', fontSize: 18, color: '#0A1F44' },
  scrollContent: { padding: 24 },
  updatedText: { fontFamily: 'DMSans_500Medium', fontSize: 13, color: '#7A9BB5', marginBottom: 24 },
  sectionTitle: { fontFamily: 'DMSans_700Bold', fontSize: 16, color: '#0A1F44', marginTop: 20, marginBottom: 8 },
  bodyText: { fontFamily: 'DMSans_400Regular', fontSize: 14, color: '#7A9BB5', lineHeight: 22, marginBottom: 12 }
});
