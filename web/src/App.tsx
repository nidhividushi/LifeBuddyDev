import { useState, useEffect } from 'react'
import './App.css'

interface Goal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  createdAt: string;
}

interface ChatMessage {
  id: string;
  message: string;
  isAI: boolean;
  timestamp: string;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  createdAt: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });
  const [newJournalEntry, setNewJournalEntry] = useState({ title: '', content: '', mood: 'happy' });

  const API_BASE = 'http://localhost:3001/api';

  useEffect(() => {
    // Load initial data
    fetchGoals();
    fetchChatHistory();
    fetchJournalEntries();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch(`${API_BASE}/goals`);
      const data = await response.json();
      if (data.success) {
        setGoals(data.data.goals || []);
      }
    } catch (error) {
      console.log('Using mock goals data');
      setGoals([
        {
          id: '1',
          title: 'Learn React Native',
          description: 'Master React Native development for mobile apps',
          status: 'active',
          progress: 60,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Exercise Daily',
          description: 'Build a consistent exercise routine',
          status: 'active',
          progress: 30,
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/chat/history`);
      const data = await response.json();
      if (data.success) {
        setChatMessages(data.data.messages || []);
      }
    } catch (error) {
      console.log('Using mock chat data');
      setChatMessages([
        {
          id: '1',
          message: 'Hello! I\'m your LifeBuddy AI assistant. How can I help you today?',
          isAI: true,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  const fetchJournalEntries = async () => {
    try {
      const response = await fetch(`${API_BASE}/journal/entries`);
      const data = await response.json();
      if (data.success) {
        setJournalEntries(data.data.entries || []);
      }
    } catch (error) {
      console.log('Using mock journal data');
      setJournalEntries([
        {
          id: '1',
          title: 'My First Journal Entry',
          content: 'Today I started working on LifeBuddy. Feeling excited about this project!',
          mood: 'excited',
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: newMessage,
      isAI: false,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    try {
      const response = await fetch(`${API_BASE}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage })
      });
      const data = await response.json();
      if (data.success) {
        const aiMessage: ChatMessage = {
          id: data.data.id,
          message: data.data.message,
          isAI: true,
          timestamp: data.data.timestamp
        };
        setChatMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      // Mock AI response
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        message: 'Thanks for your message! I\'m here to help you achieve your goals.',
        isAI: true,
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }
  };

  const addGoal = async () => {
    if (!newGoal.title.trim()) return;

    try {
      const response = await fetch(`${API_BASE}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
      });
      const data = await response.json();
      if (data.success) {
        setGoals(prev => [...prev, data.data]);
        setNewGoal({ title: '', description: '' });
      }
    } catch (error) {
      // Mock goal creation
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        status: 'active',
        progress: 0,
        createdAt: new Date().toISOString()
      };
      setGoals(prev => [...prev, goal]);
      setNewGoal({ title: '', description: '' });
    }
  };

  const addJournalEntry = async () => {
    if (!newJournalEntry.title.trim() || !newJournalEntry.content.trim()) return;

    try {
      const response = await fetch(`${API_BASE}/journal/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJournalEntry)
      });
      const data = await response.json();
      if (data.success) {
        setJournalEntries(prev => [...prev, data.data]);
        setNewJournalEntry({ title: '', content: '', mood: 'happy' });
      }
    } catch (error) {
      // Mock journal entry creation
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: newJournalEntry.title,
        content: newJournalEntry.content,
        mood: newJournalEntry.mood,
        createdAt: new Date().toISOString()
      };
      setJournalEntries(prev => [...prev, entry]);
      setNewJournalEntry({ title: '', content: '', mood: 'happy' });
    }
  };

  const renderDashboard = () => (
    <div className="dashboard">
      <h2>Welcome to LifeBuddy! 🚀</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Goals</h3>
          <p className="stat-number">{goals.length}</p>
          <p className="stat-label">Active Goals</p>
        </div>
        <div className="stat-card">
          <h3>Progress</h3>
          <p className="stat-number">{Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / Math.max(goals.length, 1))}%</p>
          <p className="stat-label">Average Progress</p>
        </div>
        <div className="stat-card">
          <h3>Journal</h3>
          <p className="stat-number">{journalEntries.length}</p>
          <p className="stat-label">Entries</p>
        </div>
      </div>
      
      <div className="recent-goals">
        <h3>Recent Goals</h3>
        {goals.slice(0, 3).map(goal => (
          <div key={goal.id} className="goal-item">
            <h4>{goal.title}</h4>
            <p>{goal.description}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${goal.progress}%` }}></div>
            </div>
            <span>{goal.progress}% Complete</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="goals">
      <h2>Goals</h2>
      <div className="add-goal">
        <input
          type="text"
          placeholder="Goal title"
          value={newGoal.title}
          onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Description"
          value={newGoal.description}
          onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>
      
      <div className="goals-list">
        {goals.map(goal => (
          <div key={goal.id} className="goal-card">
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${goal.progress}%` }}></div>
            </div>
            <div className="goal-meta">
              <span>Progress: {goal.progress}%</span>
              <span>Status: {goal.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="chat">
      <h2>AI Chat Assistant</h2>
      <div className="chat-messages">
        {chatMessages.map(message => (
          <div key={message.id} className={`message ${message.isAI ? 'ai' : 'user'}`}>
            <div className="message-content">
              {message.message}
            </div>
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );

  const renderJournal = () => (
    <div className="journal">
      <h2>Journal</h2>
      <div className="add-entry">
        <input
          type="text"
          placeholder="Entry title"
          value={newJournalEntry.title}
          onChange={(e) => setNewJournalEntry(prev => ({ ...prev, title: e.target.value }))}
        />
        <textarea
          placeholder="Write your thoughts..."
          value={newJournalEntry.content}
          onChange={(e) => setNewJournalEntry(prev => ({ ...prev, content: e.target.value }))}
        />
        <select
          value={newJournalEntry.mood}
          onChange={(e) => setNewJournalEntry(prev => ({ ...prev, mood: e.target.value }))}
        >
          <option value="happy">😊 Happy</option>
          <option value="excited">🤩 Excited</option>
          <option value="calm">😌 Calm</option>
          <option value="sad">😔 Sad</option>
          <option value="angry">😠 Angry</option>
        </select>
        <button onClick={addJournalEntry}>Add Entry</button>
      </div>
      
      <div className="journal-entries">
        {journalEntries.map(entry => (
          <div key={entry.id} className="journal-card">
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <div className="entry-meta">
              <span>Mood: {entry.mood}</span>
              <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <h1>LifeBuddy</h1>
        <p>Your AI-powered personal growth companion</p>
      </header>
      
      <nav className="nav">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'goals' ? 'active' : ''} 
          onClick={() => setActiveTab('goals')}
        >
          Goals
        </button>
        <button 
          className={activeTab === 'chat' ? 'active' : ''} 
          onClick={() => setActiveTab('chat')}
        >
          AI Chat
        </button>
        <button 
          className={activeTab === 'journal' ? 'active' : ''} 
          onClick={() => setActiveTab('journal')}
        >
          Journal
        </button>
      </nav>
      
      <main className="main">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'goals' && renderGoals()}
        {activeTab === 'chat' && renderChat()}
        {activeTab === 'journal' && renderJournal()}
      </main>
    </div>
  )
}

export default App
