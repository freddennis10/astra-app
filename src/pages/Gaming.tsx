import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Play, Trophy, Users, Star, Gamepad2, Video } from 'lucide-react';

// Import background images
import bg1 from '../assets/BG Images/bg (1).jpg';
import bg2 from '../assets/BG Images/bg (2).jpg';
import bg3 from '../assets/BG Images/bg (3).jpg';
import bg4 from '../assets/BG Images/bg (4).jpg';
import bg5 from '../assets/BG Images/bg (5).jpg';
import bg6 from '../assets/BG Images/bg (6).jpg';
import bg7 from '../assets/BG Images/bg (7).jpg';

const GamingContainer = styled.div`
  padding: 32px 16px;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg1});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  padding: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: white;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const FeaturedSection = styled.div`
  margin-bottom: 48px;
`;

const FeaturedVideo = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  margin-bottom: 32px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const GameCard = styled(motion.div)<{ backgroundImage: string }>`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 24px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const GameTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: white;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const GameDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  margin-bottom: 16px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const GameActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ActionButton = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const GameStats = styled.div`
  display: flex;
  gap: 16px;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: rgba(255, 255, 255, 0.8);
  
  span {
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 8px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    backdrop-filter: blur(5px);
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const VideoCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(0, 0, 0, 0.6);
  }
`;

const VideoThumbnail = styled.div`
  width: 100%;
  height: 180px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const VideoPlayButton = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const VideoTitle = styled.h4`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  margin-bottom: 8px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const VideoDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  line-height: 1.4;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: white;
  margin-bottom: 24px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Gaming: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const games = [
    {
      id: 1,
      title: "Stellar Combat",
      description: "Epic space battles in a vast galaxy with stunning visuals",
      players: 1250,
      rating: 4.8,
      background: bg2
    },
    {
      id: 2,
      title: "Cyber Runner",
      description: "Fast-paced cyberpunk adventure through neon cities",
      players: 890,
      rating: 4.6,
      background: bg3
    },
    {
      id: 3,
      title: "Kingdom Builder",
      description: "Build and manage your medieval kingdom",
      players: 2100,
      rating: 4.9,
      background: bg4
    },
    {
      id: 4,
      title: "Ocean Explorer",
      description: "Dive deep into mysterious underwater worlds",
      players: 1680,
      rating: 4.7,
      background: bg5
    },
    {
      id: 5,
      title: "Sky Racers",
      description: "High-speed aerial racing through clouds",
      players: 956,
      rating: 4.5,
      background: bg6
    },
    {
      id: 6,
      title: "Magic Realms",
      description: "Mystical adventure in enchanted lands",
      players: 1345,
      rating: 4.8,
      background: bg7
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Stellar Combat - Official Trailer",
      description: "Watch the epic trailer for the most anticipated space combat game of the year.",
      url: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 2,
      title: "Cyber Runner - Gameplay Demo",
      description: "See the fast-paced cyberpunk action in this exclusive gameplay demonstration.",
      url: "https://www.w3schools.com/html/movie.mp4"
    },
    {
      id: 3,
      title: "Kingdom Builder - Strategy Guide",
      description: "Learn advanced strategies to build the ultimate medieval kingdom.",
      url: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ];

  const handlePlayVideo = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
  };

  const handleGamePlay = (gameTitle: string) => {
    console.log(`Starting ${gameTitle}...`);
    // In a real app, this would launch the game
    alert(`Loading ${gameTitle}... Game would start here!`);
  };

  return (
    <GamingContainer>
      <Header>
        <Title>
          <Gamepad2 size={40} />
          Gaming Hub
        </Title>
        <Subtitle>Discover amazing games, watch trailers, and connect with fellow gamers</Subtitle>
      </Header>

      <FeaturedSection>
        <SectionTitle>
          <Video size={24} />
          Featured Videos
        </SectionTitle>
        <VideoGrid>
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: video.id * 0.1 }}
            >
              <VideoThumbnail onClick={() => handlePlayVideo(video.url)}>
                <VideoPlayButton>
                  <Play size={24} />
                </VideoPlayButton>
              </VideoThumbnail>
              <VideoTitle>{video.title}</VideoTitle>
              <VideoDescription>{video.description}</VideoDescription>
            </VideoCard>
          ))}
        </VideoGrid>
      </FeaturedSection>

      {currentVideo && (
        <FeaturedVideo>
          <VideoPlayer
            src={currentVideo}
            controls
            autoPlay
            onEnded={() => setCurrentVideo(null)}
          />
        </FeaturedVideo>
      )}

      <SectionTitle>
        <Trophy size={24} />
        Featured Games
      </SectionTitle>
      <GamesGrid>
        {games.map((game) => (
          <GameCard
            key={game.id}
            backgroundImage={game.background}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: game.id * 0.1 }}
          >
            <GameTitle>{game.title}</GameTitle>
            <GameDescription>{game.description}</GameDescription>
            <GameActions>
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGamePlay(game.title)}
              >
                <Play size={18} />
                Play Now
              </ActionButton>
              <GameStats>
                <span><Users size={14} /> {game.players}</span>
                <span><Star size={14} /> {game.rating}</span>
              </GameStats>
            </GameActions>
          </GameCard>
        ))}
      </GamesGrid>
    </GamingContainer>
  );
};

export default Gaming;
