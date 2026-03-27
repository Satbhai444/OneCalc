import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, SafeAreaView, Platform , Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import Header from '../components/Header';

export default function AboutDeveloperScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#F8FAFC" />
      <Header title="About Developer" accentColor="#0A1F44" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* SECTION 1 — PROFILE CARD */}
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>DS</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Darshan Satbhai</Text>
              <Text style={styles.role}>Prompt Engineer & AI App Developer</Text>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#7A9BB5" />
                <Text style={styles.infoText}>Ahmedabad, Gujarat, India</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 2 — MY PORTFOLIO WEBSITE */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            <Text style={{fontSize: 18}}>🌐</Text> MY PORTFOLIO WEBSITE
          </Text>
          <Text style={styles.bodyText}>
            Hi! I'm Darshan Satbhai, a passionate Prompt Engineer and AI-powered App Developer from Ahmedabad, India.
          </Text>
          <Text style={[styles.bodyText, { marginTop: 12 }]}>
            I invite you to explore my personal portfolio website — <Text style={{fontFamily: 'DMSans_700Bold', color: '#0A1F44'}}>daarshannexaa.in</Text>! 🚀
          </Text>
          <Text style={[styles.bodyText, { marginTop: 12 }]}>
            On my website, you will find a complete showcase of all my latest AI-powered projects, mobile applications, and premium landing pages. I have built these products entirely through human-AI collaboration and advanced prompting, perfectly demonstrating what is possible with a clear vision.
          </Text>
          <Text style={[styles.bodyText, { marginTop: 12 }]}>
            Please visit the website to check out my live projects. If you enjoy my work, I would deeply appreciate it if you could <Text style={{fontFamily: 'DMSans_700Bold', color: '#4A90D9'}}>Like, Comment, and Share</Text> it with your network! Your continued support truly motivates me to build more amazing products. ❤️
          </Text>
          
          <TouchableOpacity 
            style={{
              backgroundColor: '#0A1F44', 
              paddingVertical: 16, 
              borderRadius: 16, 
              alignItems: 'center', 
              marginTop: 24,
              elevation: 4,
              shadowColor: '#4A90D9',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
            }} 
            activeOpacity={0.8}
            onPress={() => openLink('https://daarshannexaa.in')}
          >
            <Text style={{ fontFamily: 'DMSans_700Bold', fontSize: 16, color: '#FFFFFF' }}>
              Visit daarshannexaa.in
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECTION 5 — PROJECTS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            <Text style={{fontSize: 18}}>🚀</Text> PROJECTS
          </Text>

          <View style={styles.projectItem}>
            <Text style={styles.projectTitle}>1. OneCalc — All-in-One Calculator App</Text>
            <Text style={styles.projectBody}>Smart Android app with 12 powerful calculator tools. Built entirely through AI prompting using Expo React Native. Features: Live currency rates, GST, EMI, Age calculator with birthday reminders, Bill splitter, and more.</Text>
            <Text style={styles.projectStatus}>Status: 🟢 Live & Optimized</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.projectItem}>
            <Text style={styles.projectTitle}>2. daarshannexaa.in — Portfolio Website</Text>
            <Text style={styles.projectBody}>Personal portfolio website built and Google-ranked through AI prompting only. Showcases projects, skills, and work.</Text>
            <Text style={styles.projectStatus}>Status: 🟢 Live</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.projectItem}>
            <Text style={styles.projectTitle}>3. AI Phone Comparison Web App</Text>
            <Text style={styles.projectBody}>HTML/CSS/JS + Anthropic API powered phone comparison tool.</Text>
            <Text style={styles.projectStatus}>Status: ✅ Completed</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.projectItem}>
            <Text style={styles.projectTitle}>4. Premium Landing Pages</Text>
            <Text style={styles.projectBody}>Designed multiple high-quality landing pages for brands like Herman Miller, GoBoult Klarity 4, RedTape Sneakers with GSAP animations and 3D elements.</Text>
            <Text style={styles.projectStatus}>Status: ✅ Completed</Text>
          </View>
          <View style={styles.divider} />

          <View style={{...styles.projectItem, marginBottom: 0}}>
            <Text style={styles.projectTitle}>5. OneCalc Landing Website</Text>
            <Text style={styles.projectBody}>Full marketing website for OneCalc app with dark/light mode, app preview, features showcase and download section.</Text>
            <Text style={styles.projectStatus}>Status: 🟢 Live</Text>
          </View>
        </View>

        {/* SECTION 6 — CONTACT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            <Text style={{fontSize: 18}}>📬</Text> GET IN TOUCH
          </Text>
          
          <TouchableOpacity style={styles.contactRow} onPress={() => openLink('mailto:darshansatbhai38@gmail.com')}>
            <View style={styles.contactIconBg}>
              <Text style={{fontSize: 20}}>✉️</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>darshansatbhai38@gmail.com</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#7A9BB5" />
          </TouchableOpacity>
          <View style={styles.divider} />

          {/* UPDATE CHECK BUTTON */}
          <TouchableOpacity 
            style={styles.updateBtn} 
            onPress={() => {
              // Trigger update check via context/hook
              Updates.checkForUpdateAsync().then(res => {
                if (res.isAvailable) {
                  Alert.alert("Update Available! 🚀", "Naya update mil gaya hai. Download karein?", [
                    { text: "No" },
                    { text: "Update Now", onPress: () => {
                      Updates.fetchUpdateAsync().then(() => Updates.reloadAsync());
                    }}
                  ]);
                } else {
                  Alert.alert("Up to Date ✅", "Aapka app pehle se hi updated hai!");
                }
              }).catch(e => Alert.alert("Error", "Update check nahi ho paya."));
            }}
          >
            <View style={styles.contactIconBg}>
              <MaterialCommunityIcons name="update" size={22} color="#00897B" />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.contactLabel}>Maintenance</Text>
              <Text style={styles.contactValue}>Check for Update</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#7A9BB5" />
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.contactRow} onPress={() => openLink('https://daarshannexaa.in')}>
            <View style={styles.contactIconBg}>
              <Text style={{fontSize: 20}}>🌐</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>daarshannexaa.in</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#7A9BB5" />
          </TouchableOpacity>
        </View>

        {/* SECTION 7 — FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Built with ❤️ using AI + Prompting</Text>
          <Text style={styles.footerText}>OneCalc v1.2.0 — Made in India 🇮🇳</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? 40 : 0
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#0A1F44',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: '#0A1F44',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  bodyText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    color: '#7A9BB5',
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    width: '100%',
    marginVertical: 16,
  },
  
  // Profile specific
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0A1F44',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 32,
    color: '#4A90D9',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 22,
    color: '#0A1F44',
    marginBottom: 4,
  },
  role: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: '#4A90D9',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: '#7A9BB5',
  },

  // Timeline (Edu)
  timelineItem: {
    position: 'relative',
    paddingLeft: 20,
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90D9',
  },
  itemTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: '#0A1F44',
    marginBottom: 4,
  },
  itemSub: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: '#7A9BB5',
    marginBottom: 4,
  },
  itemMuted: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    color: '#0284C7',
  },

  // Skills
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#D8E4F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skillText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: '#0A1F44',
  },

  // Projects
  projectItem: {
    marginBottom: 16,
  },
  projectTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: '#0A1F44',
    marginBottom: 6,
  },
  projectBody: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#7A9BB5',
    lineHeight: 22,
    marginBottom: 8,
  },
  projectStatus: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    color: '#475569',
  },

  // Contact
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  updateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contactIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  contactLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: '#7A9BB5',
    marginBottom: 2,
  },
  contactValue: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: '#0A1F44',
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: '#7A9BB5',
    lineHeight: 22,
  }
});
