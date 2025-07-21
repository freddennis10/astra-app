import React from 'react';
import styled from 'styled-components';
import { Post } from '../components/Post';
import { CreatePost } from '../components/CreatePost';
import { Stories } from '../components/Stories';

const FeedContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const FeedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WelcomeMessage = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const WelcomeTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`;

const WelcomeText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const Feed: React.FC = () => {
  // Sample posts data
  const samplePosts = [
    {
      id: '1',
      author: {
        name: 'John Doe',
        username: '@johndoe',
        avatar: '/assets/images/avatar1.jpg'
      },
      content: 'Just launched my new project! Excited to share it with the ASTRA community 🚀',
      timestamp: '2 hours ago',
      likes: 42,
      comments: 8,
      shares: 12,
      bookmarks: 5,
      image: '/assets/images/content1.jpg'
    },
    {
      id: '2',
      author: {
        name: 'Jane Smith',
        username: '@janesmith',
        avatar: '/assets/images/avatar2.jpg'
      },
      content: 'Beautiful sunset today! Nature never fails to amaze me 🌅',
      timestamp: '4 hours ago',
      likes: 128,
      comments: 23,
      shares: 34,
      bookmarks: 15,
      image: '/assets/images/content2.jpg'
    },
    {
      id: '3',
      author: {
        name: 'Alex Johnson',
        username: '@alexj',
        avatar: '/assets/images/avatar3.jpg'
      },
      content: 'Working on some exciting features for the next update. Can\'t wait to show you all! 💻',
      timestamp: '6 hours ago',
      likes: 89,
      comments: 12,
      shares: 8,
      bookmarks: 7
    }
  ];

  return (
    <FeedContainer>
      <FeedContent>
        <WelcomeMessage>
          <WelcomeTitle>Welcome to ASTRA</WelcomeTitle>
          <WelcomeText>
            Connect, share, and discover amazing content from your community
          </WelcomeText>
        </WelcomeMessage>

        <Stories />
        <CreatePost />
        
        {samplePosts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </FeedContent>
    </FeedContainer>
  );
};

export default Feed;
