import React, { useState } from 'react';
import styled from 'styled-components';
import { Image, Video, Calendar, MapPin, Smile, Send } from 'lucide-react';
import logo from '../assets/Logo/ASTRA-removebg-preview.png';

const CreatePostContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.createShadow(1, theme)};
`;

const CreatePostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

const TextArea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  min-height: 80px;
  font-family: inherit;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const MediaActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MediaButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const PostButton = styled.button<{ $disabled?: boolean }>`
  background: ${({ theme, $disabled }) => $disabled ? theme.colors.textSecondary : theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    opacity: ${({ $disabled }) => $disabled ? 0.5 : 0.9};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const CharacterCount = styled.div<{ $isOverLimit?: boolean }>`
  color: ${({ theme, $isOverLimit }) => $isOverLimit ? theme.colors.error : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const PreviewImage = styled.div`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const PreviewImageContent = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

interface CreatePostProps {
  onPost?: (content: string, image?: File) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const maxCharacters = 280;

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handlePost = () => {
    if (content.trim() || selectedImage) {
      onPost?.(content, selectedImage || undefined);
      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const isOverLimit = content.length > maxCharacters;
  const canPost = (content.trim() || selectedImage) && !isOverLimit;

  return (
    <CreatePostContainer>
      <CreatePostHeader>
        <Avatar src={logo} alt="Your Avatar" />
        <TextArea
          placeholder="What's happening in the Astra universe?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={maxCharacters + 50} // Allow some overflow for warning
        />
      </CreatePostHeader>

      {imagePreview && (
        <PreviewImage>
          <PreviewImageContent src={imagePreview} alt="Preview" />
          <RemoveImageButton onClick={handleRemoveImage}>
            ×
          </RemoveImageButton>
        </PreviewImage>
      )}

      <PostActions>
        <MediaActions>
          <MediaButton onClick={() => document.getElementById('image-input')?.click()}>
            <Image />
            <span>Photo</span>
          </MediaButton>
          <MediaButton>
            <Video />
            <span>Video</span>
          </MediaButton>
          <MediaButton>
            <Calendar />
            <span>Event</span>
          </MediaButton>
          <MediaButton>
            <MapPin />
            <span>Location</span>
          </MediaButton>
          <MediaButton>
            <Smile />
            <span>Mood</span>
          </MediaButton>
        </MediaActions>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CharacterCount $isOverLimit={isOverLimit}>
            {maxCharacters - content.length}
          </CharacterCount>
          <PostButton $disabled={!canPost} onClick={handlePost}>
            <Send />
            Post
          </PostButton>
        </div>
      </PostActions>

      <HiddenFileInput
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
      />
    </CreatePostContainer>
  );
};
