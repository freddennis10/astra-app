import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, MessageCircle, User, Users, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/Logo/ASTRA-removebg-preview.png';
import { DarkModeToggle } from './DarkModeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmationModal } from './ConfirmationModal';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.createShadow(1, theme)};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  max-width: 100vw;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CenterSection = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 ${({ theme }) => theme.spacing.lg};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-left: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const IconButton = styled.button<{ $hasNotification?: boolean }>`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 50%;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  ${({ $hasNotification, theme }) => $hasNotification && `
    &::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background: ${theme.colors.error};
      border-radius: 50%;
      border: 2px solid ${theme.colors.surface};
    }
  `}
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
`;

const BrandText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

const glowPulse = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 5px rgba(102, 126, 234, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(102, 126, 234, 0.8)) drop-shadow(0 0 25px rgba(118, 75, 162, 0.6));
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
`;

const Logo = styled(motion.img)`
  height: 40px;
  animation: ${glowPulse} 2s ease-in-out infinite, ${float} 3s ease-in-out infinite;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 20px rgba(102, 126, 234, 1)) drop-shadow(0 0 30px rgba(118, 75, 162, 0.8));
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-decoration: none;
  transition: color 0.3s ease;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [messagesCount, setMessagesCount] = useState(3);
  const [notificationsCount, setNotificationsCount] = useState(5);
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // In a real app, you'd navigate to search results
      console.log('Searching for:', searchQuery);
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMessagesClick = () => {
    navigate('/messages');
    setMessagesCount(0); // Clear message count when visited
  };

  const handleNotificationsClick = () => {
    // In a real app, you'd open a notifications dropdown
    console.log('Opening notifications');
    setNotificationsCount(0); // Clear notification count when visited
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <BrandContainer onClick={handleLogoClick}>
            <Logo src={logo} alt="Astra Logo" />
            <BrandText>Astra</BrandText>
          </BrandContainer>
        </LeftSection>

        <CenterSection>
          <SearchContainer>
            <SearchIcon>
              <Search />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search people, posts, accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </SearchContainer>
        </CenterSection>

        <RightSection>
          <DarkModeToggle isDark={isDark} onToggle={toggleTheme} />
          
          <IconButton title="Friends" onClick={() => navigate('/friends')}>
            <Users />
          </IconButton>
          
          <IconButton 
            title="Messages" 
            onClick={handleMessagesClick}
            $hasNotification={messagesCount > 0}
          >
            <MessageCircle />
            {messagesCount > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '4px', 
                right: '4px', 
                background: '#ff4444', 
                color: 'white', 
                borderRadius: '50%', 
                width: '16px', 
                height: '16px', 
                fontSize: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {messagesCount}
              </span>
            )}
          </IconButton>
          
          <IconButton 
            title="Notifications" 
            onClick={handleNotificationsClick}
            $hasNotification={notificationsCount > 0}
          >
            <Bell />
            {notificationsCount > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '4px', 
                right: '4px', 
                background: '#ff4444', 
                color: 'white', 
                borderRadius: '50%', 
                width: '16px', 
                height: '16px', 
                fontSize: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {notificationsCount}
              </span>
            )}
          </IconButton>
          
          <ProfileButton onClick={handleProfileClick} title="Profile">
            <ProfileAvatar src={logo} alt="Profile" />
          </ProfileButton>
          
          <IconButton 
            title="Logout" 
            onClick={() => setShowLogoutModal(true)}
            style={{ color: '#ff4444' }}
          >
            <LogOut />
          </IconButton>
        </RightSection>
      </HeaderContainer>

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Cancel"
        variant="warning"
      />
    </>
  );
};

