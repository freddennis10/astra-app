import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Code, Github, Globe, Star, Users, Coffee } from 'lucide-react';

// Import developer images
import dev1 from '../assets/Images/img (1).jpg';
import dev2 from '../assets/Images/img (2).jpg';
import dev3 from '../assets/Images/img (3).jpg';
import dev4 from '../assets/Images/img (4).jpg';
import dev5 from '../assets/Images/img (5).jpg';
import dev6 from '../assets/Images/img (6).jpg';
import dev7 from '../assets/Images/img (7).jpg';
import dev8 from '../assets/Images/img (8).jpg';

const DeveloperContainer = styled.div`
  padding: 32px 24px;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
`;

const StatIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
`;

const StatNumber = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const StatLabel = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const DevelopersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 48px;
`;

const DeveloperCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
`;

const DeveloperImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

const DeveloperInfo = styled.div`
  text-align: center;
`;

const DeveloperName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const DeveloperRole = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: 12px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const DeveloperDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  line-height: 1.5;
  margin-bottom: 16px;
`;

const DeveloperLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const DeveloperLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
  text-align: center;
`;

const developers = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Senior Full Stack Developer',
    image: dev1,
    description: 'Passionate about creating scalable web applications with modern technologies.',
    github: 'https://github.com/alexjohnson',
    website: 'https://alexjohnson.dev'
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Frontend Developer',
    image: dev2,
    description: 'Expert in React, TypeScript, and modern UI/UX design principles.',
    github: 'https://github.com/sarahmitchell',
    website: 'https://sarahmitchell.dev'
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Backend Developer',
    image: dev3,
    description: 'Specialized in Node.js, databases, and cloud infrastructure.',
    github: 'https://github.com/michaelchen',
    website: 'https://michaelchen.dev'
  },
  {
    id: 4,
    name: 'Emma Davis',
    role: 'Mobile Developer',
    image: dev4,
    description: 'Cross-platform mobile app development with React Native and Flutter.',
    github: 'https://github.com/emmadavis',
    website: 'https://emmadavis.dev'
  },
  {
    id: 5,
    name: 'David Wilson',
    role: 'DevOps Engineer',
    image: dev5,
    description: 'Cloud infrastructure, CI/CD, and automated deployment solutions.',
    github: 'https://github.com/davidwilson',
    website: 'https://davidwilson.dev'
  },
  {
    id: 6,
    name: 'Jessica Brown',
    role: 'UI/UX Designer',
    image: dev6,
    description: 'Creating beautiful and intuitive user experiences for web and mobile.',
    github: 'https://github.com/jessicabrown',
    website: 'https://jessicabrown.design'
  },
  {
    id: 7,
    name: 'Ryan Taylor',
    role: 'Data Scientist',
    image: dev7,
    description: 'Machine learning, data analytics, and AI-powered solutions.',
    github: 'https://github.com/ryantaylor',
    website: 'https://ryantaylor.ai'
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    role: 'Security Engineer',
    image: dev8,
    description: 'Cybersecurity, penetration testing, and secure application development.',
    github: 'https://github.com/lisaanderson',
    website: 'https://lisaanderson.security'
  }
];

const stats = [
  { icon: Code, number: '50+', label: 'Active Developers' },
  { icon: Star, number: '200+', label: 'Projects Created' },
  { icon: Users, number: '10K+', label: 'API Calls/Day' },
  { icon: Coffee, number: '∞', label: 'Coffee Consumed' }
];

export const Developer = () => {
  return (
    <DeveloperContainer>
      <Header>
        <Title>Developer Community</Title>
        <Subtitle>
          Meet the talented developers building the future of Astra. Join our community and contribute to innovative projects.
        </Subtitle>
      </Header>

      <StatsContainer>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatIcon>
              <stat.icon size={32} />
            </StatIcon>
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsContainer>

      <SectionTitle>Our Developer Team</SectionTitle>
      
      <DevelopersGrid>
        {developers.map((developer, index) => (
          <DeveloperCard
            key={developer.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DeveloperInfo>
              <DeveloperImage src={developer.image} alt={developer.name} />
              <DeveloperName>{developer.name}</DeveloperName>
              <DeveloperRole>{developer.role}</DeveloperRole>
              <DeveloperDescription>{developer.description}</DeveloperDescription>
              <DeveloperLinks>
                <DeveloperLink href={developer.github} target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </DeveloperLink>
                <DeveloperLink href={developer.website} target="_blank" rel="noopener noreferrer">
                  <Globe size={20} />
                </DeveloperLink>
              </DeveloperLinks>
            </DeveloperInfo>
          </DeveloperCard>
        ))}
      </DevelopersGrid>
    </DeveloperContainer>
  );
};
