import React from 'react';
import styled from 'styled-components';

const NoticeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  color: #333;
  text-align: center;
  font-size: 1.5rem;
  padding: 20px;
`;

const OfflineNotice: React.FC = () => {
  return (
    <NoticeContainer>
      <p>You are currently offline. Please check your internet connection.</p>
    </NoticeContainer>
  );
};

export default OfflineNotice;

