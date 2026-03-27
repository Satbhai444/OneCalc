import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, SafeAreaView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';

export default function CreditsScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn&apos;t load page", err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#F8FAFC" />
      <Header title="Credits" accentColor="#0A1F44" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.pageHeader}>
          <Text style={styles.headerEmoji}>🏆</Text>
          <Text style={styles.headerTitle}>Credits</Text>
          <Text style={styles.headerSubtitle}>OneCalc wouldn&apos;t exist without these amazing people and tools.</Text>
        </View>

        {/* SECTION 1 — CREATOR */}
        <Text style={styles.sectionHeading}>🎯 CREATED BY</Text>
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>DS</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Darshan Satbhai</Text>
              <Text style={styles.role}>Creator, Designer & Prompt Engineer</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>
            The mind behind OneCalc. Darshan Satbhai conceptualized, designed, and built this entire app using the power of AI prompting — without writing a single line of code manually.
          </Text>
          <Text style={[styles.bodyText, { marginTop: 8 }]}>
            From the initial idea to the final product, every decision, every feature, every color, every user experience detail was crafted by Darshan Satbhai.
          </Text>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.linkRow} onPress={() => openLink('https://daarshannexaa.in')}>
            <MaterialCommunityIcons name="earth" size={20} color="#4A90D9" />
            <Text style={styles.linkText}>daarshannexaa.in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.linkRow, { marginTop: 12 }]} onPress={() => openLink('mailto:darshansatbhai38@gmail.com')}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#4A90D9" />
            <Text style={styles.linkText}>darshansatbhai38@gmail.com</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 2 — DEVELOPMENT */}
        <Text style={styles.sectionHeading}>⚙️ DEVELOPMENT & BUILD</Text>
        
        <View style={styles.card}>
          <View style={styles.cardHeaderSmall}>
            <Text style={{fontSize: 24}}>🤖</Text>
            <View>
              <Text style={styles.cardTitleSmall}>Antigravity</Text>
              <Text style={styles.cardRoleSmall}>AI-Powered Development IDE</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>
            Antigravity is the AI-powered development environment that transformed prompts into a fully functional Android app. Every screen, every component, every line of code in OneCalc was generated and implemented by Antigravity — making it one of the most advanced AI-built apps in India.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderSmall}>
            <Text style={{fontSize: 24}}>🧠</Text>
            <View style={{flex: 1}}>
              <Text style={styles.cardTitleSmall}>Claude AI by Anthropic</Text>
              <Text style={styles.cardRoleSmall}>Strategy, Planning & Prompt Engineering</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>
            Claude AI assisted in the complete planning and strategy of OneCalc. From feature ideation to UI design decisions, color theme selection, UX rules, legal content, and every prompt that brought this app to life — Claude was the strategic backbone of OneCalc&apos;s development.
          </Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.linkRow} onPress={() => openLink('https://anthropic.com')}>
            <MaterialCommunityIcons name="open-in-new" size={18} color="#4A90D9" />
            <Text style={styles.linkText}>anthropic.com</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 3 — TECHNOLOGIES */}
        <Text style={styles.sectionHeading}>📱 BUILT WITH</Text>
        <View style={styles.gridContainer}>
          {[
            { title: 'Expo SDK 54', desc: 'The framework that powers OneCalc on Android' },
            { title: 'React Native', desc: 'Cross-platform mobile development framework by Meta' },
            { title: 'TypeScript', desc: 'Type-safe JavaScript for reliable code' },
            { title: 'Expo Router', desc: 'File-based navigation system for seamless screen transitions' },
            { title: 'AsyncStorage', desc: 'Local data persistence for user preferences and history' },
            { title: 'Expo Haptics', desc: 'Tactile feedback for an immersive user experience' },
            { title: 'Expo Intent Launcher', desc: 'Native Android calendar integration for reminders' },
            { title: 'DM Sans Font', desc: 'Clean, modern typography by Google Fonts' },
            { title: 'Nunito Font', desc: 'Friendly, rounded typography by Google Fonts' },
          ].map((item, index) => (
            <View key={index} style={styles.gridCard}>
              <Text style={styles.gridCardTitle}>{item.title}</Text>
              <Text style={styles.gridCardDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>

        {/* SECTION 4 — APIs & DATA */}
        <Text style={styles.sectionHeading}>🌐 APIS & DATA SOURCES</Text>
        <View style={styles.card}>
          <View style={styles.cardHeaderSmall}>
            <Text style={{fontSize: 24}}>💱</Text>
            <View>
              <Text style={styles.cardTitleSmall}>ExchangeRate API</Text>
              <Text style={styles.cardRoleSmall}>Live Currency Exchange Rates</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>
            OneCalc uses the free ExchangeRate API to fetch real-time currency conversion rates for 15+ currencies. This ensures you always get the most accurate and up-to-date exchange rates.
          </Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.linkRow} onPress={() => openLink('https://exchangerate-api.com')}>
            <MaterialCommunityIcons name="open-in-new" size={18} color="#4A90D9" />
            <Text style={styles.linkText}>exchangerate-api.com</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 5 — DESIGN */}
        <Text style={styles.sectionHeading}>🎨 DESIGN INSPIRATION</Text>
        
        <View style={styles.card}>
          <View style={styles.cardHeaderSmall}>
            <Text style={{fontSize: 24}}>🏀</Text>
            <View>
              <Text style={styles.cardTitleSmall}>Dribbble</Text>
              <Text style={styles.cardRoleSmall}>UI/UX Design Inspiration</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>
            The clean, bold calculator UI design of OneCalc was inspired by amazing designers on Dribbble. The round button style, large display numbers, and minimal layout were all influenced by top-rated calculator designs on the platform.
          </Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.linkRow} onPress={() => openLink('https://dribbble.com')}>
            <MaterialCommunityIcons name="open-in-new" size={18} color="#4A90D9" />
            <Text style={styles.linkText}>dribbble.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderSmall}>
            <Text style={{fontSize: 24}}>🎨</Text>
            <View>
              <Text style={styles.cardTitleSmall}>Coolors</Text>
              <Text style={styles.cardRoleSmall}>Color Palette Generation</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>
            OneCalc&apos;s unique color themes for all 12 calculator tools were crafted using Coolors — the super fast color palette generator. Each tool&apos;s accent color was carefully selected to be visually distinct yet harmonious.
          </Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.linkRow} onPress={() => openLink('https://coolors.co')}>
            <MaterialCommunityIcons name="open-in-new" size={18} color="#4A90D9" />
            <Text style={styles.linkText}>coolors.co</Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 6 — OPEN SOURCE */}
        <Text style={styles.sectionHeading}>💙 OPEN SOURCE LOVE</Text>
        <View style={styles.card}>
          <Text style={styles.bodyText}>
            &quot;OneCalc is built on the shoulders of giants. We are grateful to the entire open source community whose hard work and dedication made this app possible.&quot;
          </Text>
          <Text style={[styles.bodyText, { marginTop: 12, fontFamily: 'DMSans_700Bold' }]}>Special thanks to:</Text>
          <View style={{marginTop: 8, gap: 4}}>
            {['The React Native team at Meta', 'The Expo team for their incredible SDK and tools', 'All npm package maintainers', 'The Google Fonts team', 'The entire JavaScript community'].map((item, i) => (
              <Text key={i} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
        </View>

        {/* SECTION 7 — MADE IN INDIA */}
        <Text style={styles.sectionHeading}>🇮🇳 MADE WITH LOVE IN INDIA</Text>
        <View style={styles.card}>
          <Text style={[styles.bodyText, { textAlign: 'center' }]}>
            OneCalc is proudly made in Ahmedabad, Gujarat, India. 🏙️
          </Text>
          <Text style={[styles.bodyText, { marginTop: 12, textAlign: 'center' }]}>
            This app is a testament to the power of Indian innovation and AI-first development. Built by an Indian developer, for Indian users — and the world.
          </Text>
          <Text style={[styles.bodyText, { marginTop: 16, textAlign: 'center', fontFamily: 'DMSans_700Bold', color: '#0A1F44' }]}>
            Jai Hind! 🇮🇳
          </Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>OneCalc v1.2.0</Text>
          <Text style={styles.footerText}>© 2026 Darshan Satbhai</Text>
          <Text style={styles.footerText}>All Rights Reserved</Text>
          <Text style={[styles.footerText, { marginTop: 8, color: '#4A90D9', fontStyle: 'italic' }]}>&quot;One App. For Every Calculation.&quot;</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC', paddingTop: Platform.OS === 'android' ? 40 : 0 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  
  // Header
  pageHeader: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
  headerEmoji: { fontSize: 40, marginBottom: 8 },
  headerTitle: { fontFamily: 'DMSans_700Bold', fontSize: 24, color: '#0A1F44', marginBottom: 4 },
  headerSubtitle: { fontFamily: 'DMSans_500Medium', fontSize: 14, color: '#7A9BB5', textAlign: 'center', paddingHorizontal: 20 },
  
  sectionHeading: { fontFamily: 'DMSans_700Bold', fontSize: 14, color: '#0A1F44', letterSpacing: 0.5, marginBottom: 12, marginTop: 10 },
  
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#0A1F44',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#0A1F44', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontFamily: 'DMSans_700Bold', fontSize: 24, color: '#4A90D9' },
  profileInfo: { flex: 1 },
  name: { fontFamily: 'DMSans_700Bold', fontSize: 18, color: '#0A1F44', marginBottom: 4 },
  role: { fontFamily: 'DMSans_500Medium', fontSize: 13, color: '#4A90D9' },
  
  bodyText: { fontFamily: 'DMSans_400Regular', fontSize: 14, color: '#7A9BB5', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#F1F5F9', width: '100%', marginVertical: 16 },
  
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  linkText: { fontFamily: 'DMSans_500Medium', fontSize: 14, color: '#4A90D9' },
 

  cardHeaderSmall: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  cardTitleSmall: { fontFamily: 'DMSans_700Bold', fontSize: 16, color: '#0A1F44', marginBottom: 2 },
  cardRoleSmall: { fontFamily: 'DMSans_500Medium', fontSize: 12, color: '#4A90D9' },

  // Grid
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10 },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0A1F44',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  gridCardTitle: { fontFamily: 'DMSans_700Bold', fontSize: 14, color: '#0A1F44', marginBottom: 6 },
  gridCardDesc: { fontFamily: 'DMSans_400Regular', fontSize: 12, color: '#7A9BB5', lineHeight: 18 },

  listItem: { fontFamily: 'DMSans_500Medium', fontSize: 13, color: '#7A9BB5', lineHeight: 20 },

  // Footer
  footer: { alignItems: 'center', marginTop: 20 },
  footerText: { fontFamily: 'DMSans_500Medium', fontSize: 13, color: '#7A9BB5', lineHeight: 20 }
});
