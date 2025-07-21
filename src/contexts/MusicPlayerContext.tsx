import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url?: string;
  image?: string;
}

interface MusicPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  playlist: Track[];
  addToPlaylist: (track: Track) => void;
  removeFromPlaylist: (trackId: string) => void;
  clearPlaylist: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    
    // Load and play the actual audio
    if (audioRef.current) {
      if (track.url) {
        audioRef.current.src = track.url;
        audioRef.current.load();
        audioRef.current.play().catch(console.error);
      } else {
        // For demo purposes, use a sample audio URL
        audioRef.current.src = `https://www.soundjay.com/misc/sounds/clock-ticking-5.wav`;
        audioRef.current.load();
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resumeTrack = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const nextTrack = () => {
    if (currentTrack && playlist.length > 0) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      playTrack(playlist[nextIndex]);
    }
  };

  const previousTrack = () => {
    if (currentTrack && playlist.length > 0) {
      const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      playTrack(playlist[prevIndex]);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const addToPlaylist = (track: Track) => {
    setPlaylist(prev => [...prev, track]);
  };

  const removeFromPlaylist = (trackId: string) => {
    setPlaylist(prev => prev.filter(track => track.id !== trackId));
  };

  const clearPlaylist = () => {
    setPlaylist([]);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
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
        setCurrentTime,
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        clearPlaylist,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={nextTrack}
      />
    </MusicPlayerContext.Provider>
  );
};
