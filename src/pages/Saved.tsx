import React from 'react';
import styled from 'styled-components';

const SavedContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SavedTitle = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const SavedMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Saved: React.FC = () => {
  return (
    <SavedContainer>
      <SavedTitle>Your Saved Posts</SavedTitle>
      <SavedMessage>Here you'll find all the posts you've saved for later. Enjoy exploring your favorite content!</SavedMessage>
      {/* Add actual saved posts rendering here */}
    </SavedContainer>
  );
};

export default Saved;
