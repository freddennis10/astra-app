import React, { useState } from 'react';
import styled from 'styled-components';
import { useMultimedia, MediaItem } from '../contexts/MultimediaContext';
import { VideoPlayer } from '../components/VideoPlayer';

const ReelsContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
`;

const ReelCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ReelHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ReelContent = styled.div`
  margin-bottom: 15px;
`;

const ReelText = styled.p`
  margin: 0 0 15px 0;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
`;

const VideoContainer = styled.div`
  width: 100%;
  max-height: 600px;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
`;

const InteractionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const InteractionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const InteractionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &.liked {
    color: #ff6b6b;
  }

  &.saved {
    color: #4ecdc4;
  }
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  margin-top: 50px;
`;

const Reels: React.FC = () => {
  const { reels } = useMultimedia();
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [savedReels, setSavedReels] = useState<Set<string>>(new Set());

  const handleLike = (reelId: string) => {
    setLikedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const handleSave = (reelId: string) => {
    setSavedReels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const handleShare = (reel: MediaItem) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this reel: ${reel.title}`,
        text: reel.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };


  return (
    <ReelsContainer>
      <PageTitle>Reels</PageTitle>
      {reels.map((reel) => (
        <ReelCard key={reel.id}>
          <ReelHeader>
            <Avatar>
              {reel.title.charAt(0).toUpperCase()}
            </Avatar>
            <UserInfo>
              <Username>{reel.title}</Username>
              <Timestamp>{reel.createdAt.toLocaleDateString()}</Timestamp>
            </UserInfo>
          </ReelHeader>
          
          <ReelContent>
            {reel.description && (
              <ReelText>{reel.description}</ReelText>
            )}
            
            <VideoContainer>
            <VideoPlayer
                mediaItem={{
                  id: reel.id,
                  title: reel.description || 'Video',
                  src: reel.src,
                  type: 'video',
                  duration: reel.duration,
                  thumbnail: reel.thumbnail,
                  createdAt: reel.createdAt,
                  views: reel.views || 0,
                  likes: reel.likes || 0
                }}
                autoPlay={false}
                showControls={true}
              />
            </VideoContainer>
          </ReelContent>
          
          <InteractionBar>
            <InteractionGroup>
              <InteractionButton
                className={likedReels.has(reel.id) ? 'liked' : ''}
                onClick={() => handleLike(reel.id)}
              >
                {likedReels.has(reel.id) ? '❤️' : '🤍'} {(reel.likes || 0) + (likedReels.has(reel.id) ? 1 : 0)}
              </InteractionButton>
              
              <InteractionButton onClick={() => handleShare(reel)}>
                📤 Share
              </InteractionButton>
            </InteractionGroup>
            
            <InteractionButton
              className={savedReels.has(reel.id) ? 'saved' : ''}
              onClick={() => handleSave(reel.id)}
            >
              {savedReels.has(reel.id) ? '🔖' : '📌'} Save
            </InteractionButton>
          </InteractionBar>
        </ReelCard>
      ))}
      
      {reels.length === 0 && (
        <LoadingText>No reels available. Create your first reel!</LoadingText>
      )}
    </ReelsContainer>
  );
};

export default Reels;
