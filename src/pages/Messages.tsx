import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, Image, Mic } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NotificationModal } from '../components/NotificationModal';

// Import user images
import userImg1 from '../assets/Images/img (20).jpg';
import userImg2 from '../assets/Images/img (21).jpg';
import userImg3 from '../assets/Images/img (22).jpg';
import userImg4 from '../assets/Images/img (23).jpg';
import userImg5 from '../assets/Images/img (24).jpg';

const MessagesContainer = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const Sidebar = styled.div`
  width: 300px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-left: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  box-sizing: border-box;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ContactsList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContactItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: background 0.2s ease;
  background: ${({ theme, active }) => active ? theme.colors.primary + '20' : 'transparent'};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const LastMessage = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
`;

const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MessageBubble = styled(motion.div)<{ isOwn: boolean }>`
  max-width: 70%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme, isOwn }) => isOwn ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, isOwn }) => isOwn ? 'white' : theme.colors.text};
  align-self: ${({ isOwn }) => isOwn ? 'flex-end' : 'flex-start'};
  box-shadow: ${({ theme }) => theme.createShadow(1, theme)};
`;

const InputArea = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  online: boolean;
}

interface Message {
  id: string;
  text: string;
  isOwn: boolean;
  time: string;
}

const Messages = () => {
  const { user } = useAuth();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: userImg1,
      lastMessage: 'Hey! How are you doing?',
      time: '2m ago',
      online: true
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: userImg2,
      lastMessage: 'The project looks great!',
      time: '1h ago',
      online: true
    },
    {
      id: '3',
      name: 'Emma Davis',
      avatar: userImg3,
      lastMessage: 'Can we schedule a meeting?',
      time: '3h ago',
      online: false
    }
  ];

  const sampleMessages: Message[] = [
    {
      id: '1',
      text: 'Hey! How are you doing?',
      isOwn: false,
      time: '10:30 AM'
    },
    {
      id: '2',
      text: 'I\'m doing great! Just working on some new features for Astra.',
      isOwn: true,
      time: '10:32 AM'
    }
  ];

  useEffect(() => {
    if (!user) {
      setShowNotification(true);
    }
  }, [user]);

  const handleContactSelect = (contact: Contact) => {
    if (!user) {
      setShowNotification(true);
      return;
    }
    setSelectedContact(contact);
    setMessages(sampleMessages);
  };

  const handleSendMessage = () => {
    if (!user) {
      setShowNotification(true);
      return;
    }
    
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        isOwn: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <>
      <MessagesContainer>
        <Sidebar>
          <SidebarHeader>
            <Title>Messages</Title>
            <SearchContainer>
              <SearchIcon>
                <Search size={16} />
              </SearchIcon>
              <SearchInput
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
          </SidebarHeader>
          
          <ContactsList>
            {contacts.map(contact => (
              <ContactItem
                key={contact.id}
                active={selectedContact?.id === contact.id}
                onClick={() => handleContactSelect(contact)}
              >
                <Avatar src={contact.avatar} alt={contact.name} />
                <ContactInfo>
                  <ContactName>{contact.name}</ContactName>
                  <LastMessage>{contact.lastMessage}</LastMessage>
                </ContactInfo>
              </ContactItem>
            ))}
          </ContactsList>
        </Sidebar>
        
        <ChatArea>
          {selectedContact ? (
            <>
              <ChatHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Avatar src={selectedContact.avatar} alt={selectedContact.name} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{selectedContact.name}</div>
                    <div style={{ color: '#48bb78', fontSize: '14px' }}>
                      {selectedContact.online ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>
              </ChatHeader>
              
              <MessagesArea>
                <AnimatePresence>
                  {messages.map(message => (
                    <MessageBubble
                      key={message.id}
                      isOwn={message.isOwn}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {message.text}
                    </MessageBubble>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </MessagesArea>
              
              <InputArea>
                <MessageInput
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <SendButton onClick={handleSendMessage}>
                  <Send size={20} />
                </SendButton>
              </InputArea>
            </>
          ) : (
            <EmptyState>
              <h2>Select a conversation</h2>
              <p>Choose from your existing conversations or start a new one</p>
            </EmptyState>
          )}
        </ChatArea>
      </MessagesContainer>
      
      <NotificationModal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        type="info"
        title="Sign In Required"
        message="Please sign in to access your messages and start chatting with friends."
        actionText="Sign In"
        onAction={handleLoginRedirect}
      />
    </>
  );
};

export default Messages;
