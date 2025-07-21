import React, { useState } from 'react';
import styled from 'styled-components';
import { Send, Mail, Phone, MapPin, Clock, User, MessageSquare, Star, CheckCircle } from 'lucide-react';

const ContactContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.display};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ContactCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
`;

const ContactCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ContactIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ContactCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ContactCardContent = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const ContactForm = styled.form`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
`;

const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const FormLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const FormInput = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const FormTextarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const FormSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const SubmitButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SuccessMessage = styled.div`
  background: ${({ theme }) => theme.colors.success}20;
  color: ${({ theme }) => theme.colors.success};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const FAQSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
`;

const FAQTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} 0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FAQQuestion = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const FAQAnswer = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <ContactContainer>
      <Header>
        <Title>Get In Touch</Title>
        <Subtitle>
          Have questions about Astra Social Space? We're here to help you connect, create, and thrive in our community.
        </Subtitle>
      </Header>

      <ContactGrid>
        <ContactInfo>
          <ContactCard>
            <ContactCardHeader>
              <ContactIcon>
                <Mail />
              </ContactIcon>
              <ContactCardTitle>Email Support</ContactCardTitle>
            </ContactCardHeader>
            <ContactCardContent>
              <p>Get support via email within 24 hours</p>
              <strong>support@astra.space</strong>
            </ContactCardContent>
          </ContactCard>

          <ContactCard>
            <ContactCardHeader>
              <ContactIcon>
                <Phone />
              </ContactIcon>
              <ContactCardTitle>Phone Support</ContactCardTitle>
            </ContactCardHeader>
            <ContactCardContent>
              <p>Talk to our team directly</p>
              <strong>+1 (555) 123-ASTRA</strong>
            </ContactCardContent>
          </ContactCard>

          <ContactCard>
            <ContactCardHeader>
              <ContactIcon>
                <MapPin />
              </ContactIcon>
              <ContactCardTitle>Office Location</ContactCardTitle>
            </ContactCardHeader>
            <ContactCardContent>
              <p>Visit us at our headquarters</p>
              <strong>123 Innovation Drive<br />Tech City, TC 12345</strong>
            </ContactCardContent>
          </ContactCard>

          <ContactCard>
            <ContactCardHeader>
              <ContactIcon>
                <Clock />
              </ContactIcon>
              <ContactCardTitle>Business Hours</ContactCardTitle>
            </ContactCardHeader>
            <ContactCardContent>
              <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p>Saturday: 10:00 AM - 4:00 PM PST</p>
              <p>Sunday: Closed</p>
            </ContactCardContent>
          </ContactCard>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Send us a Message</FormTitle>
          
          {showSuccess && (
            <SuccessMessage>
              <CheckCircle />
              Thank you for your message! We'll get back to you soon.
            </SuccessMessage>
          )}

          <FormGrid>
            <FormGroup>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <FormInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </FormGroup>
          </FormGrid>

          <FormGrid>
            <FormGroup>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormInput
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="category">Category</FormLabel>
              <FormSelect
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing</option>
                <option value="partnership">Partnership</option>
                <option value="feedback">Feedback</option>
                <option value="bug">Bug Report</option>
              </FormSelect>
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <FormLabel htmlFor="message">Message</FormLabel>
            <FormTextarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us more about your inquiry..."
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading} $loading={loading}>
            {loading ? 'Sending...' : 'Send Message'}
            <Send />
          </SubmitButton>
        </ContactForm>
      </ContactGrid>

      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        
        <FAQItem>
          <FAQQuestion>How do I create an account on Astra Social Space?</FAQQuestion>
          <FAQAnswer>
            Simply click the "Register" button in the top right corner and follow the simple signup process. You'll be part of our community in minutes!
          </FAQAnswer>
        </FAQItem>

        <FAQItem>
          <FAQQuestion>Is Astra Social Space free to use?</FAQQuestion>
          <FAQAnswer>
            Yes! Astra Social Space is completely free to use. We also offer premium features for users who want enhanced functionality.
          </FAQAnswer>
        </FAQItem>

        <FAQItem>
          <FAQQuestion>How do I report inappropriate content?</FAQQuestion>
          <FAQAnswer>
            You can report any post or user by clicking the menu button (three dots) and selecting "Report". Our moderation team reviews all reports promptly.
          </FAQAnswer>
        </FAQItem>

        <FAQItem>
          <FAQQuestion>Can I integrate Astra with other platforms?</FAQQuestion>
          <FAQAnswer>
            Yes! We offer API access and integrations with popular platforms. Check out our developer documentation for more information.
          </FAQAnswer>
        </FAQItem>

        <FAQItem>
          <FAQQuestion>How do I delete my account?</FAQQuestion>
          <FAQAnswer>
            You can delete your account by going to Settings → Account → Delete Account. Please note that this action is irreversible.
          </FAQAnswer>
        </FAQItem>
      </FAQSection>
    </ContactContainer>
  );
};
