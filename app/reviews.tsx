import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { useRouter } from 'expo-router';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  isUser?: boolean;
}

export default function ReviewsScreen() {
  const router = useRouter();
  const [userReview, setUserReview] = useState<Review | null>(null);

  const dummyReviews: Review[] = [
    {
      id: '1',
      name: 'Aman Singh',
      rating: 5,
      date: '12-Mar-2026',
      text: 'Best calculator app ever! All 12 tools work perfectly. The UI is super clean and the dark mode is beautiful.'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      rating: 5,
      date: '08-Mar-2026',
      text: 'Very useful for daily tasks. The GST and EMI calculators saved me a lot of time. Highly recommended!'
    },
    {
      id: '3',
      name: 'Rahul Verma',
      rating: 4,
      date: '28-Feb-2026',
      text: 'Great app without any annoying ads. The split bill feature is a lifesaver when hanging out with friends.'
    },
    {
      id: '4',
      name: 'Neha Gupta',
      rating: 5,
      date: '15-Feb-2026',
      text: 'Amazing work by the developer! Smooth animations and very responsive. 5 stars from my side.'
    }
  ];

  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const rating = await AsyncStorage.getItem('user_rating');
        const reviewText = await AsyncStorage.getItem('user_review');
        
        if (rating) {
          setUserReview({
            id: 'user_review',
            name: 'You',
            rating: parseInt(rating, 10),
            date: 'Just now',
            text: reviewText || '',
            isUser: true
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchUserReview();
  }, []);

  const renderStars = (rating: number, size: number = 14) => {
    return (
      <View style={{ flexDirection: 'row', gap: 2 }}>
        {[1, 2, 3, 4, 5].map(star => (
          <MaterialCommunityIcons 
            key={star}
            name={star <= rating ? "star" : "star-outline"} 
            size={size} 
            color={star <= rating ? "#FFD60A" : "#D4D4D4"} 
          />
        ))}
      </View>
    );
  };

  const [votes, setVotes] = useState<Record<string, 'yes' | 'no'>>({});

  const handleVote = (id: string, type: 'yes' | 'no') => {
    setVotes(prev => ({ ...prev, [id]: type }));
  };

  const getProgressWidth = (percentage: string) => {
    return { width: percentage as any };
  };

  const allReviews = userReview ? [userReview, ...dummyReviews] : dummyReviews;
  
  // Calculate dynamic average if user rated
  const totalStars = allReviews.reduce((sum, r) => sum + r.rating, 0) + (14200 * 4.8); // blending with 14.2k dummy reviews
  const totalCount = allReviews.length + 14200;
  const averageString = (totalStars / totalCount).toFixed(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#F8FAFC" />
      <Header title="Ratings & Reviews" accentColor="#0A1F44" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* PLAYSTORE AVG SECTION */}
        <View style={styles.avgContainer}>
          <View style={styles.avgLeft}>
            <Text style={styles.bigRating}>{averageString}</Text>
            {renderStars(Math.round(parseFloat(averageString)), 16)}
            <Text style={styles.totalReviewsCount}>14.2K reviews</Text>
          </View>
          
          <View style={styles.avgRight}>
            {[
              { star: 5, pct: '85%' },
              { star: 4, pct: '10%' },
              { star: 3, pct: '3%' },
              { star: 2, pct: '1%' },
              { star: 1, pct: '1%' },
            ].map((bar, i) => (
              <View key={i} style={styles.barRow}>
                <Text style={styles.barStarText}>{bar.star}</Text>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, getProgressWidth(bar.pct)]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* REVIEWS LIST */}
        <Text style={styles.sectionTitle}>What people are saying</Text>

        {allReviews.map((review) => {
          const userVote = votes[review.id];
          const isYes = userVote === 'yes';
          const isNo = userVote === 'no';
          
          const baseHelpfulCount = review.id === 'user_review' ? 0 : parseInt(review.id) * 24 + 17;
          const displayCount = baseHelpfulCount + (isYes ? 1 : 0);

          return (
            <View key={review.id} style={[styles.reviewCard, review.isUser && styles.userReviewCard]}>
              <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{review.name.charAt(0)}</Text>
                </View>
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>
                    {review.name} {review.isUser && <Text style={styles.youBadge}>(Your Review)</Text>}
                  </Text>
                  <View style={styles.reviewSubInfo}>
                    {renderStars(review.rating, 14)}
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
              </View>
              {review.text.length > 0 && (
                <Text style={styles.reviewText}>{review.text}</Text>
              )}
              
              {/* Helpful row playstore style */}
              <View style={styles.helpfulRow}>
                <Text style={styles.helpfulText}>
                  {displayCount > 0 ? `${displayCount} people found this helpful` : 'Was this review helpful?'}
                </Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <TouchableOpacity 
                    onPress={() => handleVote(review.id, 'yes')}
                    style={[styles.helpfulBtn, isYes && { backgroundColor: '#10B981', borderColor: '#10B981' }]}
                  >
                    <Text style={[styles.helpfulBtnText, isYes && { color: '#FFFFFF' }]}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleVote(review.id, 'no')}
                    style={[styles.helpfulBtn, isNo && { backgroundColor: '#EF4444', borderColor: '#EF4444' }]}
                  >
                    <Text style={[styles.helpfulBtnText, isNo && { color: '#FFFFFF' }]}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: Platform.OS === 'android' ? 40 : 0 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  
  // Avg Top Section
  avgContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avgLeft: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bigRating: { fontFamily: 'DMSans_700Bold', fontSize: 56, color: '#0A1F44', lineHeight: 64 },
  totalReviewsCount: { fontFamily: 'DMSans_400Regular', fontSize: 13, color: '#7A9BB5', marginTop: 4 },
  
  avgRight: { flex: 1.2, paddingLeft: 10 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  barStarText: { fontFamily: 'DMSans_700Bold', fontSize: 13, color: '#0A1F44', width: 12 },
  barBg: { flex: 1, height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#0A1F44', borderRadius: 4 },
  
  divider: { height: 1, backgroundColor: '#F1F5F9', width: '100%', marginBottom: 20 },
  sectionTitle: { fontFamily: 'DMSans_700Bold', fontSize: 18, color: '#0A1F44', marginBottom: 16 },
  
  // Review Cards
  reviewCard: { marginBottom: 24 },
  userReviewCard: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#D8E4F0' },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4A90D9', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontFamily: 'DMSans_700Bold', fontSize: 18, color: '#FFFFFF' },
  reviewerInfo: { flex: 1 },
  reviewerName: { fontFamily: 'DMSans_700Bold', fontSize: 15, color: '#0A1F44', marginBottom: 2 },
  youBadge: { color: '#4A90D9', fontSize: 13 },
  reviewSubInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reviewDate: { fontFamily: 'DMSans_400Regular', fontSize: 12, color: '#7A9BB5' },
  
  reviewText: { fontFamily: 'DMSans_400Regular', fontSize: 14, color: '#475569', lineHeight: 22, marginBottom: 12 },
  
  helpfulRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  helpfulText: { fontFamily: 'DMSans_500Medium', fontSize: 13, color: '#7A9BB5', flex: 1, paddingRight: 8 },
  helpfulBtn: { paddingHorizontal: 16, paddingVertical: 6, backgroundColor: '#F8FAFC', borderRadius: 20, borderWidth: 1, borderColor: '#D8E4F0' },
  helpfulBtnText: { fontFamily: 'DMSans_700Bold', fontSize: 13, color: '#0A1F44' }
});
