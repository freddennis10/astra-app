import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const PlayerContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackArtist = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ControlButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const PlayButton = styled(ControlButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.8;
  }
`;

const ProgressContainer = styled.div`
  flex: 1;
  margin: 0 16px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.1s;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  outline: none;
  border-radius: 2px;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const TimeDisplay = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  min-width: 40px;
`;

export const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setVolume,
  } = useMusicPlayer();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const progress = (e.clientX - rect.left) / rect.width;
    // In a real app, you'd seek to this position
    console.log('Seeking to:', progress * duration);
  };

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <PlayerContainer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <TrackInfo>
          <TrackTitle>{currentTrack.title}</TrackTitle>
          <TrackArtist>{currentTrack.artist}</TrackArtist>
        </TrackInfo>

        <Controls>
          <ControlButton
            onClick={previousTrack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipBack size={20} />
          </ControlButton>

          <PlayButton
            onClick={isPlaying ? pauseTrack : resumeTrack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </PlayButton>

          <ControlButton
            onClick={nextTrack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipForward size={20} />
          </ControlButton>
        </Controls>

        <ProgressContainer>
          <ProgressBar onClick={handleProgressClick}>
            <ProgressFill progress={(currentTime / duration) * 100 || 0} />
          </ProgressBar>
        </ProgressContainer>

        <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
        <TimeDisplay>{formatTime(duration)}</TimeDisplay>

        <VolumeContainer>
          <Volume2 size={16} />
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </VolumeContainer>
      </PlayerContainer>
    </AnimatePresence>
  );
};
