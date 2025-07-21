import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Edit3, MapPin, Calendar, Link, Heart, Bookmark, Grid, Settings, Users, Star, Plus, X, Play, Tag, Instagram, Twitter, Youtube, Facebook, Globe, CheckCircle, Award, Diamond, Briefcase, CreditCard, Zap, Video, Image, MessageCircle, Share2, Eye, Search, Bot, Wallet, TrendingUp, ArrowUpRight, ExternalLink, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Music, Disc, Headphones, Download, Library } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmationModal } from '../components/ConfirmationModal';

// Import sample images
import profileImg from '../assets/Images/img (1).jpg';
import post1 from '../assets/Images/img (2).jpg';
import post2 from '../assets/Images/img (3).jpg';
import post3 from '../assets/Images/img (4).jpg';
import post4 from '../assets/Images/img (5).jpg';
import post5 from '../assets/Images/img (6).jpg';
import post6 from '../assets/Images/img (7).jpg';
import highlight1 from '../assets/Images/img (8).jpg';
import highlight2 from '../assets/Images/img (9).jpg';
import highlight3 from '../assets/Images/img (10).jpg';

// Define Song interface
interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  album: string;
  year: string;
  image: string;
  audioUrl?: string;
  isLocal?: boolean;
}

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  padding: 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.colors.primary};
`;

const ImageUploadButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Username = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  margin-bottom: 16px;
`;

const Bio = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  line-height: 1.5;
  margin-bottom: 16px;
  max-width: 500px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const StatNumber = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const StatLabel = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const HighlightsSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HighlightsContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 16px 0;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }
`;

const HighlightItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 80px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const HighlightImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

const HighlightTitle = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  text-align: center;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AddHighlight = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px dashed ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContentTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border: none;
  background: none;
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: ${({ active }) => active ? 'scaleX(1)' : 'scaleX(0)'};
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const PostCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 16px;
`;

const PostStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const EditModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

const EditModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 32px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const VerificationBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`;

// Reels Modal Styles
const ReelsModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 20px;
`;

const ReelsContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  height: 90vh;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
  }
`;

const ReelsVideoContainer = styled.div`
  flex: 1;
  max-width: 500px;
  position: relative;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ReelsVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ReelsControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 80px;
  color: white;
  z-index: 10;
`;

const ReelsActions = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  color: white;
  z-index: 10;
`;

const ReelsActionButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ReelsInfo = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 24px;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    flex: none;
    height: 200px;
  }
`;

const ReelsCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Story Modal Styles
const StoryModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 20px;
`;

const StoryContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  height: 80vh;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StoryProgress = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  gap: 4px;
  z-index: 10;
`;

const StoryProgressBar = styled.div<{ active: boolean; progress: number }>`
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    background: white;
    width: ${({ active, progress }) => active ? `${progress}%` : '0%'};
    transition: width 0.1s linear;
  }
`;

const StoryNavigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 5;
`;

const StoryNavButton = styled.button`
  flex: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

const StoryCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const StoryInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  color: white;
  z-index: 10;
`;

