import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, UserPlus, Users, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useSocial, User } from '../contexts/SocialContext';

const FriendsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  font-weight: 700;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 25px;
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  width: 20px;
  height: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 20px;
  border: none;
  background: none;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${props.theme.colors.primary};
    }
  `}
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const UserCard = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const UserHandle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  margin: 0;
`;

const UserStats = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  font-weight: 600;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: ${props.theme.colors.primary};
          color: white;
          &:hover {
            background: ${props.theme.colors.primaryHover};
          }
        `;
      case 'danger':
        return `
          background: ${props.theme.colors.error};
          color: white;
          &:hover {
            opacity: 0.8;
          }
        `;
      default:
        return `
          background: ${props.theme.colors.border};
          color: ${props.theme.colors.text};
          &:hover {
            background: ${props.theme.colors.border};
          }
        `;
    }
  }}
`;

const IconButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.border};
  }
`;

const OnlineIndicator = styled.div<{ online: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.online ? '#4CAF50' : '#757575'};
  border: 2px solid ${props => props.theme.colors.backgroundSecondary};
  position: absolute;
  bottom: 0;
  right: 0;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const MutualFollowBadge = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${props => props.theme.colors.textSecondary};
  grid-column: 1 / -1;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 8px;
`;

const Friends: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'friends' | 'followers' | 'following' | 'requests'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    friends, 
    followers, 
    following, 
    friendRequests, 
    followUser, 
    unfollowUser, 
    acceptFriendRequest, 
    sendFriendRequest,
    removeFriend,
    isFollowing,
    isMutualFollowing,
    rejectFriendRequest
  } = useSocial();

  const getCurrentData = () => {
    switch (activeTab) {
      case 'friends':
        return friends;
      case 'followers':
        return followers;
      case 'following':
        return following;
      case 'requests':
        return friendRequests.map(request => request.from);
      default:
        return [];
    }
  };

  const filteredData = getCurrentData().filter((user: User) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'friends':
        return friends.length;
      case 'followers':
        return followers.length;
      case 'following':
        return following.length;
      case 'requests':
        return friendRequests.length;
      default:
        return 0;
    }
  };

  const renderUserCard = (user: User) => (
    <UserCard
      key={user.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <UserInfo>
        <AvatarContainer>
          <Avatar src={user.avatar || '/api/placeholder/50/50'} alt={user.name} />
          <OnlineIndicator online={user.isOnline} />
        </AvatarContainer>
        <UserDetails>
          <UserName>{user.name}</UserName>
          <UserHandle>@{user.username}</UserHandle>
          {isMutualFollowing(user.id) && (
            <MutualFollowBadge>Mutual Follow</MutualFollowBadge>
          )}
        </UserDetails>
      </UserInfo>

      <UserStats>
        <Stat>
          <StatValue>{user.followersCount || 0}</StatValue>
          <StatLabel>Followers</StatLabel>
        </Stat>
        <Stat>
          <StatValue>{user.followingCount || 0}</StatValue>
          <StatLabel>Following</StatLabel>
        </Stat>
        <Stat>
          <StatValue>{user.postsCount || 0}</StatValue>
          <StatLabel>Posts</StatLabel>
        </Stat>
      </UserStats>

      <ActionButtons>
        {activeTab === 'requests' ? (
          <>
            <ActionButton 
              variant="primary" 
              onClick={() => acceptFriendRequest(friendRequests.find(req => req.from.id === user.id)?.id || '')}
            >
              Accept
            </ActionButton>
            <ActionButton 
              variant="secondary" 
              onClick={() => rejectFriendRequest(friendRequests.find(req => req.from.id === user.id)?.id || '')}
            >
              Decline
            </ActionButton>
          </>
        ) : (
          <>
            {activeTab === 'friends' && (
              <ActionButton 
                variant="danger" 
                onClick={() => removeFriend(user.id)}
              >
                Remove
              </ActionButton>
            )}
            {activeTab === 'following' && (
              <ActionButton 
                variant="secondary" 
                onClick={() => unfollowUser(user.id)}
              >
                Unfollow
              </ActionButton>
            )}
            {activeTab === 'followers' && !isFollowing(user.id) && (
              <ActionButton 
                variant="primary" 
                onClick={() => followUser(user.id)}
              >
                Follow Back
              </ActionButton>
            )}
            <IconButton onClick={() => console.log('Message', user.name)}>
              <MessageCircle size={16} />
            </IconButton>
            <IconButton onClick={() => console.log('More options', user.name)}>
              <MoreHorizontal size={16} />
            </IconButton>
          </>
        )}
      </ActionButtons>
    </UserCard>
  );

  const getEmptyStateContent = () => {
    switch (activeTab) {
      case 'friends':
        return {
          icon: '👥',
          title: 'No friends yet',
          message: 'Start connecting with people to build your network!'
        };
      case 'followers':
        return {
          icon: '👤',
          title: 'No followers yet',
          message: 'Share interesting content to attract followers!'
        };
      case 'following':
        return {
          icon: '➕',
          title: 'Not following anyone',
          message: 'Discover and follow interesting people!'
        };
      case 'requests':
        return {
          icon: '📨',
          title: 'No pending requests',
          message: 'Friend requests will appear here when you receive them.'
        };
      default:
        return {
          icon: '🔍',
          title: 'Nothing found',
          message: 'Try adjusting your search or explore different tabs.'
        };
    }
  };

  const emptyContent = getEmptyStateContent();

  return (
    <FriendsContainer>
      <Header>
        <Title>Friends</Title>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <TabsContainer>
        <Tab 
          active={activeTab === 'friends'} 
          onClick={() => setActiveTab('friends')}
        >
          Friends ({getTabCount('friends')})
        </Tab>
        <Tab 
          active={activeTab === 'followers'} 
          onClick={() => setActiveTab('followers')}
        >
          Followers ({getTabCount('followers')})
        </Tab>
        <Tab 
          active={activeTab === 'following'} 
          onClick={() => setActiveTab('following')}
        >
          Following ({getTabCount('following')})
        </Tab>
        <Tab 
          active={activeTab === 'requests'} 
          onClick={() => setActiveTab('requests')}
        >
          Requests ({getTabCount('requests')})
        </Tab>
      </TabsContainer>

      <ContentContainer>
        {filteredData.length === 0 ? (
          <EmptyState>
            <EmptyIcon>{emptyContent.icon}</EmptyIcon>
            <EmptyTitle>{emptyContent.title}</EmptyTitle>
            <p>{emptyContent.message}</p>
          </EmptyState>
        ) : (
          filteredData.map(renderUserCard)
        )}
      </ContentContainer>
    </FriendsContainer>
  );
};

export default Friends;
