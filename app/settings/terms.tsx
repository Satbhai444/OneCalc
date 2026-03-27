import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TermsOfUse() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={28} color="#0A1F44" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.updatedText}>Last updated: March 2026</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.bodyText}>
          By downloading or using OneCalc, you agree to be bound by these Terms of Use. If you do not agree, please do not use the app.
        </Text>

        <Text style={styles.sectionTitle}>2. Description of Service</Text>
        <Text style={styles.bodyText}>
          OneCalc is a free all-in-one calculator application that provides 12 different calculation tools for everyday use.
        </Text>

        <Text style={styles.sectionTitle}>3. Free to Use</Text>
        <Text style={styles.bodyText}>
          OneCalc is completely free. There are no hidden charges, subscriptions, or in-app purchases.
        </Text>

        <Text style={styles.sectionTitle}>4. Accuracy of Calculations</Text>
        <Text style={styles.bodyText}>
          While we strive for accuracy, OneCalc&apos;s calculations should be used for reference purposes only. For critical financial or medical decisions, please consult a qualified professional.
        </Text>

        <Text style={styles.sectionTitle}>5. Currency Rates</Text>
        <Text style={styles.bodyText}>
          Live currency exchange rates are fetched from third-party APIs. OneCalc is not responsible for any inaccuracy in exchange rates.
        </Text>

        <Text style={styles.sectionTitle}>6. Prohibited Use</Text>
        <Text style={styles.bodyText}>
          You may not use OneCalc for any unlawful purpose. You may not attempt to reverse engineer or modify the application.
        </Text>

        <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
        <Text style={styles.bodyText}>
          OneCalc and its original content, features, and design are owned by Darshan Satbhai and are protected by applicable laws.
        </Text>

        <Text style={styles.sectionTitle}>8. Disclaimer of Warranties</Text>
        <Text style={styles.bodyText}>
          OneCalc is provided &quot;as is&quot; without any warranties of any kind, either express or implied.
        </Text>

        <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
        <Text style={styles.bodyText}>
          In no event shall OneCalc or its developer be liable for any indirect, incidental, or consequential damages arising from your use of the app.
        </Text>

        <Text style={styles.sectionTitle}>10. Changes to Terms</Text>
        <Text style={styles.bodyText}>
          We reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance.
        </Text>

        <Text style={styles.sectionTitle}>11. Contact Us</Text>
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
