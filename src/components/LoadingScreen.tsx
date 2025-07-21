import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../assets/Logo/ASTRA-removebg-preview.png';

const rotateGlow = keyframes`
  0% {
    transform: rotate(0deg);
    filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.5));
  }
  25% {
    filter: drop-shadow(0 0 20px rgba(118, 75, 162, 0.7));
  }
  50% {
    transform: rotate(180deg);
    filter: drop-shadow(0 0 30px rgba(240, 147, 251, 0.8));
  }
  75% {
    filter: drop-shadow(0 0 20px rgba(118, 75, 162, 0.7));
  }
  100% {
    transform: rotate(360deg);
    filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.5));
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
`;

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LogoContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  animation: ${rotateGlow} 2s infinite linear;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
`;

const LoadingText = styled(motion.h1)`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const LoadingSubtext = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 400px;
`;

const LoadingBar = styled(motion.div)`
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const LoadingProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #ffffff, #f093fb, #ffffff);
  border-radius: 2px;
  width: 0%;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  animation: ${pulse} 1.5s infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <LoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LogoContainer
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Logo src={logo} alt="Astra Logo" />
      </LogoContainer>

      <LoadingText
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Welcome to Astra
      </LoadingText>

      <LoadingSubtext
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        The future of social networking is here. Connect, share, and explore in a whole new way.
        <br /><br />
        Developed by NEF
        <br />
        Silver Studio V1.1.0
      </LoadingSubtext>

      <LoadingBar
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 300, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <LoadingProgress
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </LoadingBar>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}
      >
        {Math.round(progress)}% Complete
      </motion.div>

      <LoadingDots>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </LoadingDots>
    </LoadingContainer>
  );
};
