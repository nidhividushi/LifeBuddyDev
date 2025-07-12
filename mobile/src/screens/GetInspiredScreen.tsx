import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../contexts/ThemeContext';

const {width, height} = Dimensions.get('window');

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  category: string;
  likes: number;
  comments: number;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
  media?: string;
  tags: string[];
  timestamp: Date;
}

const GetInspiredScreen: React.FC = () => {
  const {theme} = useTheme();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'Sarah M.',
        avatar: 'https://example.com/avatar1.jpg',
      },
      content: 'Just completed my first 5K! 🏃‍♀️ Started with just 1 minute runs. Consistency beats perfection! 💪',
      category: 'health',
      likes: 24,
      comments: 8,
      saves: 12,
      isLiked: false,
      isSaved: false,
      media: 'https://example.com/5k-finish.jpg',
      tags: ['running', 'achievement', 'motivation'],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      user: {
        name: 'Alex K.',
        avatar: 'https://example.com/avatar2.jpg',
      },
      content: 'Finally hit my savings goal! $10K emergency fund complete. Next: investment portfolio! 📈',
      category: 'finance',
      likes: 18,
      comments: 5,
      saves: 8,
      isLiked: true,
      isSaved: false,
      tags: ['savings', 'finance', 'goals'],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      id: '3',
      user: {
        name: 'Maria L.',
        avatar: 'https://example.com/avatar3.jpg',
      },
      content: 'Day 30 of learning Spanish! Can now have basic conversations. Never too late to learn something new! 🌟',
      category: 'learning',
      likes: 31,
      comments: 12,
      saves: 15,
      isLiked: false,
      isSaved: true,
      tags: ['learning', 'language', 'consistency'],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const categories = [
    {id: 'all', name: 'All', icon: 'view-grid'},
    {id: 'health', name: 'Health', icon: 'heart-pulse'},
    {id: 'finance', name: 'Finance', icon: 'wallet'},
    {id: 'career', name: 'Career', icon: 'briefcase'},
    {id: 'learning', name: 'Learning', icon: 'school'},
    {id: 'motivation', name: 'Motivation', icon: 'lightbulb'},
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const filteredPosts = posts.filter(
    post => selectedCategory === 'all' || post.category === selectedCategory
  );

  const toggleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleSave = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isSaved: !post.isSaved,
              saves: post.isSaved ? post.saves - 1 : post.saves + 1,
            }
          : post
      )
    );
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const renderPost = (post: Post) => {
    return (
      <Animated.View
        key={post.id}
        style={[styles.postCard, {opacity: fadeAnim}]}>
        <BlurView
          style={styles.postBlur}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.postGradient}
          />
          
          {/* Post Header */}
          <View style={styles.postHeader}>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={theme.colors.gradientPrimary}
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>
                    {post.user.name.charAt(0)}
                  </Text>
                </LinearGradient>
              </View>
              <View style={styles.userDetails}>
                <Text style={[styles.userName, {color: theme.colors.text}]}>
                  {post.user.name}
                </Text>
                <Text style={[styles.postTime, {color: theme.colors.textTertiary}]}>
                  {formatTimeAgo(post.timestamp)}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Icon name="dots-horizontal" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Post Content */}
          <View style={styles.postContent}>
            <Text style={[styles.postText, {color: theme.colors.text}]}>
              {post.content}
            </Text>
            
            {/* Tags */}
            <View style={styles.tagsContainer}>
              {post.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={[styles.tagText, {color: theme.colors.primary}]}>
                    #{tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Post Media */}
          {post.media && (
            <View style={styles.mediaContainer}>
              <View style={styles.mediaPlaceholder}>
                <LinearGradient
                  colors={theme.colors.gradientSecondary}
                  style={styles.mediaGradient}
                >
                  <Icon name="image" size={40} color="#FFFFFF" />
                  <Text style={styles.mediaText}>Image</Text>
                </LinearGradient>
              </View>
            </View>
          )}

          {/* Post Actions */}
          <View style={styles.postActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => toggleLike(post.id)}>
              <Icon
                name={post.isLiked ? 'heart' : 'heart-outline'}
                size={20}
                color={post.isLiked ? theme.colors.error : theme.colors.textSecondary}
              />
              <Text style={[styles.actionText, {color: theme.colors.textSecondary}]}>
                {post.likes}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="comment-outline" size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.actionText, {color: theme.colors.textSecondary}]}>
                {post.comments}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => toggleSave(post.id)}>
              <Icon
                name={post.isSaved ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={post.isSaved ? theme.colors.accent : theme.colors.textSecondary}
              />
              <Text style={[styles.actionText, {color: theme.colors.textSecondary}]}>
                {post.saves}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton}>
              <Icon name="share-variant" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
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
            Get Inspired
          </Text>
          <TouchableOpacity style={styles.createButton}>
            <LinearGradient
              colors={theme.colors.gradientPrimary}
              style={styles.createButtonGradient}
            >
              <Icon name="plus" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}>
            <BlurView
              style={styles.categoryBlur}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            >
              <LinearGradient
                colors={
                  selectedCategory === category.id
                    ? theme.colors.gradientPrimary
                    : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
                }
                style={styles.categoryGradient}
              />
              <Icon
                name={category.icon}
                size={20}
                color={
                  selectedCategory === category.id
                    ? '#FFFFFF'
                    : theme.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory === category.id
                        ? '#FFFFFF'
                        : theme.colors.textSecondary,
                  },
                ]}>
                {category.name}
              </Text>
            </BlurView>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Posts Feed */}
      <ScrollView
        style={styles.postsContainer}
        contentContainerStyle={styles.postsContent}
        showsVerticalScrollIndicator={false}>
        {filteredPosts.map(renderPost)}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  createButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryContent: {
    paddingRight: 20,
  },
  categoryButton: {
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  categoryButtonActive: {
    transform: [{scale: 1.05}],
  },
  categoryBlur: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    position: 'relative',
  },
  categoryGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  postsContent: {
    paddingBottom: 100, // Space for tab bar
  },
  postCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  postBlur: {
    padding: 20,
    borderRadius: 20,
    position: 'relative',
  },
  postGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
  },
  moreButton: {
    padding: 8,
  },
  postContent: {
    marginBottom: 16,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  mediaContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mediaPlaceholder: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mediaGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 6,
  },
  shareButton: {
    padding: 8,
  },
});

export default GetInspiredScreen; 