import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import ChatPage from './components/ChatPage';
import Navbar from './components/Navbar';
import { ApiProvider } from './services/ApiContext';

// PUBLIC_INTERFACE
function App() {
  /**
   * App hosts theme management and provides API client context to the app.
   * It renders a Navbar and the ChatPage (chat UI).
   */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const apiBaseUrl = useMemo(() => {
    // Use env variable if provided; fallback to relative path for same-origin proxy
    // Note: Set REACT_APP_BACKEND_URL in .env to point to your backend server.
    return process.env.REACT_APP_BACKEND_URL || '';
  }, []);

  return (
    <ApiProvider baseUrl={apiBaseUrl}>
      <div className="App">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <ChatPage />
      </div>
    </ApiProvider>
  );
}

export default App;
