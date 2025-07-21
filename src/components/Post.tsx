import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Heart, MessageCircle, Share, MoreHorizontal, Bookmark, Play, Pause, Volume2, VolumeX, Repeat, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PostProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
    followerCount?: number;
    isLive?: boolean;
  };
  content: string;
  image?: string | null;
  video?: string | null;
  audio?: string | null;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  liked?: boolean;
  bookmarked?: boolean;
  type?: 'text' | 'image' | 'video' | 'audio' | 'live';
  tags?: string[];
  location?: string;
  mood?: string;
  isThreaded?: boolean;
  threadCount?: number;
}

const PostContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.createShadow(1, theme)};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.createShadow(3, theme)};
    transform: translateY(-2px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.gradient};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  span {
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const VerifiedBadge = styled.div`
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
`;

const Username = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const Timestamp = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const PostContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.md};
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ActionButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  span {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
`;

const BookmarkButton = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Post: React.FC<PostProps> = ({
  id,
  author,
  content,
  image,
  timestamp,
  likes,
  comments,
  shares,
  liked = false,
  bookmarked = false,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <PostContainer>
      <PostHeader>
        <UserInfo>
          <Avatar src={author.avatar} alt={author.name} />
          <UserDetails>
            <UserName>
              <span>{author.name}</span>
              {author.verified && <VerifiedBadge>✓</VerifiedBadge>}
            </UserName>
            <Username>@{author.username} • {timestamp}</Username>
          </UserDetails>
        </UserInfo>
        <MoreButton>
          <MoreHorizontal />
        </MoreButton>
      </PostHeader>

      <PostContent>{content}</PostContent>

      {image && <PostImage src={image} alt="Post content" />}

      <PostActions>
        <ActionGroup>
          <ActionButton $active={isLiked} onClick={handleLike}>
            <Heart fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likeCount}</span>
          </ActionButton>
          <ActionButton>
            <MessageCircle />
            <span>{comments}</span>
          </ActionButton>
          <ActionButton>
            <Share />
            <span>{shares}</span>
          </ActionButton>
        </ActionGroup>
        
        <BookmarkButton $active={isBookmarked} onClick={handleBookmark}>
          <Bookmark fill={isBookmarked ? 'currentColor' : 'none'} />
        </BookmarkButton>
      </PostActions>
    </PostContainer>
  );
};
