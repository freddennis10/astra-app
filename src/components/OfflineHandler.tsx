import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/Logo/ASTRA-removebg-preview.png';

const OfflineOverlay = styled.div<{ $active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  visibility: ${({ $active }) => ($active ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const OfflineContent = styled.div`
  text-align: center;
  color: white;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const LoadingScreen = styled.div<{ $active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  visibility: ${({ $active }) => ($active ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const LoadingContent = styled.div`
  text-align: center;
  color: white;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: rotate 2s linear infinite;
  filter: brightness(0) invert(1);
`;

const OfflineLogo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: rotate 2s linear infinite;
  filter: brightness(0) invert(1);
`;

const LoadingBar = styled.div`
  width: 250px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
`;

const LoadingProgress = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 2px;
  transition: width 1.5s ease-out;
  width: ${({ $progress }) => $progress}%;
`;

const StatusIndicator = styled.div<{ $online: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  z-index: ${({ theme }) => theme.zIndex.fixed};
  background: ${({ $online, theme }) => ($online ? theme.colors.success : theme.colors.error)};
  color: white;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.createShadow(3, theme)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  background: #ff6b6b;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
`;

export const OfflineHandler = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOffline, setShowOffline] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOffline(false);
      showLoadingSequence();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
      setShowLoading(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial state
    if (!navigator.onLine) {
      setShowOffline(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showLoadingSequence = () => {
    setShowLoading(true);
    setLoadingProgress(0);
    
    // Animate progress bar
    setTimeout(() => {
      setLoadingProgress(100);
    }, 100);

    // Hide loading after 2 seconds
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
  };

  // Offline detection with periodic checking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isOnline) {
      interval = setInterval(() => {
        // Try to fetch a small resource to check connection
        fetch('/favicon.ico', { 
          method: 'HEAD',
          cache: 'no-cache'
        }).then(() => {
          // Connection restored
          if (!navigator.onLine) {
            window.dispatchEvent(new Event('online'));
          }
        }).catch(() => {
          // Still offline
        });
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOnline]);

  return (
    <>
      {/* Status Indicator */}
      <StatusIndicator $online={isOnline}>
        {isOnline ? 'Online' : 'Offline'}
      </StatusIndicator>

      {/* Offline Overlay */}
      <OfflineOverlay $active={showOffline}>
        <OfflineContent>
          <OfflineLogo src={logo} alt="Astra Logo" />
          <h2>You're Offline</h2>
          <p>Please check your internet connection and try again.</p>
          <ConnectionStatus>
            <StatusDot />
            <span>Attempting to reconnect...</span>
          </ConnectionStatus>
        </OfflineContent>
      </OfflineOverlay>

      {/* Loading Screen */}
      <LoadingScreen $active={showLoading}>
        <LoadingContent>
          <Logo src={logo} alt="Astra Logo" />
          <div>
            <h2>Astra</h2>
            <p>Loading your social experience...</p>
          </div>
          <LoadingBar>
            <LoadingProgress $progress={loadingProgress} />
          </LoadingBar>
        </LoadingContent>
      </LoadingScreen>
    </>
  );
};
