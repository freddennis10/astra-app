import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, MessageCircle, Plus, Search, Filter, Globe, Lock, Crown, Zap } from 'lucide-react';

// Import community images
import communityImg1 from '../assets/Images/img (10).jpg';
import communityImg2 from '../assets/Images/img (11).jpg';
import communityImg3 from '../assets/Images/img (12).jpg';
import communityImg4 from '../assets/Images/img (13).jpg';
import communityImg5 from '../assets/Images/img (14).jpg';
import communityImg6 from '../assets/Images/img (15).jpg';
import communityImg7 from '../assets/Images/img (16).jpg';
import communityImg8 from '../assets/Images/img (17).jpg';

const CommunityContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-left: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ActionButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.createShadow(3, theme)};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, active }) => active ? 'white' : theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.createShadow(1, theme)};
  }
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CommunityCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
`;

const CommunityImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${CommunityCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CommunityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CommunityTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CommunityBadge = styled.div<{ type: 'public' | 'private' | 'premium' }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  ${({ type, theme }) => {
    switch (type) {
      case 'public':
        return `background: ${theme.colors.success}20; color: ${theme.colors.success};`;
      case 'private':
        return `background: ${theme.colors.warning}20; color: ${theme.colors.warning};`;
      case 'premium':
        return `background: ${theme.colors.primary}20; color: ${theme.colors.primary};`;
      default:
        return '';
    }
  }}
`;

const CommunityDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const CommunityStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const JoinButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  
  &:hover {
    transform: scale(1.05);
  }
`;

interface Community {
  id: number;
  name: string;
  description: string;
  image: string;
  members: number;
  posts: number;
  type: 'public' | 'private' | 'premium';
  category: string;
}

export const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const communities: Community[] = [
    {
      id: 1,
      name: 'Tech Innovators',
      description: 'Discover the latest in technology, AI, and innovation. Share ideas and collaborate on projects.',
      image: communityImg1,
      members: 12500,
      posts: 3420,
      type: 'public',
      category: 'technology'
    },
    {
      id: 2,
      name: 'Digital Artists',
      description: 'A creative space for digital artists to showcase their work and learn from each other.',
      image: communityImg2,
      members: 8750,
      posts: 2890,
      type: 'public',
      category: 'art'
    },
    {
      id: 3,
      name: 'Crypto Traders',
      description: 'Professional trading community focused on cryptocurrency and blockchain technology.',
      image: communityImg3,
      members: 25000,
      posts: 8750,
      type: 'premium',
      category: 'finance'
    },
    {
      id: 4,
      name: 'Fitness Enthusiasts',
      description: 'Join fellow fitness lovers in sharing workout tips, nutrition advice, and motivation.',
      image: communityImg4,
      members: 15600,
      posts: 4230,
      type: 'public',
      category: 'health'
    },
    {
      id: 5,
      name: 'Book Club Elite',
      description: 'An exclusive community for book lovers to discuss literature and share recommendations.',
      image: communityImg5,
      members: 3200,
      posts: 1890,
      type: 'private',
      category: 'books'
    },
    {
      id: 6,
      name: 'Travel Adventurers',
      description: 'Share your travel experiences, get tips, and plan your next adventure with fellow travelers.',
      image: communityImg6,
      members: 22100,
      posts: 6750,
      type: 'public',
      category: 'travel'
    },
    {
      id: 7,
      name: 'Gaming Legends',
      description: 'Connect with gamers worldwide, share strategies, and participate in tournaments.',
      image: communityImg7,
      members: 18900,
      posts: 9230,
      type: 'public',
      category: 'gaming'
    },
    {
      id: 8,
      name: 'Music Producers',
      description: 'Collaborate with music producers, share beats, and get feedback on your tracks.',
      image: communityImg8,
      members: 7800,
      posts: 3450,
      type: 'premium',
      category: 'music'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Communities' },
    { key: 'public', label: 'Public' },
    { key: 'private', label: 'Private' },
    { key: 'premium', label: 'Premium' }
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || community.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'public': return <Globe size={12} />;
      case 'private': return <Lock size={12} />;
      case 'premium': return <Crown size={12} />;
      default: return null;
    }
  };

  return (
    <CommunityContainer>
      <Title>🌟 Community Hub</Title>
      
      <HeaderActions>
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
          Create Community
        </ActionButton>
      </HeaderActions>
      
      <FilterContainer>
        {filters.map(filter => (
          <FilterButton
            key={filter.key}
            active={activeFilter === filter.key}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </FilterButton>
        ))}
      </FilterContainer>
      
      <CommunityGrid>
        <AnimatePresence>
          {filteredCommunities.map((community, index) => (
            <CommunityCard
              key={community.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CommunityImage src={community.image} alt={community.name} />
              <CardContent>
                <CommunityHeader>
                  <CommunityTitle>{community.name}</CommunityTitle>
                  <CommunityBadge type={community.type}>
                    {getBadgeIcon(community.type)}
                    {community.type}
                  </CommunityBadge>
                </CommunityHeader>
                
                <CommunityDescription>
                  {community.description}
                </CommunityDescription>
                
                <CommunityStats>
                  <StatItem>
                    <Users size={16} />
                    {community.members.toLocaleString()}
                  </StatItem>
                  <StatItem>
                    <MessageCircle size={16} />
                    {community.posts.toLocaleString()}
                  </StatItem>
                  <JoinButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join
                  </JoinButton>
                </CommunityStats>
              </CardContent>
            </CommunityCard>
          ))}
        </AnimatePresence>
      </CommunityGrid>
    </CommunityContainer>
  );
};
