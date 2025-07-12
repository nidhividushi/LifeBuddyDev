import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../contexts/ThemeContext';

const {width, height} = Dimensions.get('window');

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'audio';
}

const ConversationsScreen: React.FC = () => {
  const {theme} = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your LifeBuddy AI assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      "That's a great goal! Let me help you break it down into actionable steps.",
      "I understand you want to improve. What specific area would you like to focus on first?",
      "Consistency is key! Let's create a plan that works for your lifestyle.",
      "I'm here to support you every step of the way. What's your next milestone?",
      "That sounds challenging but achievable. Let's work on it together!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <Animated.View
        key={message.id}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.aiMessage,
          {opacity: fadeAnim},
        ]}>
        <BlurView
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        >
          <LinearGradient
            colors={
              isUser
                ? ['rgba(147, 51, 234, 0.2)', 'rgba(79, 70, 229, 0.2)']
                : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
            }
            style={styles.messageGradient}
          />
          <Text style={[styles.messageText, {color: theme.colors.text}]}>
            {message.content}
          </Text>
          <Text style={[styles.timestamp, {color: theme.colors.textTertiary}]}>
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </BlurView>
      </Animated.View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
          <LinearGradient
            colors={theme.colors.gradientPrimary}
            style={styles.avatarContainer}
          >
            <Icon name="robot" size={24} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
              LifeBuddy AI
            </Text>
            <Text style={[styles.headerSubtitle, {color: theme.colors.textSecondary}]}>
              {isTyping ? 'Typing...' : 'Online'}
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}>
        {messages.map(renderMessage)}
        {isTyping && (
          <View style={styles.typingContainer}>
            <BlurView
              style={styles.typingBubble}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.typingGradient}
              />
              <View style={styles.typingDots}>
                <View style={[styles.typingDot, {backgroundColor: theme.colors.primary}]} />
                <View style={[styles.typingDot, {backgroundColor: theme.colors.primary}]} />
                <View style={[styles.typingDot, {backgroundColor: theme.colors.primary}]} />
              </View>
            </BlurView>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <BlurView
          style={styles.inputBlur}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={styles.inputGradient}
        />
        <View style={styles.inputContent}>
          <TouchableOpacity style={styles.audioButton}>
            <Icon name="microphone" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TextInput
            style={[styles.textInput, {color: theme.colors.text}]}
            placeholder="Type your message..."
            placeholderTextColor={theme.colors.textTertiary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {backgroundColor: inputText.trim() ? theme.colors.primary : theme.colors.surface},
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim()}>
            <Icon
              name="send"
              size={20}
              color={inputText.trim() ? '#FFFFFF' : theme.colors.textTertiary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: width * 0.75,
    borderRadius: 20,
    padding: 16,
    position: 'relative',
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderBottomLeftRadius: 4,
  },
  messageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  typingContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  typingBubble: {
    borderRadius: 20,
    padding: 16,
    borderBottomLeftRadius: 4,
    position: 'relative',
  },
  typingGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    opacity: 0.6,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'relative',
  },
  inputBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inputGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  audioButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default ConversationsScreen; 