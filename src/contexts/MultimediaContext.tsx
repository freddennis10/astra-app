import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MediaItem {
  id: string;
  type: 'video' | 'audio';
  src: string;
  title: string;
  duration: number;
  thumbnail?: string;
  artist?: string;
  description?: string;
  tags?: string[];
  createdAt: Date;
  views?: number;
  likes?: number;
}

interface MultimediaContextType {
  videos: MediaItem[];
  audios: MediaItem[];
  reels: MediaItem[];
  currentPlayingVideo: MediaItem | null;
  currentPlayingAudio: MediaItem | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  setCurrentPlayingVideo: (video: MediaItem | null) => void;
  setCurrentPlayingAudio: (audio: MediaItem | null) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  addToPlaylist: (item: MediaItem) => void;
  removeFromPlaylist: (id: string) => void;
  getMediaByType: (type: 'video' | 'audio') => MediaItem[];
  searchMedia: (query: string) => MediaItem[];
  getRecommendations: (currentItem: MediaItem) => MediaItem[];
}

const MultimediaContext = createContext<MultimediaContextType | undefined>(undefined);

export const useMultimedia = () => {
  const context = useContext(MultimediaContext);
  if (!context) {
    throw new Error('useMultimedia must be used within a MultimediaProvider');
  }
  return context;
};

interface MultimediaProviderProps {
  children: ReactNode;
}

export const MultimediaProvider: React.FC<MultimediaProviderProps> = ({ children }) => {
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [audios, setAudios] = useState<MediaItem[]>([]);
  const [reels, setReels] = useState<MediaItem[]>([]);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<MediaItem | null>(null);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);

  // Initialize media items from assets
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        // Sample video data - you can replace with actual asset loading
        const videoData: MediaItem[] = [
          {
            id: '1',
            type: 'video',
            src: '/src/assets/Vids/sample-video-1.mp4',
            title: 'Amazing Nature Documentary',
            duration: 180,
            thumbnail: '/src/assets/Vids/thumbs/video-1-thumb.jpg',
            description: 'A breathtaking journey through nature',
            tags: ['nature', 'documentary', 'wildlife'],
            createdAt: new Date('2024-01-01'),
            views: 1500,
            likes: 245
          },
          {
            id: '2',
            type: 'video',
            src: '/src/assets/Vids/sample-video-2.mp4',
            title: 'Tech Innovation Showcase',
            duration: 240,
            thumbnail: '/src/assets/Vids/thumbs/video-2-thumb.jpg',
            description: 'Latest innovations in technology',
            tags: ['tech', 'innovation', 'future'],
            createdAt: new Date('2024-01-02'),
            views: 2300,
            likes: 456
          },
          {
            id: '3',
            type: 'video',
            src: '/src/assets/Vids/sample-video-3.mp4',
            title: 'Cooking Masterclass',
            duration: 300,
            thumbnail: '/src/assets/Vids/thumbs/video-3-thumb.jpg',
            description: 'Learn to cook like a professional chef',
            tags: ['cooking', 'food', 'tutorial'],
            createdAt: new Date('2024-01-03'),
            views: 3200,
            likes: 678
          }
        ];

        // Sample audio data
        const audioData: MediaItem[] = [
          {
            id: '4',
            type: 'audio',
            src: '/src/assets/Vids/sample-audio-1.mp3',
            title: 'Chill Vibes',
            artist: 'Relaxation Studio',
            duration: 210,
            thumbnail: '/src/assets/Vids/thumbs/audio-1-thumb.jpg',
            description: 'Perfect for relaxation and focus',
            tags: ['chill', 'ambient', 'relaxation'],
            createdAt: new Date('2024-01-04'),
            views: 5600,
            likes: 892
          },
          {
            id: '5',
            type: 'audio',
            src: '/src/assets/Vids/sample-audio-2.mp3',
            title: 'Epic Motivation',
            artist: 'Power Beats',
            duration: 195,
            thumbnail: '/src/assets/Vids/thumbs/audio-2-thumb.jpg',
            description: 'Get motivated and energized',
            tags: ['motivation', 'energy', 'workout'],
            createdAt: new Date('2024-01-05'),
            views: 4200,
            likes: 734
          },
          {
            id: '6',
            type: 'audio',
            src: '/src/assets/Vids/sample-audio-3.mp3',
            title: 'Jazz Evening',
            artist: 'Smooth Jazz Collective',
            duration: 280,
            thumbnail: '/src/assets/Vids/thumbs/audio-3-thumb.jpg',
            description: 'Smooth jazz for evening relaxation',
            tags: ['jazz', 'smooth', 'evening'],
            createdAt: new Date('2024-01-06'),
            views: 3800,
            likes: 567
          }
        ];

        // Sample reels data (short videos)
        const reelsData: MediaItem[] = [
          {
            id: '7',
            type: 'video',
            src: '/src/assets/Vids/reel-1.mp4',
            title: 'Quick Life Hack',
            duration: 15,
            thumbnail: '/src/assets/Vids/thumbs/reel-1-thumb.jpg',
            description: 'Amazing life hack in 15 seconds',
            tags: ['lifehack', 'quick', 'tips'],
            createdAt: new Date('2024-01-07'),
            views: 12000,
            likes: 2340
          },
          {
            id: '8',
            type: 'video',
            src: '/src/assets/Vids/reel-2.mp4',
            title: 'Dance Challenge',
            duration: 30,
            thumbnail: '/src/assets/Vids/thumbs/reel-2-thumb.jpg',
            description: 'Latest dance trend',
            tags: ['dance', 'challenge', 'trending'],
            createdAt: new Date('2024-01-08'),
            views: 8500,
            likes: 1890
          }
        ];

        setVideos(videoData);
        setAudios(audioData);
        setReels(reelsData);
      } catch (error) {
        console.error('Error initializing media:', error);
      }
    };

    initializeMedia();
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const addToPlaylist = (item: MediaItem) => {
    // Add logic to add item to playlist
    console.log('Adding to playlist:', item);
  };

  const removeFromPlaylist = (id: string) => {
    // Add logic to remove item from playlist
    console.log('Removing from playlist:', id);
  };

  const getMediaByType = (type: 'video' | 'audio') => {
    return type === 'video' ? videos : audios;
  };

  const searchMedia = (query: string) => {
    const allMedia = [...videos, ...audios, ...reels];
    return allMedia.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const getRecommendations = (currentItem: MediaItem) => {
    const allMedia = [...videos, ...audios, ...reels];
    return allMedia
      .filter(item => item.id !== currentItem.id)
      .filter(item => 
        item.tags?.some(tag => currentItem.tags?.includes(tag)) ||
        item.type === currentItem.type
      )
      .slice(0, 6);
  };

  const value: MultimediaContextType = {
    videos,
    audios,
    reels,
    currentPlayingVideo,
    currentPlayingAudio,
    isPlaying,
    isMuted,
    volume,
    setCurrentPlayingVideo,
    setCurrentPlayingAudio,
    togglePlay,
    toggleMute,
    setVolume,
    addToPlaylist,
    removeFromPlaylist,
    getMediaByType,
    searchMedia,
    getRecommendations
  };

  return (
    <MultimediaContext.Provider value={value}>
      {children}
    </MultimediaContext.Provider>
  );
};
