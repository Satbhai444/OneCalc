import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Animated, Alert, Dimensions } from 'react-native';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

export const UpdateManager = () => {
  const { isUpdateAvailable: isRemoteUpdateAvailable } = Updates.useUpdates();
  const { 
    setIsUpdateAvailable, 
    isUpdateModalVisible, 
    setUpdateModalVisible,
    triggerHaptic 
  } = useApp();
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  const [percent, setPercent] = useState(0);

  // 1. Check for "What's New" on every startup
  useEffect(() => {
    const checkWhatsNew = async () => {
      const currentId = Updates.updateId;
      if (!currentId) return;

      const savedId = await AsyncStorage.getItem('LAST_RUN_UPDATE_ID');
      if (currentId !== savedId) {
        Alert.alert(
          "What's New! 🚀",
          "• Real-Time Currency: Live Market Rates (INR Base)\n• Hourly Notifications: 50+ Unique Messages\n• Check for Update: Manual trigger added\n• Scientific Calc: Fixed Trig & Precision\n• Currency: 150+ Countries & Refresh Button\n• GST: Easy Labels & Share Breakdown\n• Age: Next Birthday Fix & Life Stats\n• Bill Splitter: Friend Names & Receipts\n• New Units: Data, Speed, Pressure, etc.\n• Number System: Real-time 4-Base UX",
          [{ text: "Awesome!" }]
        );
        await AsyncStorage.setItem('LAST_RUN_UPDATE_ID', currentId);
      }
    };
    checkWhatsNew();
  }, []);

  // 2. Update Global State when update found
  useEffect(() => {
    if (isRemoteUpdateAvailable) {
      setIsUpdateAvailable(true);
    }
  }, [isRemoteUpdateAvailable]);

  // 3. React to Modal Trigger from Settings
  useEffect(() => {
    if (isUpdateModalVisible && !isDownloading) {
      startDownload();
    }
  }, [isUpdateModalVisible]);

  const startDownload = async () => {
    setIsDownloading(true);
    triggerHaptic();
    // Smooth progress animation (0 to 90% simulated while downloading)
    Animated.timing(progress, {
      toValue: 0.9,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Track percent for text display
    const listenerId = progress.addListener(({ value }) => {
      setPercent(Math.floor(value * 100));
    });

    try {
      await Updates.fetchUpdateAsync();
      
      // Complete to 100%
      Animated.timing(progress, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start(async () => {
        setPercent(100);
        setTimeout(() => {
             Alert.alert(
               "Update Ho Gaya! ✅",
               "App update ho chuki hai. Badlaav dekhne ke liye restart ho rahi hai.",
               [{ text: "OK", onPress: () => Updates.reloadAsync() }]
             );
        }, 500);
      });
    } catch (err) {
      console.error(err);
      setIsDownloading(false);
      setUpdateModalVisible(false);
      Alert.alert("Error", "Update download failed. Please try again later.");
    } finally {
      progress.removeListener(listenerId);
    }
  };

  if (!isDownloading) return null;

  return (
    <Modal transparent visible={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Updating OneCalc...</Text>
          <Text style={styles.subtitle}>Naye features install ho rahe hain, kripya intezar karein.</Text>
          
          <View style={styles.progressBarBg}>
            <Animated.View 
              style={[
                styles.progressBarFill, 
                { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }
              ]} 
            />
          </View>
          
          <Text style={styles.percentText}>{percent}%</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 20,
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  progressBarBg: {
    width: '100%',
    height: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00897B',
    borderRadius: 6,
  },
  percentText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
    color: '#00897B',
  },
});
