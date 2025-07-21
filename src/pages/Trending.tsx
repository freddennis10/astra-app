import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Camera, TrendingUp, Flame, Star, Users } from 'lucide-react';

// Import trending images
import trendingImg1 from '../assets/Images/img (10).jpg';
import trendingImg2 from '../assets/Images/img (11).jpg';
import trendingImg3 from '../assets/Images/img (12).jpg';
import trendingImg4 from '../assets/Images/img (13).jpg';
import trendingImg5 from '../assets/Images/img (14).jpg';
import trendingImg6 from '../assets/Images/img (15).jpg';

const TrendingContainer = styled.div`
  padding: 32px 16px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const TrendingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const TrendingCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
`;

const TrendingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const TrendingInfo = styled.div`
  padding: 20px;
`;

const TrendingTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const TrendingDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: 12px;
`;

const TrendingStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TrendingStat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const RegisterSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 32px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.createShadow(3, theme)};
`;

const RegisterTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  text-align: center;
`;

const RegisterSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

const trendingItems = [
  {
    id: 1,
    title: 'AI-Powered Social Features',
    description: 'Experience the future of social interaction with our new AI-powered features.',
    image: trendingImg1,
    views: '12.5K',
    likes: '2.1K'
  },
  {
    id: 2,
    title: 'Virtual Reality Meetups',
    description: 'Join virtual reality meetups with friends and meet new people in immersive spaces.',
    image: trendingImg2,
    views: '8.7K',
    likes: '1.8K'
  },
  {
    id: 3,
    title: 'Crypto Integration',
    description: 'Seamlessly integrate cryptocurrency payments and NFT collections.',
    image: trendingImg3,
    views: '15.2K',
    likes: '3.4K'
  },
  {
    id: 4,
    title: 'Live Streaming Events',
    description: 'Host and attend live streaming events with interactive features.',
    image: trendingImg4,
    views: '9.8K',
    likes: '2.7K'
  },
  {
    id: 5,
    title: 'Creative Collaboration',
    description: 'Collaborate on creative projects with artists and creators worldwide.',
    image: trendingImg5,
    views: '6.3K',
    likes: '1.9K'
  },
  {
    id: 6,
    title: 'Personalized Content',
    description: 'Discover personalized content tailored to your interests and preferences.',
    image: trendingImg6,
    views: '11.1K',
    likes: '2.8K'
  }
];

const Trending: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photo: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registration data:', formData);
        // Handle form submission
        alert('Registration successful! Welcome to trending!');
        setFormData({ name: '', email: '', photo: '' });
    };

    return (
        <TrendingContainer>
            <Header>
                <Title>
                    <TrendingUp size={32} />
                    Trending Now
                </Title>
                <Subtitle>
                    Discover what's hot and trending in the Astra community
                </Subtitle>
            </Header>

            <TrendingGrid>
                {trendingItems.map((item, index) => (
                    <TrendingCard
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <TrendingImage src={item.image} alt={item.title} />
                        <TrendingInfo>
                            <TrendingTitle>{item.title}</TrendingTitle>
                            <TrendingDescription>{item.description}</TrendingDescription>
                            <TrendingStats>
                                <TrendingStat>
                                    <Users size={16} />
                                    {item.views}
                                </TrendingStat>
                                <TrendingStat>
                                    <Star size={16} />
                                    {item.likes}
                                </TrendingStat>
                                <TrendingStat>
                                    <Flame size={16} />
                                    Hot
                                </TrendingStat>
                            </TrendingStats>
                        </TrendingInfo>
                    </TrendingCard>
                ))}
            </TrendingGrid>

            <RegisterSection>
                <RegisterTitle>Join the Trending Community</RegisterTitle>
                <RegisterSubtitle>
                    Register to participate in trending discussions and share your content
                </RegisterSubtitle>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                            id="name"
                            type="text" 
                            placeholder="Enter your full name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                            id="email"
                            type="email" 
                            placeholder="Enter your email address" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="photo">Profile Photo URL</Label>
                        <Input 
                            id="photo"
                            type="url" 
                            placeholder="Add your profile photo URL" 
                            name="photo" 
                            value={formData.photo} 
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <Button 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                    >
                        <Camera size={18} />
                        Join Trending
                    </Button>
                </Form>
            </RegisterSection>
        </TrendingContainer>
    );
};

export default Trending;
