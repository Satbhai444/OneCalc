import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default function AgreementScreen() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleContinue = async () => {
    if (!accepted) return;
    try {
      await AsyncStorage.setItem('agreement_accepted', 'true');
      router.replace('/permissions');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        {/* Header Logo */}
        <View style={styles.header}>
          <View style={styles.iconSquare}>
            <Text style={styles.iconText}>1C</Text>
          </View>
          <Text style={styles.title}>Welcome to OneCalc</Text>
        </View>

        {/* Scrollable Terms */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.termsTitle}>TERMS OF USE & PRIVACY POLICY</Text>
          
          <Text style={styles.termsBody}>
            By using OneCalc, you agree to:
          </Text>
          
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• OneCalc is free for personal use only</Text>
            <Text style={styles.bulletItem}>• We do not collect any personal data</Text>
            <Text style={styles.bulletItem}>• All calculations stored locally only</Text>
            <Text style={styles.bulletItem}>• Currency rates fetched from internet</Text>
            <Text style={styles.bulletItem}>• App provided as is without warranties</Text>
          </View>
          
          <Text style={styles.termsFooter}>
            For full terms visit Settings → Legal
          </Text>
        </ScrollView>

        {/* Bottom Action Area */}
        <View style={styles.bottomArea}>
          <TouchableOpacity 
            style={styles.radioRow} 
            activeOpacity={0.7} 
            onPress={() => setAccepted(!accepted)}
          >
            <MaterialCommunityIcons 
              name={accepted ? "radiobox-marked" : "radiobox-blank"} 
              size={24} 
              color={accepted ? "#0A1F44" : "#7A9BB5"} 
            />
            <Text style={styles.radioText}>
              I have read and agree to Terms of Use & Privacy Policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: accepted ? '#0A1F44' : '#D4D4D4' }]} 
            activeOpacity={accepted ? 0.7 : 1}
            onPress={handleContinue}
          >
            <Text style={styles.btnText}>Accept & Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? 40 : 0
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  iconSquare: {
    width: 64,
    height: 64,
    backgroundColor: '#0A1F44',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  iconText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
  },
  title: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    color: '#AB3500',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D8E4F0',
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  termsTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    color: '#191C1D',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  termsBody: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 14,
    color: '#596062',
    marginBottom: 12,
  },
  bulletList: {
    paddingLeft: 4,
    marginBottom: 20,
    gap: 8,
  },
  bulletItem: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 14,
    color: '#596062',
    lineHeight: 22,
  },
  termsFooter: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 13,
    color: '#AB3500',
    marginTop: 10,
    fontStyle: 'italic',
  },
  bottomArea: {
    gap: 20,
    paddingBottom: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 20,
  },
  radioText: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 14,
    color: '#191C1D',
    flex: 1,
    lineHeight: 20,
  },
  btn: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  btnText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
  }
});
