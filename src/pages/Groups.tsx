import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Plus, Users, Crown, Shield, Star, TrendingUp, MessageCircle } from 'lucide-react';
import img1 from '../assets/Images/img (1).jpg';
import img2 from '../assets/Images/img (2).jpg';
import img3 from '../assets/Images/img (3).jpg';
import img4 from '../assets/Images/img (4).jpg';
import img5 from '../assets/Images/img (5).jpg';
import bg1 from '../assets/BG Images/bg (1).jpg';
import bg2 from '../assets/BG Images/bg (2).jpg';
import bg3 from '../assets/BG Images/bg (3).jpg';

const GroupsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.display};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SearchSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-left: 48px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}20;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const CreateGroupButton = styled.button`
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const FilterTab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  border-bottom: 2px solid ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const GroupCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
`;

const GroupCover = styled.div<{ $image: string }>`
  height: 120px;
  background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing.md};
`;

const GroupBadge = styled.div<{ $type: 'premium' | 'trending' | 'new' }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  ${({ $type, theme }) => {
    switch ($type) {
      case 'premium':
        return `background: ${theme.colors.warning}; color: white;`;
      case 'trending':
        return `background: ${theme.colors.success}; color: white;`;
      case 'new':
        return `background: ${theme.colors.primary}; color: white;`;
      default:
        return '';
    }
  }}
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const GroupInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const GroupTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const GroupDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const GroupStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const GroupStat = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const JoinButton = styled.button<{ $joined?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme, $joined }) => $joined ? theme.colors.success : theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $joined }) => $joined ? theme.colors.success : theme.colors.primary};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

interface Group {
  id: string;
  name: string;
  description: string;
  cover: string;
  members: number;
  posts: number;
  type: 'premium' | 'trending' | 'new' | 'normal';
  category: string;
  isJoined: boolean;
}

export const Groups: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Blockchain Innovators',
      description: 'A community of forward-thinking blockchain developers and enthusiasts sharing the latest innovations.',
      cover: bg1,
      members: 12500,
      posts: 847,
      type: 'trending',
      category: 'technology',
      isJoined: true,
    },
    {
      id: '2',
      name: 'Crypto Art Collective',
      description: 'Digital artists creating and trading NFTs, sharing techniques and market insights.',
      cover: bg2,
      members: 8900,
      posts: 1203,
      type: 'premium',
      category: 'art',
      isJoined: false,
    },
    {
      id: '3',
      name: 'Web3 Gaming Hub',
      description: 'Play-to-earn gaming community discussing the latest blockchain games and strategies.',
      cover: bg3,
      members: 15600,
      posts: 2341,
      type: 'new',
      category: 'gaming',
      isJoined: true,
    },
    {
      id: '4',
      name: 'DeFi Traders',
      description: 'Share trading strategies, market analysis, and DeFi protocol insights.',
      cover: bg1,
      members: 23400,
      posts: 3456,
      type: 'trending',
      category: 'finance',
      isJoined: false,
    },
    {
      id: '5',
      name: 'Metaverse Builders',
      description: 'Building the future of virtual worlds and metaverse experiences.',
      cover: bg2,
      members: 6700,
      posts: 567,
      type: 'normal',
      category: 'technology',
      isJoined: true,
    },
    {
      id: '6',
      name: 'Astra Developers',
      description: 'Official developer community for Astra platform contributors and enthusiasts.',
      cover: bg3,
      members: 4500,
      posts: 289,
      type: 'premium',
      category: 'development',
      isJoined: false,
    },
  ]);

  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: !group.isJoined }
        : group
    ));
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my-groups' && group.isJoined) ||
                      (activeTab === 'trending' && group.type === 'trending') ||
                      (activeTab === 'new' && group.type === 'new');
    return matchesSearch && matchesTab;
  });

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'premium':
        return <Crown />;
      case 'trending':
        return <TrendingUp />;
      case 'new':
        return <Star />;
      default:
        return null;
    }
  };

  return (
    <GroupsContainer>
      <Header>
        <Title>Groups</Title>
        <SearchSection>
          <SearchContainer>
            <SearchIcon>
              <Search />
            </SearchIcon>
            <SearchInput
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
          <CreateGroupButton>
            <Plus />
            Create Group
          </CreateGroupButton>
        </SearchSection>
      </Header>

      <FilterTabs>
        <FilterTab
          $active={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
        >
          All Groups
        </FilterTab>
        <FilterTab
          $active={activeTab === 'my-groups'}
          onClick={() => setActiveTab('my-groups')}
        >
          My Groups
        </FilterTab>
        <FilterTab
          $active={activeTab === 'trending'}
          onClick={() => setActiveTab('trending')}
        >
          Trending
        </FilterTab>
        <FilterTab
          $active={activeTab === 'new'}
          onClick={() => setActiveTab('new')}
        >
          New
        </FilterTab>
      </FilterTabs>

      <GroupsGrid>
        {filteredGroups.map((group) => (
          <GroupCard key={group.id}>
            <GroupCover $image={group.cover}>
              {group.type !== 'normal' && (
                <GroupBadge $type={group.type as 'premium' | 'trending' | 'new'}>
                  {getBadgeIcon(group.type)}
                  {group.type}
                </GroupBadge>
              )}
            </GroupCover>
            <GroupInfo>
              <GroupHeader>
                <div>
                  <GroupTitle>{group.name}</GroupTitle>
                </div>
              </GroupHeader>
              <GroupDescription>{group.description}</GroupDescription>
              <GroupStats>
                <GroupStat>
                  <Users />
                  {group.members.toLocaleString()} members
                </GroupStat>
                <GroupStat>
                  <MessageCircle />
                  {group.posts} posts
                </GroupStat>
              </GroupStats>
              <JoinButton
                $joined={group.isJoined}
                onClick={() => handleJoinGroup(group.id)}
              >
                {group.isJoined ? 'Joined' : 'Join Group'}
              </JoinButton>
            </GroupInfo>
          </GroupCard>
        ))}
      </GroupsGrid>
    </GroupsContainer>
  );
};
