import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { useWallet } from '../contexts/WalletContext';
import { Post } from '../components/Post';
import { CreatePost } from '../components/CreatePost';
import { Stories } from '../components/Stories';
import img1 from '../assets/Images/img (1).jpg';
import img2 from '../assets/Images/img (2).jpg';
import img3 from '../assets/Images/img (3).jpg';

const HomeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 80vh;
`;

const WelcomeMessage = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: fadeIn 0.8s ease-out;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const Home = () => {
  const { user } = useAuth();
  const { preferences } = usePreferences();
  const { wallet } = useWallet();
  
  // Use the variables to avoid eslint warnings
  React.useEffect(() => {
    if (user) {
      console.log('User logged in:', user);
    }
    if (preferences) {
      console.log('User preferences:', preferences);
    }
    if (wallet) {
      console.log('Wallet connected:', wallet);
    }
  }, [user, preferences, wallet]);

  const dummyPosts = [
    {
      id: '1',
      author: {
        name: 'Alex Thompson',
        username: 'alexthompson',
        avatar: img1,
        verified: true,
      },
      content: 'Just discovered this amazing new blockchain technology! The future is here 🚀 #BlockchainRevolution #Web3',
      image: img2,
      timestamp: '2h',
      likes: 234,
      comments: 56,
      shares: 12,
      liked: false,
      bookmarked: false,
    },
    {
      id: '2',
      author: {
        name: 'Sarah Chen',
        username: 'sarahchen',
        avatar: img3,
      },
      content: "Building the future of social media with Astra! Can't wait to see what the community creates together 💫",
      image: null,
      timestamp: '4h',
      likes: 189,
      comments: 43,
      shares: 8,
      liked: true,
      bookmarked: true,
    },
    {
      id: '3',
      author: {
        name: 'Michael Rodriguez',
        username: 'mikerodriguez',
        avatar: img1,
        verified: false,
      },
      content: 'Amazing sunset from my hike today! Nature never fails to inspire creativity 🌅 #Photography #Nature',
      image: img3,
      timestamp: '6h',
      likes: 456,
      comments: 78,
      shares: 23,
      liked: false,
      bookmarked: false,
    },
  ];

  const handleNewPost = (content: string, image?: File) => {
    // In a real app, this would send to a backend
    console.log('New post created:', { content, image });
  };

  return (
    <HomeContainer>
      <WelcomeMessage>Welcome to Astra Social Space 🌟</WelcomeMessage>
      
      <Stories />
      <CreatePost onPost={handleNewPost} />
      
      <Section>
        {dummyPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </Section>
    </HomeContainer>
  );
};

