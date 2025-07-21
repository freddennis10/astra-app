import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MediaItem, useMultimedia } from '../contexts/MultimediaContext';

interface VideoPlayerProps {
  mediaItem: MediaItem;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
  onEnded?: () => void;
}

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  outline: none;
`;

const ControlsOverlay = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px;
  transform: translateY(${({ show }) => show ? '0' : '100%'});
  transition: transform 0.3s ease;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`;

const ProgressFilled = styled.div<{ progress: number }>`
  height: 100%;
  background: #007bff;
  border-radius: 2px;
  width: ${({ progress }) => progress}%;
  transition: width 0.1s ease;
`;

const TimeDisplay = styled.span`
  color: white;
  font-size: 12px;
  min-width: 40px;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VolumeButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
`;

const VolumeSlider = styled.input`
  width: 60px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const FullscreenButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
`;

const VideoInfo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  color: white;
  z-index: 10;
`;

const VideoTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const VideoMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  opacity: 0.8;
`;

const PlayOverlay = styled.div<{ show: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.3s ease;
  z-index: 5;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const PlayIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid white;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  margin-left: 4px;
`;

const PauseIcon = styled.div`
  display: flex;
  gap: 4px;
  
  &::before,
  &::after {
    content: '';
    width: 4px;
    height: 20px;
    background: white;
  }
`;

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  mediaItem,
  autoPlay = false,
  showControls = true,
  className,
  onEnded
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const { setCurrentPlayingVideo } = useMultimedia();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentPlayingVideo(null);
      onEnded?.();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnded, setCurrentPlayingVideo]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setCurrentPlayingVideo(null);
    } else {
      video.play();
      setCurrentPlayingVideo(mediaItem);
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    video.volume = newVolume / 100;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!isFullscreen) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <VideoContainer 
      className={className}
      onMouseEnter={() => setShowControlsOverlay(true)}
      onMouseLeave={() => setShowControlsOverlay(false)}
    >
      <VideoElement
        ref={videoRef}
        src={mediaItem.src}
        autoPlay={autoPlay}
        muted={isMuted}
        onClick={togglePlay}
      />
      
      {showControls && (
        <>
          <VideoInfo>
            <VideoTitle>{mediaItem.title}</VideoTitle>
            <VideoMeta>
              <span>{mediaItem.views?.toLocaleString()} views</span>
              <span>{mediaItem.likes?.toLocaleString()} likes</span>
            </VideoMeta>
          </VideoInfo>

          <PlayOverlay show={!isPlaying && showControlsOverlay} onClick={togglePlay}>
            <PlayIcon />
          </PlayOverlay>

          <ControlsOverlay show={showControlsOverlay}>
            <ProgressBar onClick={handleProgressClick}>
              <ProgressFilled progress={progressPercentage} />
            </ProgressBar>
            
            <ControlsRow>
              <PlayButton onClick={togglePlay}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </PlayButton>
              
              <TimeDisplay>
                {formatTime(currentTime)} / {formatTime(duration)}
              </TimeDisplay>
              
              <VolumeContainer>
                <VolumeButton onClick={toggleMute}>
                  {isMuted ? '🔇' : '🔊'}
                </VolumeButton>
                <VolumeSlider
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </VolumeContainer>
              
              <FullscreenButton onClick={toggleFullscreen}>
                {isFullscreen ? '⛶' : '⛶'}
              </FullscreenButton>
            </ControlsRow>
          </ControlsOverlay>
        </>
      )}
    </VideoContainer>
  );
};
