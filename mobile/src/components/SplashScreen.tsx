import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: false,
          }),
        ])
      ),
    ]).start();
  }, [fadeAnim, scaleAnim, rotateAnim, glowAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0F0F23', '#1E1B4B', '#312E81']}
        style={styles.background}
      />
      
      {/* Animated Background Elements */}
      <Animated.View
        style={[
          styles.floatingOrb,
          styles.orb1,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <LinearGradient
          colors={['rgba(147, 51, 234, 0.3)', 'rgba(79, 70, 229, 0.3)']}
          style={styles.orbGradient}
        />
      </Animated.View>
      
      <Animated.View
        style={[
          styles.floatingOrb,
          styles.orb2,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <LinearGradient
          colors={['rgba(249, 115, 22, 0.3)', 'rgba(239, 68, 68, 0.3)']}
          style={styles.orbGradient}
        />
      </Animated.View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <BlurView
            style={styles.logoBlur}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.logoGradient}
          />
          
          {/* Animated Icon */}
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{rotate: spin}],
              },
            ]}>
            <LinearGradient
              colors={['#9333EA', '#4F46E5']}
              style={styles.iconGradient}
            />
            <Icon name="heart-pulse" size={48} color="#FFFFFF" />
          </Animated.View>
          
          {/* Glow Effect */}
          <Animated.View
            style={[
              styles.glowEffect,
              {
                opacity: glowOpacity,
              },
            ]}>
            <LinearGradient
              colors={['rgba(147, 51, 234, 0.5)', 'transparent']}
              style={styles.glowGradient}
            />
          </Animated.View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: scaleAnim.interpolate({
                inputRange: [0.8, 1],
                outputRange: [50, 0],
              })}],
            },
          ]}>
          <Text style={styles.appName}>LifeBuddy</Text>
          <Text style={styles.tagline}>Your AI-Powered Growth Companion</Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <View style={styles.loadingDots}>
            <Animated.View
              style={[
                styles.dot,
                {
                  opacity: glowAnim,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                {
                  opacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                {
                  opacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ]}
            />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingOrb: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  orb1: {
    top: height * 0.1,
    right: -50,
  },
  orb2: {
    bottom: height * 0.2,
    left: -50,
  },
  orbGradient: {
    flex: 1,
    borderRadius: 100,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  logoBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
  },
  logoGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 40,
  },
  glowEffect: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 80,
  },
  glowGradient: {
    flex: 1,
    borderRadius: 80,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(147, 51, 234, 0.5)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9333EA',
    marginHorizontal: 4,
  },
});

export default SplashScreen; 