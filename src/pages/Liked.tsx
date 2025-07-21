import React from 'react';
import styled from 'styled-components';

const LikedContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const LikedTitle = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const LikedMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Liked: React.FC = () => {
  return (
    <LikedContainer>
      <LikedTitle>Your Liked Posts</LikedTitle>
      <LikedMessage>Here you'll find all the posts you've liked. Great memories and content await!</LikedMessage>
      {/* Add actual liked posts rendering here */}
    </LikedContainer>
  );
};

export default Liked;
