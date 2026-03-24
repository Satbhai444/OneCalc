import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

export default function PermissionsScreen() {
  const router = useRouter();

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('permissions_seen', 'true');
      router.replace('/home');
    } catch (e) {
      console.error(e);
      router.replace('/home');
    }
  };

  const requestNotification = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        Alert.alert("Success", "Notifications enabled! 🎉");
      } else {
        Alert.alert("Notification Access", "Please allow notifications in Settings to get reminders.");
      }
    } catch (e) {
      console.error("Permissions error", e);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>OneCalc needs permissions</Text>
          <Text style={styles.subtitle}>To provide you with the best experience</Text>
        </View>

        <View style={styles.cardsContainer}>
          {/* Internet Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="web" size={24} color="#4A90D9" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Internet Access</Text>
                <Text style={styles.cardDesc}>For live currency exchange rates</Text>
              </View>
            </View>
            <View style={styles.badgeContainer}>
               <Text style={styles.badgeText}>Required</Text>
            </View>
          </View>

          {/* Notifications Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="bell-ring-outline" size={24} color="#FF8F00" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Notifications</Text>
                <Text style={styles.cardDesc}>For birthday reminders & tips</Text>
              </View>
            </View>
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.skipBtn} onPress={() => {}}>
                 <Text style={styles.skipBtnText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.allowBtn} onPress={requestNotification}>
                 <Text style={styles.allowBtnText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.continueBtn} activeOpacity={0.8} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 26,
    color: '#0A1F44',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: '#7A9BB5',
  },
  cardsContainer: {
    flex: 1,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D8E4F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: '#0A1F44',
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#475569',
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 64,
  },
  badgeText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    color: '#7A9BB5',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  skipBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#D8E4F0',
  },
  skipBtnText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: '#7A9BB5',
  },
  allowBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#4A90D9',
  },
  allowBtnText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  continueBtn: {
    backgroundColor: '#0A1F44',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  continueText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
  }
});
