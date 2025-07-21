import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Mail, Phone, MapPin, Send, Briefcase, Target, Zap } from 'lucide-react';
import businessBg from '../assets/BG Images/bg (1).jpg';

const BusinessContainer = styled.div`
  padding: 32px 24px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${businessBg});
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  padding: 60px 40px;
  text-align: center;
  color: white;
  margin-bottom: 40px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 30px;
  opacity: 0.9;
`;

const HeroButton = styled(motion.button)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const ServiceCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 15px;
  font-weight: 600;
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const PricingSection = styled.div`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 40px;
  font-weight: 700;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PricingCard = styled(motion.div)<{ featured?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  position: relative;
  border: 2px solid ${({ featured, theme }) => featured ? theme.colors.primary : 'transparent'};
  transform: ${({ featured }) => featured ? 'scale(1.05)' : 'scale(1)'};
  
  ${({ featured }) => featured && `
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      padding: 8px 24px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }
  `}
`;

const PlanName = styled.h3`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
  font-weight: 600;
`;

const PlanPrice = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  
  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 30px 0;
  
  li {
    padding: 10px 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
    gap: 10px;
    
    svg {
      color: ${({ theme }) => theme.colors.success};
    }
  }
`;

const PlanButton = styled(motion.button)<{ featured?: boolean }>`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ featured, theme }) => featured ? 
    'linear-gradient(45deg, #667eea, #764ba2)' : 
    'transparent'};
  color: ${({ featured, theme }) => featured ? 'white' : theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ featured }) => featured ? 
      'linear-gradient(45deg, #5a67d8, #6b46c1)' : 
      'linear-gradient(45deg, #667eea, #764ba2)'};
    color: white;
  }
`;

const ContactSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 50px 40px;
  margin-bottom: 40px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: 30px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  
  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const FormInput = styled.input`
  padding: 15px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormTextarea = styled.textarea`
  padding: 15px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

export const Business = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const services = [
    {
      icon: <Briefcase />,
      title: 'Business Solutions',
      description: 'Comprehensive blockchain integration and smart contract development for enterprises'
    },
    {
      icon: <Target />,
      title: 'Custom Development',
      description: 'Tailored applications and solutions built specifically for your business needs'
    },
    {
      icon: <Zap />,
      title: 'Performance Optimization',
      description: 'Enhance your digital presence with cutting-edge technology and optimization'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      features: [
        'Basic blockchain integration',
        'Community support',
        'Standard templates',
        'Basic analytics'
      ],
      featured: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      features: [
        'Advanced blockchain features',
        'Priority support',
        'Custom templates',
        'Advanced analytics',
        'API access'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Full blockchain ecosystem',
        'Dedicated support',
        'Unlimited customization',
        'Enterprise analytics',
        'Full API access',
        'White-label solutions'
      ],
      featured: false
    }
  ];

  return (
    <BusinessContainer>
      <HeroSection>
        <HeroTitle>Astra Business Solutions</HeroTitle>
        <HeroSubtitle>
          Empowering businesses with cutting-edge blockchain technology and innovative digital solutions
        </HeroSubtitle>
        <HeroButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
          <ArrowRight />
        </HeroButton>
      </HeroSection>

      <SectionTitle>Our Services</SectionTitle>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ServiceIcon>
              {service.icon}
            </ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesGrid>

      <PricingSection>
        <SectionTitle>Pricing Plans</SectionTitle>
        <PricingGrid>
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              featured={plan.featured}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PlanName>{plan.name}</PlanName>
              <PlanPrice>
                {plan.price}
                {plan.period && <span>{plan.period}</span>}
              </PlanPrice>
              <PlanFeatures>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <CheckCircle size={16} />
                    {feature}
                  </li>
                ))}
              </PlanFeatures>
              <PlanButton
                featured={plan.featured}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </PlanButton>
            </PricingCard>
          ))}
        </PricingGrid>
      </PricingSection>

      <ContactSection>
        <SectionTitle>Contact Us</SectionTitle>
        <ContactGrid>
          <ContactInfo>
            <h3>Get in Touch</h3>
            <p>
              Ready to transform your business with blockchain technology? 
              Contact our expert team today to discuss your project and explore 
              how we can help you succeed.
            </p>
            <ContactItem>
              <Mail />
              <span>business@astra.com</span>
            </ContactItem>
            <ContactItem>
              <Phone />
              <span>+1 (555) 123-4567</span>
            </ContactItem>
            <ContactItem>
              <MapPin />
              <span>123 Business Ave, Tech City, TC 12345</span>
            </ContactItem>
          </ContactInfo>
          
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Company</FormLabel>
              <FormInput
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company name"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project..."
                required
              />
            </FormGroup>
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
              <Send />
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </ContactSection>
    </BusinessContainer>
  );
};
