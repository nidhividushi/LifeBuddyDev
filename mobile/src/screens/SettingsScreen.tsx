import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../contexts/ThemeContext';
import {useAuth} from '../contexts/AuthContext';

const {width, height} = Dimensions.get('window');

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'toggle' | 'navigate' | 'action';
  value?: boolean;
  onPress?: () => void;
}

const SettingsScreen: React.FC = () => {
  const {theme, toggleTheme, isDark} = useTheme();
  const {user, logout} = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile',
          subtitle: 'Manage your account information',
          icon: 'account',
          type: 'navigate' as const,
        },
        {
          id: 'privacy',
          title: 'Privacy & Security',
          subtitle: 'Control your data and privacy',
          icon: 'shield-account',
          type: 'navigate' as const,
        },
        {
          id: 'notifications',
          title: 'Notifications',
          subtitle: 'Manage notification preferences',
          icon: 'bell',
          type: 'navigate' as const,
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'theme',
          title: 'Dark Mode',
          subtitle: 'Toggle dark/light theme',
          icon: 'theme-light-dark',
          type: 'toggle' as const,
          value: isDark,
          onPress: toggleTheme,
        },
        {
          id: 'sound',
          title: 'Sound Effects',
          subtitle: 'Enable app sound effects',
          icon: 'volume-high',
          type: 'toggle' as const,
          value: soundEnabled,
          onPress: () => setSoundEnabled(!soundEnabled),
        },
        {
          id: 'haptic',
          title: 'Haptic Feedback',
          subtitle: 'Enable vibration feedback',
          icon: 'vibrate',
          type: 'toggle' as const,
          value: hapticEnabled,
          onPress: () => setHapticEnabled(!hapticEnabled),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          icon: 'help-circle',
          type: 'navigate' as const,
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          subtitle: 'Share your thoughts with us',
          icon: 'message-text',
          type: 'navigate' as const,
        },
        {
          id: 'about',
          title: 'About LifeBuddy',
          subtitle: 'App version and information',
          icon: 'information',
          type: 'navigate' as const,
        },
      ],
    },
    {
      title: 'Account Actions',
      items: [
        {
          id: 'logout',
          title: 'Sign Out',
          subtitle: 'Sign out of your account',
          icon: 'logout',
          type: 'action' as const,
          onPress: logout,
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    return (
      <Animated.View
        key={item.id}
        style={[styles.settingItem, {opacity: fadeAnim}]}>
        <BlurView
          style={styles.settingBlur}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.settingGradient}
          />
          <TouchableOpacity
            style={styles.settingContent}
            onPress={item.onPress}
            disabled={item.type === 'toggle'}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <LinearGradient
                  colors={theme.colors.gradientPrimary}
                  style={styles.iconGradient}
                >
                  <Icon name={item.icon} size={20} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, {color: theme.colors.text}]}>
                  {item.title}
                </Text>
                {item.subtitle && (
                  <Text style={[styles.settingSubtitle, {color: theme.colors.textSecondary}]}>
                    {item.subtitle}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.settingRight}>
              {item.type === 'toggle' && (
                <Switch
                  value={item.value}
                  onValueChange={item.onPress}
                  trackColor={{
                    false: 'rgba(255, 255, 255, 0.1)',
                    true: theme.colors.primary,
                  }}
                  thumbColor={item.value ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'}
                />
              )}
              {item.type === 'navigate' && (
                <Icon name="chevron-right" size={20} color={theme.colors.textTertiary} />
              )}
              {item.type === 'action' && item.id === 'logout' && (
                <Icon name="logout" size={20} color={theme.colors.error} />
              )}
            </View>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {/* Header */}
      <View style={styles.header}>
        <BlurView
          style={styles.headerBlur}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={styles.headerGradient}
        />
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
            Settings
          </Text>
        </View>
      </View>

      {/* User Profile Card */}
      <Animated.View style={[styles.profileCard, {opacity: fadeAnim}]}>
        <BlurView
          style={styles.profileBlur}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.profileGradient}
          />
          <View style={styles.profileContent}>
            <View style={styles.profileAvatar}>
              <LinearGradient
                colors={theme.colors.gradientPrimary}
                style={styles.avatarGradient}
              >
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0) || 'U'}
                </Text>
              </LinearGradient>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, {color: theme.colors.text}]}>
                {user?.name || 'User'}
              </Text>
              <Text style={[styles.profileEmail, {color: theme.colors.textSecondary}]}>
                {user?.email || 'user@example.com'}
              </Text>
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Icon name="pencil" size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </BlurView>
      </Animated.View>

      {/* Settings Sections */}
      <ScrollView
        style={styles.settingsContainer}
        contentContainerStyle={styles.settingsContent}
        showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, {color: theme.colors.textSecondary}]}>
              {section.title}
            </Text>
            {section.items.map((item, itemIndex) => (
              <View
                key={item.id}
                style={[
                  styles.settingItem,
                  itemIndex === 0 && styles.settingItemFirst,
                  itemIndex === section.items.length - 1 && styles.settingItemLast,
                ]}>
                {renderSettingItem(item)}
              </View>
            ))}
          </View>
        ))}
        
        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, {color: theme.colors.textTertiary}]}>
            LifeBuddy v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
    position: 'relative',
  },
  headerBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileBlur: {
    padding: 20,
    borderRadius: 20,
    position: 'relative',
  },
  profileGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    marginRight: 16,
  },
  avatarGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  editProfileButton: {
    padding: 8,
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  settingsContent: {
    paddingBottom: 100, // Space for tab bar
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingItem: {
    marginBottom: 1,
  },
  settingItemFirst: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  settingItemLast: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 0,
  },
  settingBlur: {
    padding: 16,
    borderRadius: 16,
    position: 'relative',
  },
  settingGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  iconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  settingRight: {
    alignItems: 'center',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
  },
});

export default SettingsScreen; 