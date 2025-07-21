import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { usePreferences } from '../contexts/PreferencesContext';
const SettingsContainer = styled.div`
  padding: 32px 24px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 80vh;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 32px;
`;

const Section = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  font-weight: 600;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const SettingDescription = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  margin-top: 4px;
`;

const ToggleSwitch = styled.input`
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  outline: none;
  appearance: none;
  position: relative;
  transition: all 0.3s ease;
  
  &:checked {
    background: ${({ theme }) => theme.colors.primary};
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: all 0.3s ease;
  }
  
  &:checked::before {
    transform: translateX(24px);
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  cursor: pointer;
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DangerButton = styled(Button)`
  background: #dc3545;
  
  &:hover {
    background: #c82333;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  h3 {
    margin: 0 0 4px 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
  }
`;

export const Settings = () => {
  const { preferences, updateNotifications, updatePrivacy, setLanguage } = usePreferences();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const handleToggle = (key: string) => {
    // Handle different preference categories
    if (key === 'pushNotifications' || key === 'emailNotifications') {
      updateNotifications({ [key.replace('Notifications', '').toLowerCase()]: !preferences.notifications[key.replace('Notifications', '').toLowerCase() as keyof typeof preferences.notifications] });
    } else if (key === 'dataAnalytics' || key === 'locationServices') {
      updatePrivacy({ [key.replace('data', '').replace('Analytics', 'Collection').replace('locationServices', 'activityTracking')]: !preferences.privacy[key.replace('data', '').replace('Analytics', 'Collection').replace('locationServices', 'activityTracking') as keyof typeof preferences.privacy] });
    } else if (key === 'autoPlayVideos' || key === 'showSensitiveContent') {
      // These would need to be added to the feed preferences in the context
      console.log(`Toggle ${key} - feature not fully implemented`);
    }
  };

  const handleSelectChange = (key: string, value: string) => {
    if (key === 'language') {
      setLanguage(value);
    } else if (key === 'profileVisibility') {
      updatePrivacy({ profileVisible: value === 'public' });
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all app data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <SettingsContainer>
      <Title>Settings</Title>
      
      <Section>
        <SectionTitle>Account</SectionTitle>
        <UserInfo>
          <Avatar src={user?.avatar || '/default-avatar.png'} alt={user?.name || 'User'} />
          <UserDetails>
            <h3>{user?.name || 'User'}</h3>
            <p>@{user?.username || 'username'}</p>
          </UserDetails>
        </UserInfo>
      </Section>

      <Section>
        <SectionTitle>Appearance</SectionTitle>
        <SettingRow>
          <div>
            <SettingLabel>Dark Mode</SettingLabel>
            <SettingDescription>Switch between light and dark themes</SettingDescription>
          </div>
          <ToggleSwitch
            type="checkbox"
            checked={theme.colors.background === '#0f172a'}
            onChange={toggleTheme}
          />
        </SettingRow>
        <SettingRow>
          <div>
            <SettingLabel>Language</SettingLabel>
            <SettingDescription>Choose your preferred language</SettingDescription>
          </div>
          <Select
            value={preferences.language}
            onChange={(e) => handleSelectChange('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
          </Select>
        </SettingRow>
      </Section>

      <Section>
        <SectionTitle>Notifications</SectionTitle>
        <SettingRow>
          <div>
            <SettingLabel>Push Notifications</SettingLabel>
            <SettingDescription>Receive notifications for new messages and activities</SettingDescription>
          </div>
          <ToggleSwitch
            type="checkbox"
            checked={preferences.notifications.push}
            onChange={() => handleToggle('pushNotifications')}
          />
        </SettingRow>
        <SettingRow>
          <div>
            <SettingLabel>Email Notifications</SettingLabel>
            <SettingDescription>Get updates via email</SettingDescription>
          </div>
          <ToggleSwitch
            type="checkbox"
            checked={preferences.notifications.email}
            onChange={() => handleToggle('emailNotifications')}
          />
        </SettingRow>
        <SettingRow>
          <div>
            <SettingLabel>Sound Effects</SettingLabel>
            <SettingDescription>Play sounds for actions and notifications</SettingDescription>
          </div>
          <ToggleSwitch
            type="checkbox"
            checked={preferences.notifications.sms}
            onChange={() => handleToggle('soundEffects')}
          />
        </SettingRow>
      </Section>

      <Section>
        <SectionTitle>Privacy</SectionTitle>
        <SettingRow>
          <div>
            <SettingLabel>Profile Visibility</SettingLabel>
            <SettingDescription>Who can see your profile</SettingDescription>
          </div>
          <Select
            value={preferences.privacy.profileVisible ? 'public' : 'private'}
            onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </Select>
        </SettingRow>
        <SettingRow>
          <div>
            <SettingLabel>Data Analytics</SettingLabel>
            <SettingDescription>Allow anonymous usage data collection</SettingDescription>
          </div>
          <ToggleSwitch
            type="checkbox"
            checked={preferences.privacy.dataCollection}
            onChange={() => handleToggle('dataAnalytics')}
          />
        </SettingRow>
        <SettingRow>
          <div>
            <SettingLabel>Location Services</SettingLabel>
            <SettingDescription>Share your location for better recommendations</SettingDescription>
          </div>
          <ToggleSwitch
            type="checkbox"
            checked={preferences.privacy.activityTracking}
            onChange={() => handleToggle('locationServices')}
          />
        </SettingRow>
      </Section>

      <Section>
        <SectionTitle>Content</SectionTitle>
        <SettingRow>
          <div>
            <SettingLabel>Auto-play Videos</SettingLabel>
            <SettingDescription>Automatically play videos in feed</SettingDescription>
          </div>
          <ToggleSwitch
            type="checkbox"
            checked={false}
            onChange={() => handleToggle('autoPlayVideos')}
          />
        </SettingRow>
        <SettingRow>
          <div>
            <SettingLabel>Show Sensitive Content</SettingLabel>
            <SettingDescription>Display content marked as sensitive</SettingDescription>
          </div>
          <ToggleSwitch
            type="checkbox"
            checked={false}
            onChange={() => handleToggle('showSensitiveContent')}
          />
        </SettingRow>
      </Section>

      <Section>
        <SectionTitle>Data Management</SectionTitle>
        <SettingRow>
          <div>
            <SettingLabel>Clear Cache</SettingLabel>
            <SettingDescription>Remove temporary files and cached data</SettingDescription>
          </div>
          <Button onClick={handleClearData}>
            Clear Data
          </Button>
        </SettingRow>
      </Section>

      <Section>
        <SectionTitle>Danger Zone</SectionTitle>
        <SettingRow>
          <div>
            <SettingLabel>Delete Account</SettingLabel>
            <SettingDescription>Permanently delete your account and all data</SettingDescription>
          </div>
          <DangerButton onClick={() => alert('Account deletion feature coming soon')}>
            Delete Account
          </DangerButton>
        </SettingRow>
      </Section>
    </SettingsContainer>
  );
};
