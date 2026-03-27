import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Animated, Alert, Dimensions, TouchableOpacity } from 'react-native';
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
  
  const [isWhatsNewVisible, setIsWhatsNewVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  const [percent, setPercent] = useState(0);

  // 1. Check for "What's New" on every startup
  useEffect(() => {
    const checkWhatsNew = async () => {
      // Logic: Show if v12_shown is null
      const shown = await AsyncStorage.getItem('WHATS_NEW_V1.2.0_SHOWN');
      if (!shown) {
        setIsWhatsNewVisible(true);
      }
    };
    checkWhatsNew();
  }, []);

  const closeWhatsNew = async () => {
    setIsWhatsNewVisible(false);
    await AsyncStorage.setItem('WHATS_NEW_V1.2.0_SHOWN', 'true');
  };

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
    const listenerId = progress.addListener(({ value }: { value: number }) => {
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

  return (
    <>
      {/* WHAT'S NEW MODAL (v1.2.0) */}
      <Modal transparent visible={isWhatsNewVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.headerIcon}>
              <Text style={{fontSize: 40}}>🚀</Text>
            </View>
            <Text style={styles.title}>Welcome to OneCalc v1.2.0!</Text>
            
            <View style={styles.pointsContainer}>
              <View style={styles.pointRow}>
                <Text style={styles.pointEmoji}>🌍</Text>
                <View style={{flex:1}}>
                  <Text style={styles.pointTitle}>Real-Time Currency</Text>
                  <Text style={styles.pointDesc}>Live market rates with 150+ countries added.</Text>
                </View>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointEmoji}>🔄</Text>
                <View style={{flex:1}}>
                  <Text style={styles.pointTitle}>Auto-Sync</Text>
                  <Text style={styles.pointDesc}>Rates stay updated every time you launch.</Text>
                </View>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointEmoji}>📊</Text>
                <View style={{flex:1}}>
                  <Text style={styles.pointTitle}>Precision</Text>
                  <Text style={styles.pointDesc}>Fixed all Scientific & Age Tool calculations.</Text>
                </View>
              </View>
              <View style={styles.pointRow}>
                <Text style={styles.pointEmoji}>🎁</Text>
                <View style={{flex:1}}>
                  <Text style={styles.pointTitle}>Hourly Notifications</Text>
                  <Text style={styles.pointDesc}>Stay engaged with daily tips and tricks!</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.awesomeBtn} onPress={closeWhatsNew}>
              <Text style={styles.awesomeBtnText}>Awesome! Let&apos;s Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* DOWNLOAD MODAL */}
      <Modal transparent visible={isDownloading} animationType="fade">
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
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 31, 68, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.88,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 22,
    color: '#0A1F44',
    textAlign: 'center',
    marginBottom: 20,
  },
  pointsContainer: {
    width: '100%',
    marginBottom: 30,
    gap: 16,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointEmoji: {
    fontSize: 24,
  },
  pointTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: '#0A1F44',
  },
  pointDesc: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  awesomeBtn: {
    backgroundColor: '#0A1F44',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  awesomeBtnText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
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
