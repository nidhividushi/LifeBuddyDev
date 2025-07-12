import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../contexts/ThemeContext';

const {width, height} = Dimensions.get('window');

interface LifeArea {
  name: string;
  value: number;
  icon: string;
  color: string;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  moodScore: number;
  timestamp: Date;
  tags: string[];
}

const MyLifeScreen: React.FC = () => {
  const {theme} = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'journal' | 'analytics'>('overview');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const lifeAreas: LifeArea[] = [
    {name: 'Health', value: 75, icon: 'heart-pulse', color: '#10B981'},
    {name: 'Finance', value: 60, icon: 'wallet', color: '#F59E0B'},
    {name: 'Family', value: 85, icon: 'account-group', color: '#3B82F6'},
    {name: 'Career', value: 70, icon: 'briefcase', color: '#8B5CF6'},
    {name: 'Learning', value: 80, icon: 'school', color: '#EF4444'},
    {name: 'Creativity', value: 65, icon: 'palette', color: '#F97316'},
  ];

  const journalEntries: JournalEntry[] = [
    {
      id: '1',
      title: 'Amazing workout today!',
      content: 'Had an incredible workout session. Feeling energized and ready to tackle my goals.',
      mood: 'excited',
      moodScore: 9,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['health', 'motivation'],
    },
    {
      id: '2',
      title: 'Made progress on savings',
      content: 'Set up automatic transfers and reduced some unnecessary expenses. Every little bit counts!',
      mood: 'accomplished',
      moodScore: 8,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      tags: ['finance', 'goals'],
    },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'excited':
        return 'emoticon-excited';
      case 'happy':
        return 'emoticon-happy';
      case 'accomplished':
        return 'emoticon-cool';
      case 'neutral':
        return 'emoticon-neutral';
      case 'sad':
        return 'emoticon-sad';
      default:
        return 'emoticon-neutral';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excited':
        return '#10B981';
      case 'happy':
        return '#F59E0B';
      case 'accomplished':
        return '#3B82F6';
      case 'neutral':
        return '#6B7280';
      case 'sad':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const renderOverview = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Animated.View style={[styles.statsCard, {opacity: fadeAnim}]}>
          <BlurView
            style={styles.statsBlur}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.statsGradient}
            />
            <View style={styles.statsContent}>
              <Text style={[styles.statsNumber, {color: theme.colors.text}]}>12</Text>
              <Text style={[styles.statsLabel, {color: theme.colors.textSecondary}]}>
                Goals Completed
              </Text>
            </View>
          </BlurView>
        </Animated.View>

        <Animated.View style={[styles.statsCard, {opacity: fadeAnim}]}>
          <BlurView
            style={styles.statsBlur}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.statsGradient}
            />
            <View style={styles.statsContent}>
              <Text style={[styles.statsNumber, {color: theme.colors.text}]}>7</Text>
              <Text style={[styles.statsLabel, {color: theme.colors.textSecondary}]}>
                Day Streak
              </Text>
            </View>
          </BlurView>
        </Animated.View>

        <Animated.View style={[styles.statsCard, {opacity: fadeAnim}]}>
          <BlurView
            style={styles.statsBlur}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.statsGradient}
            />
            <View style={styles.statsContent}>
              <Text style={[styles.statsNumber, {color: theme.colors.text}]}>68%</Text>
              <Text style={[styles.statsLabel, {color: theme.colors.textSecondary}]}>
                Overall Progress
              </Text>
            </View>
          </BlurView>
        </Animated.View>
      </View>

      {/* Life Areas */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
          Life Areas
        </Text>
        <View style={styles.lifeAreasGrid}>
          {lifeAreas.map((area, index) => (
            <Animated.View
              key={area.name}
              style={[styles.lifeAreaCard, {opacity: fadeAnim}]}>
              <BlurView
                style={styles.lifeAreaBlur}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.lifeAreaGradient}
                />
                <View style={styles.lifeAreaContent}>
                  <View style={[styles.lifeAreaIcon, {backgroundColor: area.color}]}>
                    <Icon name={area.icon} size={20} color="#FFFFFF" />
                  </View>
                  <Text style={[styles.lifeAreaName, {color: theme.colors.text}]}>
                    {area.name}
                  </Text>
                  <Text style={[styles.lifeAreaValue, {color: theme.colors.text}]}>
                    {area.value}%
                  </Text>
                  <View style={styles.lifeAreaProgress}>
                    <LinearGradient
                      colors={[area.color, area.color + '80']}
                      style={[styles.lifeAreaProgressFill, {width: `${area.value}%`}]}
                    />
                  </View>
                </View>
              </BlurView>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Recent Journal Entries */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Recent Journal
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, {color: theme.colors.primary}]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        {journalEntries.slice(0, 2).map(entry => (
          <Animated.View
            key={entry.id}
            style={[styles.journalCard, {opacity: fadeAnim}]}>
            <BlurView
              style={styles.journalBlur}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.journalGradient}
              />
              <View style={styles.journalHeader}>
                <View style={styles.journalMood}>
                  <Icon
                    name={getMoodIcon(entry.mood)}
                    size={24}
                    color={getMoodColor(entry.mood)}
                  />
                  <Text style={[styles.moodScore, {color: theme.colors.textSecondary}]}>
                    {entry.moodScore}/10
                  </Text>
                </View>
                <Text style={[styles.journalTime, {color: theme.colors.textTertiary}]}>
                  {entry.timestamp.toLocaleDateString()}
                </Text>
              </View>
              <Text style={[styles.journalTitle, {color: theme.colors.text}]}>
                {entry.title}
              </Text>
              <Text style={[styles.journalContent, {color: theme.colors.textSecondary}]}>
                {entry.content}
              </Text>
              <View style={styles.journalTags}>
                {entry.tags.map(tag => (
                  <View key={tag} style={styles.journalTag}>
                    <Text style={[styles.journalTagText, {color: theme.colors.primary}]}>
                      #{tag}
                    </Text>
                  </View>
                ))}
              </View>
            </BlurView>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );

  const renderJournal = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {journalEntries.map(entry => (
        <Animated.View
          key={entry.id}
          style={[styles.journalCard, {opacity: fadeAnim}]}>
          <BlurView
            style={styles.journalBlur}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.journalGradient}
            />
            <View style={styles.journalHeader}>
              <View style={styles.journalMood}>
                <Icon
                  name={getMoodIcon(entry.mood)}
                  size={24}
                  color={getMoodColor(entry.mood)}
                />
                <Text style={[styles.moodScore, {color: theme.colors.textSecondary}]}>
                  {entry.moodScore}/10
                </Text>
              </View>
              <Text style={[styles.journalTime, {color: theme.colors.textTertiary}]}>
                {entry.timestamp.toLocaleDateString()}
              </Text>
            </View>
            <Text style={[styles.journalTitle, {color: theme.colors.text}]}>
              {entry.title}
            </Text>
            <Text style={[styles.journalContent, {color: theme.colors.textSecondary}]}>
              {entry.content}
            </Text>
            <View style={styles.journalTags}>
              {entry.tags.map(tag => (
                <View key={tag} style={styles.journalTag}>
                  <Text style={[styles.journalTagText, {color: theme.colors.primary}]}>
                    #{tag}
                  </Text>
                </View>
              ))}
            </View>
          </BlurView>
        </Animated.View>
      ))}
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={[styles.placeholderText, {color: theme.colors.textSecondary}]}>
        Analytics and detailed insights coming soon...
      </Text>
    </ScrollView>
  );

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
            My Life
          </Text>
          <TouchableOpacity style={styles.addButton}>
            <LinearGradient
              colors={theme.colors.gradientPrimary}
              style={styles.addButtonGradient}
            >
              <Icon name="plus" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContent}>
          {[
            {id: 'overview', name: 'Overview', icon: 'view-dashboard'},
            {id: 'journal', name: 'Journal', icon: 'book-open'},
            {id: 'analytics', name: 'Analytics', icon: 'chart-line'},
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                selectedTab === tab.id && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab.id as any)}>
              <BlurView
                style={styles.tabBlur}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
              >
                <LinearGradient
                  colors={
                    selectedTab === tab.id
                      ? theme.colors.gradientPrimary
                      : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
                  }
                  style={styles.tabGradient}
                />
                <Icon
                  name={tab.icon}
                  size={20}
                  color={
                    selectedTab === tab.id
                      ? '#FFFFFF'
                      : theme.colors.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        selectedTab === tab.id
                          ? '#FFFFFF'
                          : theme.colors.textSecondary,
                    },
                  ]}>
                  {tab.name}
                </Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      {selectedTab === 'overview' && renderOverview()}
      {selectedTab === 'journal' && renderJournal()}
      {selectedTab === 'analytics' && renderAnalytics()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabContent: {
    paddingRight: 20,
  },
  tabButton: {
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tabButtonActive: {
    transform: [{scale: 1.05}],
  },
  tabBlur: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    position: 'relative',
  },
  tabGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for tab bar
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statsCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statsBlur: {
    padding: 16,
    borderRadius: 16,
    position: 'relative',
  },
  statsGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  statsContent: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  lifeAreasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  lifeAreaCard: {
    width: (width - 60) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  lifeAreaBlur: {
    padding: 16,
    borderRadius: 16,
    position: 'relative',
  },
  lifeAreaGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  lifeAreaContent: {
    alignItems: 'center',
  },
  lifeAreaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  lifeAreaName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  lifeAreaValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lifeAreaProgress: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  lifeAreaProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  journalCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  journalBlur: {
    padding: 16,
    borderRadius: 16,
    position: 'relative',
  },
  journalGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  journalMood: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodScore: {
    fontSize: 12,
    marginLeft: 8,
  },
  journalTime: {
    fontSize: 12,
  },
  journalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  journalContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  journalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  journalTag: {
    marginRight: 8,
    marginBottom: 4,
  },
  journalTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
});

export default MyLifeScreen; 