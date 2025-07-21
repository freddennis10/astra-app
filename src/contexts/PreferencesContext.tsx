import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Preferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    activityTracking: boolean;
    dataCollection: boolean;
  };
  feed: {
    layout: 'grid' | 'list';
    content: 'trending' | 'following' | 'algorithmic';
  };
}

interface PreferencesContextType {
  preferences: Preferences;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setLanguage: (language: string) => void;
  updateNotifications: (notifications: Partial<Preferences['notifications']>) => void;
  updatePrivacy: (privacy: Partial<Preferences['privacy']>) => void;
  updateFeed: (feed: Partial<Preferences['feed']>) => void;
}

const defaultPreferences: Preferences = {
  theme: 'light',
  language: 'en',
  notifications: {
    push: true,
    email: true,
    sms: false,
  },
  privacy: {
    profileVisible: true,
    activityTracking: false,
    dataCollection: false,
  },
  feed: {
    layout: 'grid',
    content: 'trending',
  },
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  useEffect(() => {
    // Load preferences from localStorage on mount
    const savedPreferences = localStorage.getItem('astra-preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  useEffect(() => {
    // Save preferences to localStorage whenever they change
    localStorage.setItem('astra-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const setTheme = (theme: 'light' | 'dark' | 'auto') => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  const setLanguage = (language: string) => {
    setPreferences(prev => ({ ...prev, language }));
  };

  const updateNotifications = (notifications: Partial<Preferences['notifications']>) => {
    setPreferences(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...notifications }
    }));
  };

  const updatePrivacy = (privacy: Partial<Preferences['privacy']>) => {
    setPreferences(prev => ({
      ...prev,
      privacy: { ...prev.privacy, ...privacy }
    }));
  };

  const updateFeed = (feed: Partial<Preferences['feed']>) => {
    setPreferences(prev => ({
      ...prev,
      feed: { ...prev.feed, ...feed }
    }));
  };

  return (
    <PreferencesContext.Provider value={{
      preferences,
      setTheme,
      setLanguage,
      updateNotifications,
      updatePrivacy,
      updateFeed,
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export { PreferencesProvider, usePreferences, type Preferences };
