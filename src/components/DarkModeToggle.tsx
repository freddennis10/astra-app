import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ToggleButton = styled.button<{ $isDark: boolean }>`
  position: relative;
  width: 60px;
  height: 32px;
  background: ${({ $isDark, theme }) => 
    $isDark 
      ? 'linear-gradient(45deg, #1e293b, #334155)' 
      : 'linear-gradient(45deg, #60a5fa, #3b82f6)'
  };
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ToggleSlider = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $isDark }) => ($isDark ? '30px' : '2px')};
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  svg {
    width: 16px;
    height: 16px;
    color: ${({ $isDark, theme }) => 
      $isDark ? theme.colors.text : '#fbbf24'
    };
    transition: all 0.3s ease;
  }
`;

const IconContainer = styled.div<{ $position: 'left' | 'right'; $isDark: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => $position}: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $position, $isDark }) => 
    ($position === 'left' && !$isDark) || ($position === 'right' && $isDark) ? 0.3 : 0.7
  };
  transition: opacity 0.3s ease;
  
  svg {
    width: 14px;
    height: 14px;
    color: white;
  }
`;

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <ToggleContainer>
      <ToggleButton $isDark={isDark} onClick={onToggle}>
        <IconContainer $position="left" $isDark={isDark}>
          <Sun />
        </IconContainer>
        <IconContainer $position="right" $isDark={isDark}>
          <Moon />
        </IconContainer>
        <ToggleSlider $isDark={isDark}>
          {isDark ? <Moon /> : <Sun />}
        </ToggleSlider>
      </ToggleButton>
    </ToggleContainer>
  );
};
