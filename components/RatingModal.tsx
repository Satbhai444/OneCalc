import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function RatingModal({ visible, onClose }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCancel = async () => {
    try {
      if (!submitted) {
        await AsyncStorage.setItem('rating_done', 'true');
      }
    } catch(e) {}
    closeReset();
  };

  const handleLater = async () => {
    try {
      await AsyncStorage.setItem('rating_later', 'true');
    } catch(e) {}
    closeReset();
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    try {
      await AsyncStorage.setItem('rating_done', 'true');
      await AsyncStorage.setItem('user_rating', rating.toString());
      await AsyncStorage.setItem('user_review', review);
      
      setSubmitted(true);
      setTimeout(() => {
        closeReset();
      }, 2000);
    } catch(e) {
      console.error(e);
      closeReset();
    }
  };

  const closeReset = () => {
    onClose();
    setTimeout(() => {
      setRating(0);
      setReview('');
      setSubmitted(false);
    }, 500); // Reset after modal close animation
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={handleCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          
          {submitted ? (
            <View style={styles.thankYouContainer}>
              <Text style={{fontSize: 48, marginBottom: 16}}>🎉</Text>
              <Text style={styles.thankYouTitle}>Thanks for rating OneCalc!</Text>
              <Text style={styles.thankYouSub}>Your feedback means a lot to us!</Text>
            </View>
          ) : (
            <>
              {/* Close Button */}
              <TouchableOpacity style={styles.closeBtn} onPress={handleCancel}>
                <MaterialCommunityIcons name="close" size={24} color="#7A9BB5" />
              </TouchableOpacity>

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.iconSquare}>
                  <Text style={styles.iconText}>1C</Text>
                </View>
                <Text style={styles.title}>Enjoying OneCalc? 😊</Text>
                <Text style={styles.subtitle}>Your feedback helps us improve the app!</Text>
              </View>

              {/* Stars */}
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)} activeOpacity={0.7} style={{padding: 4}}>
                    <MaterialCommunityIcons 
                      name={star <= rating ? "star" : "star-outline"} 
                      size={40} 
                      color={star <= rating ? "#FFD60A" : "#D4D4D4"} 
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Text Input */}
              <TextInput
                style={styles.textInput}
                placeholder="Tell us what you think... (optional)"
                placeholderTextColor="#94A3B8"
                multiline
                maxLength={200}
                value={review}
                onChangeText={setReview}
                textAlignVertical="top"
              />

              {/* Buttons */}
              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.laterBtn} onPress={handleLater}>
                  <Text style={styles.laterBtnText}>Maybe Later</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.submitBtn, { backgroundColor: rating > 0 ? '#0A1F44' : '#D4D4D4' }]} 
                  onPress={handleSubmit}
                  disabled={rating === 0}
                >
                  <Text style={styles.submitBtnText}>Submit Rating</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '100%',
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#0A1F44',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  iconSquare: {
    width: 48,
    height: 48,
    backgroundColor: '#0A1F44',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 20,
    color: '#0A1F44',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: '#7A9BB5',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  textInput: {
    width: '100%',
    height: 100,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#D8E4F0',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#0A1F44',
    marginBottom: 24,
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  laterBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D8E4F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  laterBtnText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: '#7A9BB5',
  },
  submitBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  
  // Thank you state
  thankYouContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  thankYouTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 20,
    color: '#0A1F44',
    marginBottom: 8,
    textAlign: 'center',
  },
  thankYouSub: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 15,
    color: '#7A9BB5',
    textAlign: 'center',
  }
});
