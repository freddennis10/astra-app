import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Music as MusicIcon, Headphones, Play, Heart } from 'lucide-react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

// Sample music tracks with online streaming URLs
const tracks = [
  { 
    id: 1, 
    title: "Stellar Beats", 
    artist: "DJ Nova", 
    likes: 4200, 
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" 
  },
  { 
    id: 2, 
    title: "Cosmic Vibes", 
    artist: "Lunar Waves", 
    likes: 3100, 
    url: "https://www.soundjay.com/misc/sounds/clock-ticking-5.wav" 
  },
  { 
    id: 3, 
    title: "Galactic Groove", 
    artist: "Starry Night", 
    likes: 2800, 
    url: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav" 
  },
  { 
    id: 4, 
    title: "Interstellar Jam", 
    artist: "Celestial Rhythms", 
    likes: 2500, 
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" 
  },
  { 
    id: 5, 
    title: "Astro Beat", 
    artist: "Space Cadet", 
    likes: 1900, 
    url: "https://www.soundjay.com/misc/sounds/clock-ticking-5.wav" 
  }
];

const MusicContainer = styled.div`
  padding: 32px 16px;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const TrackList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const TrackCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 16px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
`;

const TrackInfo = styled.div`
  flex: 1;
`;

const TrackTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const TrackArtist = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: 8px;
`;

const TrackActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TrackLikes = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Music: React.FC = () => {
    const { playTrack, currentTrack, isPlaying, addToPlaylist } = useMusicPlayer();

    const handlePlayTrack = (track: any) => {
        const musicTrack = {
            id: track.id.toString(),
            title: track.title,
            artist: track.artist,
            duration: '3:45', // Mock duration
            url: track.url // Include the streaming URL
        };
        playTrack(musicTrack);
        addToPlaylist(musicTrack);
    };

    return (
        <MusicContainer>
            <Header>
                <Title>
                    <MusicIcon size={32} />
                    Tune In to Your Music
                </Title>
                <Subtitle>Discover and listen to the latest tracks from your favorite artists</Subtitle>
            </Header>

            <TrackList>
                {tracks.map((track) => (
                    <TrackCard
                        key={track.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: track.id * 0.1 }}
                    >
                        <Headphones size={42} color="#888888" />
                        <TrackInfo>
                            <TrackTitle>{track.title}</TrackTitle>
                            <TrackArtist>{track.artist}</TrackArtist>
                        </TrackInfo>
                        <TrackActions>
                            <Play 
                                size={20} 
                                color={currentTrack?.id === track.id.toString() && isPlaying ? "#ff6b6b" : "#3f51b5"} 
                                cursor="pointer" 
                                onClick={() => handlePlayTrack(track)}
                            />
                            <TrackLikes>
                                <Heart size={16} />
                                {track.likes}
                            </TrackLikes>
                        </TrackActions>
                    </TrackCard>
                ))}
            </TrackList>
        </MusicContainer>
    );
};

export default Music;
