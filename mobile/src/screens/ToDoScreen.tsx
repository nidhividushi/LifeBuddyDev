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

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  status: 'planned' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  subTasks: SubTask[];
}

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

const ToDoScreen: React.FC = () => {
  const {theme} = useTheme();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Exercise Regularly',
      description: 'Build a consistent exercise routine',
      category: 'health',
      progress: 80,
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      subTasks: [
        {id: '1-1', title: 'Morning Run', completed: true},
        {id: '1-2', title: 'Strength Training', completed: false},
        {id: '1-3', title: 'Yoga Session', completed: true},
      ],
    },
    {
      id: '2',
      title: 'Save $10,000',
      description: 'Build emergency fund',
      category: 'finance',
      progress: 45,
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      subTasks: [
        {id: '2-1', title: 'Set up automatic transfers', completed: true},
        {id: '2-2', title: 'Reduce monthly expenses', completed: false},
        {id: '2-3', title: 'Find side income', completed: false},
      ],
    },
    {
      id: '3',
      title: 'Learn Spanish',
      description: 'Achieve conversational fluency',
      category: 'learning',
      progress: 20,
      status: 'planned',
      priority: 'medium',
      dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      subTasks: [
        {id: '3-1', title: 'Download language app', completed: false},
        {id: '3-2', title: 'Practice 30 minutes daily', completed: false},
        {id: '3-3', title: 'Find conversation partner', completed: false},
      ],
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
    {id: 'family', name: 'Family', icon: 'account-group'},
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const filteredGoals = goals.filter(
    goal => selectedCategory === 'all' || goal.category === selectedCategory
  );

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData?.icon || 'target';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return theme.colors.warning;
      case 'low':
        return theme.colors.success;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'in_progress':
        return theme.colors.primary;
      case 'planned':
        return theme.colors.textSecondary;
      default:
        return theme.colors.textSecondary;
    }
  };

  const renderGoal = (goal: Goal) => {
    const completedTasks = goal.subTasks.filter(task => task.completed).length;
    const totalTasks = goal.subTasks.length;

    return (
      <Animated.View
        key={goal.id}
        style={[styles.goalCard, {opacity: fadeAnim}]}>
        <BlurView
          style={styles.goalBlur}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.goalGradient}
          />
          
          <View style={styles.goalHeader}>
            <View style={styles.goalTitleContainer}>
              <LinearGradient
                colors={theme.colors.gradientPrimary}
                style={styles.categoryIcon}
              >
                <Icon name={getCategoryIcon(goal.category)} size={20} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.goalText}>
                <Text style={[styles.goalTitle, {color: theme.colors.text}]}>
                  {goal.title}
                </Text>
                <Text style={[styles.goalDescription, {color: theme.colors.textSecondary}]}>
                  {goal.description}
                </Text>
              </View>
            </View>
            
            <View style={styles.goalMeta}>
              <View style={[styles.priorityBadge, {backgroundColor: getPriorityColor(goal.priority)}]}>
                <Text style={styles.priorityText}>{goal.priority}</Text>
              </View>
              <View style={[styles.statusBadge, {backgroundColor: getStatusColor(goal.status)}]}>
                <Text style={styles.statusText}>{goal.status.replace('_', ' ')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressText, {color: theme.colors.textSecondary}]}>
                Progress
              </Text>
              <Text style={[styles.progressPercentage, {color: theme.colors.text}]}>
                {goal.progress}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={theme.colors.gradientPrimary}
                style={[styles.progressFill, {width: `${goal.progress}%`}]}
              />
            </View>
          </View>

          <View style={styles.subTasksContainer}>
            <Text style={[styles.subTasksTitle, {color: theme.colors.textSecondary}]}>
              Tasks ({completedTasks}/{totalTasks})
            </Text>
            {goal.subTasks.slice(0, 2).map(task => (
              <View key={task.id} style={styles.subTask}>
                <Icon
                  name={task.completed ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                  size={16}
                  color={task.completed ? theme.colors.success : theme.colors.textTertiary}
                />
                <Text
                  style={[
                    styles.subTaskText,
                    {
                      color: task.completed ? theme.colors.textSecondary : theme.colors.text,
                      textDecorationLine: task.completed ? 'line-through' : 'none',
                    },
                  ]}>
                  {task.title}
                </Text>
              </View>
            ))}
            {totalTasks > 2 && (
              <Text style={[styles.moreTasks, {color: theme.colors.textTertiary}]}>
                +{totalTasks - 2} more tasks
              </Text>
            )}
          </View>

          <View style={styles.goalFooter}>
            <Text style={[styles.dueDate, {color: theme.colors.textTertiary}]}>
              Due: {goal.dueDate.toLocaleDateString()}
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <Icon name="pencil" size={16} color={theme.colors.textSecondary} />
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
            My Goals
          </Text>
          <TouchableOpacity style={styles.addButton}>
            <LinearGradient
              colors={theme.colors.gradientPrimary}
              style={styles.addButtonGradient}
            >
              <Icon name="plus" size={24} color="#FFFFFF" />
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

      {/* Goals List */}
      <ScrollView
        style={styles.goalsContainer}
        contentContainerStyle={styles.goalsContent}
        showsVerticalScrollIndicator={false}>
        {filteredGoals.map(renderGoal)}
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  addButtonGradient: {
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
  goalsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  goalsContent: {
    paddingBottom: 100, // Space for tab bar
  },
  goalCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  goalBlur: {
    padding: 20,
    borderRadius: 20,
    position: 'relative',
  },
  goalGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalText: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  goalMeta: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  subTasksContainer: {
    marginBottom: 16,
  },
  subTasksTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  subTask: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  subTaskText: {
    fontSize: 14,
    marginLeft: 8,
  },
  moreTasks: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 12,
  },
  editButton: {
    padding: 8,
  },
});

export default ToDoScreen; 