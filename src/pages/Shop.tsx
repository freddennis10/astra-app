import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Filter, Search, Zap, Shield, Coins, TrendingUp, Gift, Crown, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NotificationModal } from '../components/NotificationModal';

// Import product images
import productImg1 from '../assets/Images/img (30).jpg';
import productImg2 from '../assets/Images/img (31).jpg';
import productImg3 from '../assets/Images/img (32).jpg';
import productImg4 from '../assets/Images/img (33).jpg';
import productImg5 from '../assets/Images/img (34).jpg';
import productImg6 from '../assets/Images/img (35).jpg';

const ShopContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 80vh;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-left: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  box-sizing: border-box;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, active }) => active ? 'white' : theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.createShadow(1, theme)};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ProductCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.createShadow(4, theme)};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ProductBadge = styled.div<{ type: 'nft' | 'premium' | 'trending' | 'new' }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: white;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  ${({ type, theme }) => {
    switch (type) {
      case 'nft':
        return `background: linear-gradient(45deg, #667eea, #764ba2);`;
      case 'premium':
        return `background: linear-gradient(45deg, #f093fb, #f5576c);`;
      case 'trending':
        return `background: linear-gradient(45deg, #4facfe, #00f2fe);`;
      case 'new':
        return `background: linear-gradient(45deg, #43e97b, #38f9d7);`;
      default:
        return `background: ${theme.colors.primary};`;
    }
  }}
`;

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const BuyButton = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.createShadow(2, theme)};
  }
`;

const AdBanner = styled(motion.div)`
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

const AdTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AdDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.9;
`;

const AdButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  cursor: pointer;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: white;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
  category: string;
  type: 'nft' | 'premium' | 'trending' | 'new';
  blockchain?: boolean;
}

export const Shop = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNotification, setShowNotification] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    {
      id: '1',
      name: 'Digital Art NFT Collection',
      description: 'Exclusive digital artwork minted on the blockchain',
      price: 2.5,
      currency: 'ETH',
      image: productImg1,
      rating: 4.8,
      category: 'nft',
      type: 'nft',
      blockchain: true
    },
    {
      id: '2',
      name: 'Premium Membership',
      description: 'Unlock exclusive features and content',
      price: 9.99,
      currency: 'USD',
      image: productImg2,
      rating: 4.9,
      category: 'premium',
      type: 'premium'
    },
    {
      id: '3',
      name: 'Gaming Collectibles',
      description: 'Rare in-game items and collectibles',
      price: 0.8,
      currency: 'ETH',
      image: productImg3,
      rating: 4.6,
      category: 'gaming',
      type: 'trending',
      blockchain: true
    },
    {
      id: '4',
      name: 'Music NFT Album',
      description: 'Limited edition music album as NFT',
      price: 1.2,
      currency: 'ETH',
      image: productImg4,
      rating: 4.7,
      category: 'music',
      type: 'new',
      blockchain: true
    },
    {
      id: '5',
      name: 'Developer Tools',
      description: 'Professional development tools and resources',
      price: 29.99,
      currency: 'USD',
      image: productImg5,
      rating: 4.5,
      category: 'tools',
      type: 'premium'
    },
    {
      id: '6',
      name: 'Virtual Real Estate',
      description: 'Own virtual land in the metaverse',
      price: 5.0,
      currency: 'ETH',
      image: productImg6,
      rating: 4.4,
      category: 'metaverse',
      type: 'trending',
      blockchain: true
    }
  ];

  const filters = [
    { key: 'all', label: 'All Products', icon: ShoppingCart },
    { key: 'nft', label: 'NFTs', icon: Sparkles },
    { key: 'premium', label: 'Premium', icon: Crown },
    { key: 'gaming', label: 'Gaming', icon: Zap },
    { key: 'trending', label: 'Trending', icon: TrendingUp }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || product.category === activeFilter || product.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleBuyProduct = (product: Product) => {
    if (!user) {
      setShowNotification(true);
      return;
    }
    
    // Add to cart logic here
    console.log('Buying product:', product);
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'nft': return <Sparkles size={12} />;
      case 'premium': return <Crown size={12} />;
      case 'trending': return <TrendingUp size={12} />;
      case 'new': return <Gift size={12} />;
      default: return null;
    }
  };

  return (
    <>
      <ShopContainer>
        <Header>
          <Title>🛍️ Astra Marketplace</Title>
          <SearchContainer>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </Header>
        
        <AdBanner
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AdTitle>🚀 Blockchain-Powered Marketplace</AdTitle>
          <AdDescription>
            Trade NFTs, digital assets, and premium content securely on the blockchain
          </AdDescription>
          <AdButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Now
          </AdButton>
        </AdBanner>
        
        <FilterContainer>
          {filters.map(filter => {
            const Icon = filter.icon;
            return (
              <FilterButton
                key={filter.key}
                active={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
              >
                <Icon size={16} />
                {filter.label}
              </FilterButton>
            );
          })}
        </FilterContainer>
        
        <ProductGrid>
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{ position: 'relative' }}
              >
                <ProductBadge type={product.type}>
                  {getBadgeIcon(product.type)}
                  {product.type.toUpperCase()}
                </ProductBadge>
                
                <ProductImage src={product.image} alt={product.name} />
                
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  
                  <ProductPrice>
                    <Price>
                      {product.blockchain && <Coins size={16} />}
                      {product.price} {product.currency}
                    </Price>
                    <Rating>
                      <Star size={14} fill="currentColor" />
                      {product.rating}
                    </Rating>
                  </ProductPrice>
                  
                  <BuyButton
                    onClick={() => handleBuyProduct(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart size={16} />
                    {product.blockchain ? 'Buy with Crypto' : 'Buy Now'}
                  </BuyButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </AnimatePresence>
        </ProductGrid>
      </ShopContainer>
      
      <NotificationModal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        type="info"
        title="Sign In Required"
        message="Please sign in to purchase items from the marketplace."
        actionText="Sign In"
        onAction={handleLoginRedirect}
      />
    </>
  );
};