const StoryUsername = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`;

const StoryTimestamp = styled.p`
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
`;

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showStoriesModal, setShowStoriesModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showReelsModal, setShowReelsModal] = useState(false);
  const [selectedReel, setSelectedReel] = useState<any>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const { user, updateUser } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    username: user?.username || '@johndoe',
    bio: 'Digital creator & tech enthusiast. Building the future one line of code at a time. 🚀\n\n🔗 Links: Instagram | YouTube | Twitter',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    joinDate: 'March 2020',
    verified: true,
    verificationLevel: 'blue', // blue, gold, black, diamond
    socialLinks: {
      instagram: 'https://instagram.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
      youtube: 'https://youtube.com/johndoe',
      facebook: 'https://facebook.com/johndoe',
      website: 'https://johndoe.dev'
    },
    businessInfo: {
      isBusinessAccount: false,
      businessName: '',
      businessCategory: '',
      businessDescription: '',
      businessEmail: '',
      businessPhone: ''
    }
  });
  
  const [stats] = useState({
    posts: 127,
    reels: 45,
    followers: 1250,
    following: 384,
    stories: 8,
    earnings: 1250.75
  });
  
  const [highlights] = useState([
    { id: 1, title: 'Travel', image: highlight1 },
    { id: 2, title: 'Code', image: highlight2 },
    { id: 3, title: 'Food', image: highlight3 }
  ]);
  
  const [stories] = useState([
    { id: 1, image: post1, viewed: false, timestamp: new Date() },
    { id: 2, image: post2, viewed: true, timestamp: new Date() },
    { id: 3, image: post3, viewed: false, timestamp: new Date() }
  ]);
  
  const [posts] = useState([
    { id: 1, image: post1, likes: 45, comments: 12, type: 'image', tags: ['travel', 'sunset', 'nature'] },
    { id: 2, image: post2, likes: 78, comments: 23, type: 'image', tags: ['code', 'programming', 'tech'] },
    { id: 3, image: post3, likes: 92, comments: 34, type: 'image', tags: ['food', 'cooking', 'recipe'] },
    { id: 4, image: post4, likes: 156, comments: 45, type: 'image', tags: ['fitness', 'workout', 'health'] },
    { id: 5, image: post5, likes: 203, comments: 67, type: 'image', tags: ['art', 'design', 'creative'] },
    { id: 6, image: post6, likes: 89, comments: 21, type: 'image', tags: ['music', 'concert', 'live'] }
  ]);
  
  const [reels] = useState([
    { id: 1, video: post1, likes: 234, comments: 45, views: 5600, duration: '0:15', tags: ['funny', 'viral', 'trending'] },
    { id: 2, video: post2, likes: 456, comments: 78, views: 8900, duration: '0:30', tags: ['tutorial', 'howto', 'tips'] },
    { id: 3, video: post3, likes: 789, comments: 123, views: 12300, duration: '0:45', tags: ['dance', 'music', 'entertainment'] },
    { id: 4, video: post4, likes: 345, comments: 67, views: 6700, duration: '0:25', tags: ['lifestyle', 'daily', 'vlog'] }
  ]);
  
  const [taggedPosts] = useState([
    { id: 1, image: post1, likes: 45, comments: 12, taggedBy: '@friend1' },
    { id: 2, image: post3, likes: 92, comments: 34, taggedBy: '@friend2' },
    { id: 3, image: post5, likes: 203, comments: 67, taggedBy: '@friend3' }
  ]);
  
  const [likedPosts] = useState([
    { id: 1, image: post2, likes: 78, comments: 23 },
    { id: 2, image: post4, likes: 156, comments: 45 },
    { id: 3, image: post6, likes: 89, comments: 21 }
  ]);
  
  const [savedPosts] = useState([
    { id: 1, image: post1, likes: 45, comments: 12 },
    { id: 2, image: post3, likes: 92, comments: 34 },
    { id: 3, image: post5, likes: 203, comments: 67 }
  ]);
  
  const [walletData] = useState({
    balance: 1250.75,
    totalEarnings: 5430.25,
    pendingPayments: 125.50,
    transactions: [
      { id: 1, type: 'earning', amount: 45.00, description: 'Post monetization', date: '2024-01-15' },
      { id: 2, type: 'withdrawal', amount: -200.00, description: 'Bank transfer', date: '2024-01-14' },
      { id: 3, type: 'earning', amount: 78.50, description: 'Reel bonus', date: '2024-01-13' }
    ]
  });
  
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedData = {
      ...profileData,
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
      location: formData.get('location') as string,
      website: formData.get('website') as string,
    };
    
    // Update local profile state
    setProfileData(updatedData);
    
    // Sync with AuthContext to persist globally
    updateUser({
      name: updatedData.name,
      // Add any other user fields that should be synced
    });
    
    setShowEditModal(false);
  };
  
  const handleDeleteAccount = () => {
    // In a real app, this would delete the account
    alert('Account deletion functionality would be implemented here');
    setShowDeleteModal(false);
  };
  
  const [musicData] = useState({
    favorites: [
      { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', genre: 'Rock', duration: '5:55', album: 'A Night at the Opera', year: '1975', image: post1 },
      { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', genre: 'Pop', duration: '3:20', album: 'After Hours', year: '2020', image: post2 },
      { id: 3, title: 'Hotel California', artist: 'Eagles', genre: 'Rock', duration: '6:30', album: 'Hotel California', year: '1976', image: post3 },
      { id: 4, title: 'Shape of You', artist: 'Ed Sheeran', genre: 'Pop', duration: '3:53', album: '÷ (Divide)', year: '2017', image: post4 },
      { id: 5, title: 'Stairway to Heaven', artist: 'Led Zeppelin', genre: 'Rock', duration: '8:02', album: 'Led Zeppelin IV', year: '1971', image: post5 },
      { id: 6, title: 'Imagine', artist: 'John Lennon', genre: 'Pop', duration: '3:03', album: 'Imagine', year: '1971', image: post6 },
      { id: 7, title: 'Billie Jean', artist: 'Michael Jackson', genre: 'Pop', duration: '4:54', album: 'Thriller', year: '1982', image: post1 },
      { id: 8, title: 'Smells Like Teen Spirit', artist: 'Nirvana', genre: 'Grunge', duration: '5:01', album: 'Nevermind', year: '1991', image: post2 },
      { id: 9, title: 'Hey Jude', artist: 'The Beatles', genre: 'Rock', duration: '7:11', album: 'The Beatles (White Album)', year: '1968', image: post3 },
      { id: 10, title: 'Purple Rain', artist: 'Prince', genre: 'Rock', duration: '8:41', album: 'Purple Rain', year: '1984', image: post4 },
      { id: 11, title: 'Like a Rolling Stone', artist: 'Bob Dylan', genre: 'Folk Rock', duration: '6:13', album: 'Highway 61 Revisited', year: '1965', image: post5 },
      { id: 12, title: 'Sweet Child O Mine', artist: 'Guns N Roses', genre: 'Hard Rock', duration: '5:03', album: 'Appetite for Destruction', year: '1987', image: post6 },
      { id: 13, title: 'Watermelon Sugar', artist: 'Harry Styles', genre: 'Pop', duration: '2:54', album: 'Fine Line', year: '2020', image: post1 },
      { id: 14, title: 'bad guy', artist: 'Billie Eilish', genre: 'Pop', duration: '3:14', album: 'When We All Fall Asleep', year: '2019', image: post2 },
      { id: 15, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', genre: 'Funk', duration: '4:30', album: 'Uptown Special', year: '2014', image: post3 }
    ],
    playlists: [
      { id: 1, name: 'Workout Hits', songCount: 45, image: post1, description: 'High-energy tracks for your fitness routine' },
      { id: 2, name: 'Chill Vibes', songCount: 32, image: post2, description: 'Relaxing songs for unwinding' },
      { id: 3, name: 'Road Trip', songCount: 67, image: post3, description: 'Perfect tracks for long drives' },
      { id: 4, name: 'Party Mix', songCount: 28, image: post4, description: 'Dance floor favorites' },
      { id: 5, name: 'Study Sessions', songCount: 54, image: post5, description: 'Focus music for productivity' },
      { id: 6, name: 'Classic Rock', songCount: 89, image: post6, description: 'Timeless rock anthems' }
    ],
    recentlyPlayed: [
      { id: 1, title: 'Levitating', artist: 'Dua Lipa', genre: 'Pop', duration: '3:23', album: 'Future Nostalgia', year: '2020', image: post1 },
      { id: 2, title: 'Good 4 U', artist: 'Olivia Rodrigo', genre: 'Pop Rock', duration: '2:58', album: 'SOUR', year: '2021', image: post2 },
      { id: 3, title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', genre: 'Pop', duration: '2:21', album: 'Stay', year: '2021', image: post3 },
      { id: 4, title: 'Heat Waves', artist: 'Glass Animals', genre: 'Indie Pop', duration: '3:58', album: 'Dreamland', year: '2020', image: post4 },
      { id: 5, title: 'As It Was', artist: 'Harry Styles', genre: 'Pop', duration: '2:47', album: 'Harrys House', year: '2022', image: post5 }
    ]
  });
  
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat all, 2: repeat one
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(musicData.favorites);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [localMusicLibrary, setLocalMusicLibrary] = useState<any[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Music Player Functions
  const playSong = (song: any, playlist = musicData.favorites) => {
    setCurrentSong(song);
    setCurrentPlaylist(playlist);
    setCurrentSongIndex(playlist.findIndex((s: any) => s.id === song.id));
    setIsPlaying(true);
    setShowMusicPlayer(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    let nextIndex = currentSongIndex + 1;
    if (nextIndex >= currentPlaylist.length) {
      nextIndex = repeatMode === 1 ? 0 : currentSongIndex; // If repeat all, go to start
    }
    if (nextIndex !== currentSongIndex) {
      const nextSong = currentPlaylist[nextIndex];
      setCurrentSong(nextSong);
      setCurrentSongIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const prevSong = () => {
    let prevIndex = currentSongIndex - 1;
    if (prevIndex < 0) {
      prevIndex = repeatMode === 1 ? currentPlaylist.length - 1 : 0; // If repeat all, go to end
    }
    if (prevIndex !== currentSongIndex) {
      const prevSong = currentPlaylist[prevIndex];
      setCurrentSong(prevSong);
      setCurrentSongIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Local Music Upload Functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('audio/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const audioUrl = e.target?.result as string;
            const newSong = {
              id: Date.now() + Math.random(),
              title: file.name.replace(/\.[^/.]+$/, ""),
              artist: 'Unknown Artist',
              genre: 'Unknown',
              duration: '0:00',
              album: 'Local Library',
              year: new Date().getFullYear().toString(),
              image: post1, // Default image for local files
              audioUrl: audioUrl,
              isLocal: true
            };
            setLocalMusicLibrary(prev => [...prev, newSong]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
    setShowUploadModal(false);
  };

  const deleteLocalSong = (songId: any) => {
    setLocalMusicLibrary(prev => prev.filter(song => song.id !== songId));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <PostsGrid>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: post.id * 0.1 }}
              >
                <PostImage src={post.image} alt={`Post ${post.id}`} />
                <PostContent>
                  <PostStats>
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </PostStats>
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {post.tags.map((tag, index) => (
                      <span key={index} style={{ 
                        background: '#667eea20', 
                        color: '#667eea', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px' 
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </PostContent>
              </PostCard>
            ))}
          </PostsGrid>
        );
        
      case 'reels':
        return (
          <PostsGrid>
            {reels.map((reel) => (
              <PostCard
                key={reel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reel.id * 0.1 }}
                onClick={() => {
                  setSelectedReel(reel);
                  setShowReelsModal(true);
                }}
              >
                <div style={{ position: 'relative' }}>
                  <PostImage src={reel.video} alt={`Reel ${reel.id}`} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0,0,0,0.7)',
                    borderRadius: '50%',
                    padding: '12px',
                    color: 'white'
                  }}>
                    <Play size={24} />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {reel.duration}
                  </div>
                </div>
                <PostContent>
                  <PostStats>
                    <span>{reel.likes} likes</span>
                    <span>{reel.comments} comments</span>
                    <span>{reel.views} views</span>
                  </PostStats>
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {reel.tags.map((tag, index) => (
                      <span key={index} style={{ 
                        background: '#667eea20', 
                        color: '#667eea', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px' 
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </PostContent>
              </PostCard>
            ))}
          </PostsGrid>
        );
        
      case 'tagged':
        return (
          <PostsGrid>
            {taggedPosts.map((post) => (
              <PostCard
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: post.id * 0.1 }}
              >
                <PostImage src={post.image} alt={`Tagged post ${post.id}`} />
                <PostContent>
                  <PostStats>
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </PostStats>
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#667eea' }}>
                    Tagged by {post.taggedBy}
                  </div>
                </PostContent>
              </PostCard>
            ))}
          </PostsGrid>
        );
        
case 'music':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Upload Music Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: '#2d3748' }}>Local Music Library</h3>
                <button
                  onClick={() => setShowUploadModal(true)}
                  style={{
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px'
                  }}
                >
                  <Download size={16} />
                  Upload Music
                </button>
              </div>
              
              {localMusicLibrary.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {localMusicLibrary.map((song) => (
                    <div key={song.id} style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#667eea20',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#667eea'
                      }} onClick={() => playSong(song, localMusicLibrary)}>
                        {currentSong?.id === song.id && isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </div>
                      <img src={song.image} alt={song.title} style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '4px',
                        objectFit: 'cover'
                      }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '14px' }}>{song.title}</h4>
                        <p style={{ margin: 0, color: '#718096', fontSize: '12px' }}>{song.artist} • {song.album}</p>
                      </div>
                      <button
                        onClick={() => deleteLocalSong(song.id)}
                        style={{
                          background: '#fc8181',
                          color: 'white',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  background: '#f7fafc',
                  border: '2px dashed #e2e8f0',
                  borderRadius: '8px',
                  padding: '24px',
                  textAlign: 'center',
                  color: '#718096'
                }}>
                  <Music size={48} style={{ margin: '0 auto 12px' }} />
                  <p style={{ margin: 0, fontSize: '14px' }}>No local music files uploaded yet</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Click "Upload Music" to add your favorite songs</p>
                </div>
              )}
            </div>
            
            {/* Music Playlists */}
            <div>
              <h3 style={{ marginBottom: '16px', color: '#2d3748' }}>My Playlists</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {musicData.playlists.map((playlist) => (
                  <div key={playlist.id} style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }} onClick={() => setCurrentSong(musicData.favorites.find(song => song.title === playlist.name) || null)}>
                    <img src={playlist.image} alt={playlist.name} style={{
                      width: '100%',
                      height: '120px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      marginBottom: '12px'
                    }} />
                    <h4 style={{ margin: '0 0 4px 0', color: '#2d3748' }}>{playlist.name}</h4>
                    <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>{playlist.songCount} songs</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Favorite Songs */}
            <div>
              <h3 style={{ marginBottom: '16px', color: '#2d3748' }}>Favorite Songs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {musicData.favorites.map((song) => (
                  <div key={song.id} style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }} onClick={() => playSong(song)}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#667eea20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#667eea'
                    }}>
                      {currentSong?.id === song.id && isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', color: '#2d3748', fontSize: '14px' }}>{song.title}</h4>
                      <p style={{ margin: 0, color: '#718096', fontSize: '12px' }}>{song.artist} • {song.genre}</p>
                    </div>
                    <span style={{ color: '#718096', fontSize: '12px' }}>{song.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Music Player */}
            {showMusicPlayer && currentSong && (
              <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
                <img src={currentSong.image} alt={currentSong.title} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', color: '#2d3748' }}>{currentSong.title}</h4>
                  <p style={{ margin: 0, color: '#718096', fontSize: '14px' }}>{currentSong.artist} • {currentSong.genre}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={prevSong} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <SkipBack size={20} color='#718096' />
                  </button>
                  <button onClick={togglePlayPause} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    {isPlaying ? <Pause size={20} color='#2d3748' /> : <Play size={20} color='#2d3748' />}
                  </button>
                  <button onClick={nextSong} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <SkipForward size={20} color='#718096' />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'liked':
        return (
          <PostsGrid>
            {likedPosts.map((post) => (
              <PostCard
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: post.id * 0.1 }}
              >
                <PostImage src={post.image} alt={`Liked post ${post.id}`} />
                <PostContent>
                  <PostStats>
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </PostStats>
                </PostContent>
              </PostCard>
            ))}
          </PostsGrid>
        );
        
      case 'saved':
        return (
          <PostsGrid>
            {savedPosts.map((post) => (
              <PostCard
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: post.id * 0.1 }}
              >
                <PostImage src={post.image} alt={`Saved post ${post.id}`} />
                <PostContent>
                  <PostStats>
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </PostStats>
                </PostContent>
              </PostCard>
            ))}
          </PostsGrid>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImageContainer>
          <ProfileImage src={profileImg} alt="Profile" />
          <ImageUploadButton>
            <Camera size={20} />
          </ImageUploadButton>
        </ProfileImageContainer>
        
        <ProfileInfo>
          <ProfileName>
            {profileData.name}
            {profileData.verified && (
              <VerificationBadge>
                <Star size={12} />
              </VerificationBadge>
            )}
          </ProfileName>
          <Username>{profileData.username}</Username>
          <Bio>{profileData.bio}</Bio>
          
          <ProfileDetails>
            <DetailItem>
              <MapPin size={16} />
              {profileData.location}
            </DetailItem>
            <DetailItem>
              <Link size={16} />
              {profileData.website}
            </DetailItem>
            <DetailItem>
              <Calendar size={16} />
              Joined {profileData.joinDate}
            </DetailItem>
          </ProfileDetails>
          
          <ProfileStats>
            <StatItem>
              <StatNumber>{stats.posts}</StatNumber>
              <StatLabel>Posts</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{stats.followers}</StatNumber>
              <StatLabel>Followers</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{stats.following}</StatNumber>
              <StatLabel>Following</StatLabel>
            </StatItem>
          </ProfileStats>
          
          <ActionButtons>
            <ActionButton
              onClick={() => setShowEditModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit3 size={16} />
              Edit Profile
            </ActionButton>
            <SecondaryButton
              onClick={() => setShowDeleteModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings size={16} />
              Account Settings
            </SecondaryButton>
          </ActionButtons>
        </ProfileInfo>
      </ProfileHeader>
      
      <HighlightsSection>
        <SectionTitle>Highlights</SectionTitle>
        <HighlightsContainer>
          {highlights.map((highlight) => (
            <HighlightItem key={highlight.id}>
              <HighlightImage src={highlight.image} alt={highlight.title} />
              <HighlightTitle>{highlight.title}</HighlightTitle>
            </HighlightItem>
          ))}
          <HighlightItem>
            <AddHighlight>
              <Plus size={24} />
            </AddHighlight>
            <HighlightTitle>Add</HighlightTitle>
          </HighlightItem>
        </HighlightsContainer>
      </HighlightsSection>
      
      <ContentTabs>
        <Tab
          active={activeTab === 'posts'}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={20} />
          Posts
        </Tab>
        <Tab
          active={activeTab === 'reels'}
          onClick={() => setActiveTab('reels')}
        >
          <Video size={20} />
          Reels
        </Tab>
        <Tab
          active={activeTab === 'tagged'}
          onClick={() => setActiveTab('tagged')}
        >
          <Tag size={20} />
          Tagged
        </Tab>
        <Tab
          active={activeTab === 'liked'}
          onClick={() => setActiveTab('liked')}
        >
          <Heart size={20} />
          Liked
        </Tab>
        <Tab
          active={activeTab === 'saved'}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark size={20} />
          Saved
        </Tab>
        <Tab
          active={activeTab === 'music'}
          onClick={() => setActiveTab('music')}
        >
          <Play size={20} />
          Music
        </Tab>
      </ContentTabs>
      
      {renderContent()}
      
      <AnimatePresence>
        {showEditModal && (
          <EditModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEditModal(false)}
          >
            <EditModalContent
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SectionTitle>Edit Profile</SectionTitle>
              <EditForm onSubmit={handleEditSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={profileData.name}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="bio">Bio</Label>
                  <TextArea
                    id="bio"
                    name="bio"
                    defaultValue={profileData.bio}
                    placeholder="Tell us about yourself..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={profileData.location}
                    placeholder="Where are you from?"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    defaultValue={profileData.website}
                    placeholder="https://yourwebsite.com"
                  />
                </FormGroup>
                <ButtonGroup>
                  <SecondaryButton
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </SecondaryButton>
                  <ActionButton type="submit">
                    Save Changes
                  </ActionButton>
                </ButtonGroup>
              </EditForm>
            </EditModalContent>
          </EditModal>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showReelsModal && selectedReel && (
          <ReelsModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReelsModal(false)}
          >
            <ReelsContainer onClick={(e) => e.stopPropagation()}>
              <ReelsVideoContainer>
                <ReelsVideo
                  src={selectedReel.video}
                  autoPlay
                  muted
                  loop
                  controls={false}
                />
                <ReelsCloseButton onClick={() => setShowReelsModal(false)}>
                  <X size={20} />
                </ReelsCloseButton>
                <ReelsControls>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>@{profileData.username}</strong>
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>
                    Check out this amazing reel! 🎬
                  </div>
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {selectedReel.tags.map((tag: string, index: number) => (
                      <span key={index} style={{ 
                        background: 'rgba(255,255,255,0.2)', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px' 
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </ReelsControls>
                <ReelsActions>
                  <div style={{ textAlign: 'center' }}>
                    <ReelsActionButton>
                      <Heart size={24} />
                    </ReelsActionButton>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>{selectedReel.likes}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <ReelsActionButton>
                      <MessageCircle size={24} />
                    </ReelsActionButton>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>{selectedReel.comments}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <ReelsActionButton>
                      <Share2 size={24} />
                    </ReelsActionButton>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>Share</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <ReelsActionButton>
                      <Eye size={24} />
                    </ReelsActionButton>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>{selectedReel.views}</div>
                  </div>
                </ReelsActions>
              </ReelsVideoContainer>
              <ReelsInfo>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Video size={20} />
                    Reel Details
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Duration: {selectedReel.duration}</span>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Views: {selectedReel.views}</span>
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 12px 0' }}>Engagement</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Heart size={16} color="#e53e3e" />
                      <span>{selectedReel.likes} likes</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MessageCircle size={16} color="#3182ce" />
                      <span>{selectedReel.comments} comments</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Eye size={16} color="#38a169" />
                      <span>{selectedReel.views} views</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 12px 0' }}>Tags</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedReel.tags.map((tag: string, index: number) => (
                      <span key={index} style={{ 
                        background: '#667eea20', 
                        color: '#667eea', 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        border: '1px solid #667eea30'
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ReelsInfo>
            </ReelsContainer>
          </ReelsModal>
        )}
      </AnimatePresence>
      
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
        confirmText="Delete Account"
        cancelText="Cancel"
        variant="danger"
      />
    </ProfileContainer>
  );
};
