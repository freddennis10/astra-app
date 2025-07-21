import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { OfflineHandler } from './components/OfflineHandler';
import { LoadingScreen } from './components/LoadingScreen';
import { RegisterModal } from './components/RegisterModal';
import { MusicPlayer } from './components/MusicPlayer';
import { GlobalStyles } from './styles/globalStyles';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { MultimediaProvider } from './contexts/MultimediaContext';
import { AuthProvider } from './contexts/AuthContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { WalletProvider } from './contexts/WalletContext';
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';
import { SocialProvider } from './contexts/SocialContext';
import { Shop } from './pages/Shop';
import { Community } from './pages/Community';
import { Wallet } from './pages/Wallet';
import { Settings } from './pages/Settings';
import { AuthPage } from './pages/AuthPage';
import { Developer } from './pages/Developer';
import Gaming from './pages/Gaming';
import { Business } from './pages/Business';
import { Groups } from './pages/Groups';
import { Contact } from './pages/Contact';
import Messages from './pages/Messages';
import Friends from './pages/Friends';
import Reels from './pages/Reels';
import Music from './pages/Music';
import Trending from './pages/Trending';
import Live from './pages/Live';
import Feed from './pages/Feed';
import Saved from './pages/Saved';
import Liked from './pages/Liked';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main<{ $navOpen: boolean }>`
  flex: 1;
  margin-left: ${({ $navOpen }) => $navOpen ? '280px' : '80px'};
  margin-top: 80px;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 80px);
  transition: margin-left 0.3s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    padding: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 70px;
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  const handleRegister = (userData: any) => {
    console.log('User registered:', userData);
    // Handle registration logic here
  };
  
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <OfflineHandler />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
          ) : !isAuthenticated ? (
            <Routes key="auth">
              <Route path="*" element={<AuthPage />} />
            </Routes>
          ) : (
            <AppLayout key="app">
              <Header />
              <Navigation isOpen={navOpen} onToggle={() => setNavOpen(!navOpen)} />
              <MainContent $navOpen={navOpen}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/register" element={<AuthPage />} />
                  <Route path="/developer" element={<Developer />} />
                  <Route path="/gaming" element={<Gaming />} />
                  <Route path="/business" element={<Business />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/reels" element={<Reels />} />
                  <Route path="/music" element={<Music />} />
                  <Route path="/trending" element={<Trending />} />
                  <Route path="/live" element={<Live />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/saved" element={<Saved />} />
                  <Route path="/liked" element={<Liked />} />
                </Routes>
                <MusicPlayer />
              </MainContent>
            </AppLayout>
          )}
        </AnimatePresence>
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onRegister={handleRegister}
        />
      </Router>
    </StyledThemeProvider>
  );
};

function App() {
  return (
        <AuthProvider>
          <PreferencesProvider>
            <WalletProvider>
              <ThemeProvider>
                <MultimediaProvider>
                  <MusicPlayerProvider>
                    <SocialProvider>
                      <AppContent />
                    </SocialProvider>
                  </MusicPlayerProvider>
                </MultimediaProvider>
              </ThemeProvider>
            </WalletProvider>
          </PreferencesProvider>
        </AuthProvider>
  );
}

export default App;
