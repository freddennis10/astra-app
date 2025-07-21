import React from 'react';
import styled from 'styled-components';

const LiveContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

const LiveStream = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const StreamPlaceholder = styled.div`
  background: ${({ theme }) => theme.colors.secondary}20;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 20px;
`;

const StreamInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const StreamTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ViewerCount = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-weight: bold;
`;

const StreamDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const Live: React.FC = () => {
  return (
    <LiveContainer>
      <PageTitle>🔴 Live Streams</PageTitle>
      
      <LiveStream>
        <StreamPlaceholder>
          🎥 Live streaming feature coming soon!
          <br />
          Watch live content from your favorite creators
        </StreamPlaceholder>
        <StreamInfo>
          <StreamTitle>Featured Live Stream</StreamTitle>
          <ViewerCount>● 1,234 watching</ViewerCount>
        </StreamInfo>
        <StreamDescription>
          Join the live conversation and interact with streamers in real-time
        </StreamDescription>
      </LiveStream>

      <LiveStream>
        <StreamPlaceholder>
          📺 Start your own live stream
          <br />
          Share your moments with the world
        </StreamPlaceholder>
        <StreamInfo>
          <StreamTitle>Go Live</StreamTitle>
          <ViewerCount>● Ready to stream</ViewerCount>
        </StreamInfo>
        <StreamDescription>
          Click to start broadcasting to your followers
        </StreamDescription>
      </LiveStream>
    </LiveContainer>
  );
};

export default Live;
