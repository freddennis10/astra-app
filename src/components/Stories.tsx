import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Play } from 'lucide-react';
import img1 from '../assets/Images/img (1).jpg';
import img2 from '../assets/Images/img (2).jpg';
import img3 from '../assets/Images/img (3).jpg';
import img4 from '../assets/Images/img (4).jpg';
import img5 from '../assets/Images/img (5).jpg';
import logo from '../assets/Logo/ASTRA-removebg-preview.png';

const StoriesContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.createShadow(1, theme)};
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const StoriesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StoriesTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const StoriesGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StoryItem = styled.div<{ $isAddStory?: boolean }>`
  position: relative;
  min-width: 80px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${({ $isAddStory, theme }) => $isAddStory ? `
    background: ${theme.colors.backgroundSecondary};
    border: 2px dashed ${theme.colors.border};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &:hover {
      border-color: ${theme.colors.primary};
      background: ${theme.colors.primary}10;
    }
  ` : `
    background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
    padding: 2px;
    
    &:hover {
      transform: scale(1.05);
    }
  `}
`;

const StoryContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  position: relative;
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StoryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const StoryAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
`;

const StoryUsername = styled.span`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const AddStoryIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const AddStoryText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 2px;
  }
  
  ${StoryItem}:hover & {
    opacity: 1;
  }
`;

const ViewCount = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

interface Story {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  image: string;
  timestamp: string;
  views: number;
  isViewed?: boolean;
}

export const Stories: React.FC = () => {
  const [stories] = useState<Story[]>([
    {
      id: '1',
      user: {
        name: 'Alex Thompson',
        username: 'alexthompson',
        avatar: img1,
      },
      image: img2,
      timestamp: '2h',
      views: 234,
      isViewed: false,
    },
    {
      id: '2',
      user: {
        name: 'Sarah Chen',
        username: 'sarahchen',
        avatar: img3,
      },
      image: img4,
      timestamp: '4h',
      views: 189,
      isViewed: true,
    },
    {
      id: '3',
      user: {
        name: 'Michael Rodriguez',
        username: 'mikerodriguez',
        avatar: img5,
      },
      image: img1,
      timestamp: '6h',
      views: 456,
      isViewed: false,
    },
    {
      id: '4',
      user: {
        name: 'Emma Wilson',
        username: 'emmawilson',
        avatar: img2,
      },
      image: img3,
      timestamp: '8h',
      views: 123,
      isViewed: true,
    },
    {
      id: '5',
      user: {
        name: 'David Kim',
        username: 'davidkim',
        avatar: img4,
      },
      image: img5,
      timestamp: '10h',
      views: 567,
      isViewed: false,
    },
  ]);

  const handleAddStory = () => {
    console.log('Add story clicked');
  };

  const handleStoryClick = (story: Story) => {
    console.log('Story clicked:', story);
  };

  return (
    <StoriesContainer>
      <StoriesHeader>
        <StoriesTitle>Stories</StoriesTitle>
      </StoriesHeader>
      
      <StoriesGrid>
        {/* Add Story */}
        <StoryItem $isAddStory onClick={handleAddStory}>
          <AddStoryIcon>
            <Plus />
          </AddStoryIcon>
          <AddStoryText>Add Story</AddStoryText>
        </StoryItem>

        {/* Stories */}
        {stories.map((story) => (
          <StoryItem key={story.id} onClick={() => handleStoryClick(story)}>
            <StoryContent>
              <StoryImage src={story.image} alt={`${story.user.name}'s story`} />
              <ViewCount>{story.views}</ViewCount>
              <PlayButton>
                <Play />
              </PlayButton>
              <StoryOverlay>
                <StoryAvatar src={story.user.avatar} alt={story.user.name} />
                <StoryUsername>{story.user.name}</StoryUsername>
              </StoryOverlay>
            </StoryContent>
          </StoryItem>
        ))}
      </StoriesGrid>
    </StoriesContainer>
  );
};
