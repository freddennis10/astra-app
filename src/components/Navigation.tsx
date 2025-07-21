import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Home, 
  Users, 
  MessageSquare, 
  ShoppingBag, 
  Wallet, 
  Settings, 
  User,
  Code,
  Gamepad2,
  Building,
  Phone,
  UserPlus,
  LogIn,
  Play,
  Music,
  Video,
  Rss,
  Heart,
  Bookmark,
  TrendingUp,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';

const NavContainer = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 80px;
  height: calc(100vh - 80px);
  width: ${({ $isOpen }) => $isOpen ? '280px' : '80px'};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  z-index: ${({ theme }) => theme.zIndex.sticky - 1};
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const NavToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const NavContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  padding-top: 60px;
`;

const NavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const NavSectionTitle = styled.h3<{ $isOpen: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;

const NavItem = styled.div<{ $active: boolean; $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  background: ${({ theme, $active }) => $active ? theme.colors.primary + '15' : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  
  &:hover {
    background: ${({ theme, $active }) => $active ? theme.colors.primary + '25' : theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
  }
  
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const NavItemText = styled.span<{ $isOpen: boolean }>`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;

const BadgeCount = styled.div`
  background: ${({ theme }) => theme.colors.error};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const NewBadge = styled.div`
  background: ${({ theme }) => theme.colors.success};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-left: auto;
`;

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      section: 'Main',
      items: [
        { path: '/', icon: Home, label: 'Home', badge: null },
        { path: '/community', icon: Users, label: 'Community', badge: null },
        { path: '/groups', icon: MessageSquare, label: 'Groups', badge: 3 },
        { path: '/messages', icon: MessageSquare, label: 'Messages', badge: 5 },
        { path: '/reels', icon: Video, label: 'Reels', badge: 'NEW' },
        { path: '/music', icon: Music, label: 'Music', badge: null },
      ]
    },
    {
      section: 'Business',
      items: [
        { path: '/shop', icon: ShoppingBag, label: 'Shop', badge: null },
        { path: '/wallet', icon: Wallet, label: 'Wallet', badge: null },
        { path: '/business', icon: Building, label: 'Business', badge: null },
        { path: '/developer', icon: Code, label: 'Developer', badge: null },
      ]
    },
    {
      section: 'Entertainment',
      items: [
        { path: '/gaming', icon: Gamepad2, label: 'Gaming', badge: null },
        { path: '/trending', icon: TrendingUp, label: 'Trending', badge: null },
        { path: '/live', icon: Play, label: 'Live', badge: 'LIVE' },
        { path: '/feed', icon: Rss, label: 'Feed', badge: null },
      ]
    },
    {
      section: 'Personal',
      items: [
        { path: '/profile', icon: User, label: 'Profile', badge: null },
        { path: '/saved', icon: Bookmark, label: 'Saved', badge: null },
        { path: '/liked', icon: Heart, label: 'Liked', badge: null },
        { path: '/settings', icon: Settings, label: 'Settings', badge: null },
      ]
    },
    {
      section: 'Support',
      items: [
        { path: '/contact', icon: Phone, label: 'Contact', badge: null },
        { path: '/register', icon: UserPlus, label: 'Register', badge: null },
        { path: '/login', icon: LogIn, label: 'Login', badge: null },
      ]
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <NavContainer $isOpen={isOpen}>
      <NavToggle onClick={onToggle}>
        {isOpen ? <X /> : <Menu />}
      </NavToggle>
      
      <NavContent>
        {navigationItems.map((section) => (
          <NavSection key={section.section}>
            <NavSectionTitle $isOpen={isOpen}>{section.section}</NavSectionTitle>
            {section.items.map((item) => (
              <NavItem
                key={item.path}
                $active={location.pathname === item.path}
                $isOpen={isOpen}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon />
                <NavItemText $isOpen={isOpen}>{item.label}</NavItemText>
                {item.badge && typeof item.badge === 'number' && (
                  <BadgeCount>{item.badge}</BadgeCount>
                )}
                {item.badge && typeof item.badge === 'string' && (
                  <NewBadge>{item.badge}</NewBadge>
                )}
              </NavItem>
            ))}
          </NavSection>
        ))}
      </NavContent>
    </NavContainer>
  );
};
