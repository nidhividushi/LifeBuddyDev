import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import ConversationsScreen from './screens/ConversationsScreen';
import ToDoScreen from './screens/ToDoScreen';
import GetInspiredScreen from './screens/GetInspiredScreen';
import MyLifeScreen from './screens/MyLifeScreen';
import SettingsScreen from './screens/SettingsScreen';

// Import components
import SplashScreen from './components/SplashScreen';
import {ThemeProvider, useTheme} from './contexts/ThemeContext';
import {AuthProvider} from './contexts/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Tab Bar Component with Glassmorphism
const CustomTabBar = ({state, descriptors, navigation}: any) => {
  const {theme} = useTheme();

  return (
    <View style={styles.tabBarContainer}>
      <BlurView
        style={styles.tabBarBlur}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
        style={styles.tabBarGradient}
      />
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={route.key} style={styles.tabItem}>
            <LinearGradient
              colors={
                isFocused
                  ? ['rgba(147, 51, 234, 0.3)', 'rgba(79, 70, 229, 0.3)']
                  : ['transparent', 'transparent']
              }
              style={[styles.tabButton, isFocused && styles.tabButtonActive]}
              onTouchEnd={onPress}
              onLongPress={onLongPress}
            >
              <Icon
                name={options.tabBarIcon?.name || 'circle'}
                size={24}
                color={isFocused ? theme.colors.primary : theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? theme.colors.primary : theme.colors.textSecondary,
                  },
                ]}>
                {label}
              </Text>
            </LinearGradient>
          </View>
        );
      })}
    </View>
  );
};

// Tab Navigator
const TabNavigator = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {display: 'none'}, // Hide default tab bar
      }}>
      <Tab.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: {name: 'chat-processing'},
        }}
      />
      <Tab.Screen
        name="ToDo"
        component={ToDoScreen}
        options={{
          tabBarLabel: 'Goals',
          tabBarIcon: {name: 'target'},
        }}
      />
      <Tab.Screen
        name="GetInspired"
        component={GetInspiredScreen}
        options={{
          tabBarLabel: 'Inspire',
          tabBarIcon: {name: 'lightbulb'},
        }}
      />
      <Tab.Screen
        name="MyLife"
        component={MyLifeScreen}
        options={{
          tabBarLabel: 'Life',
          tabBarIcon: {name: 'account-heart'},
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: {name: 'dots-horizontal'},
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Component
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {theme} = useTheme();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: theme.colors.primary,
            background: theme.colors.background,
            card: theme.colors.surface,
            text: theme.colors.text,
            border: theme.colors.border,
            notification: theme.colors.accent,
          },
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: theme.colors.background},
          }}>
          <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

// App with Providers
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 80,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  tabBarBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
  },
  tabBarGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabButtonActive: {
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.3)',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
  },
});

export default App; 