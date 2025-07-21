import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  isOnline: boolean;
  lastSeen?: Date;
  bio?: string;
  location?: string;
  mutualFriends?: number;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
}

export interface FriendRequest {
  id: string;
  from: User;
  to: User;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Relationship {
  userId: string;
  isFollowing: boolean;
  isFollower: boolean;
  isMutualFollowing: boolean;
  isFriend: boolean;
  createdAt: Date;
}

interface SocialContextType {
  // Friends
  friends: User[];
  onlineFriends: User[];
  friendRequests: FriendRequest[];
  
  // Followers/Following
  followers: User[];
  following: User[];
  
  // Relationships
  getRelationship: (userId: string) => Relationship | null;
  isFollowing: (userId: string) => boolean;
  isFollower: (userId: string) => boolean;
  isMutualFollowing: (userId: string) => boolean;
  isFriend: (userId: string) => boolean;
  
  // Actions
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  sendFriendRequest: (userId: string) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  rejectFriendRequest: (requestId: string) => Promise<void>;
  removeFriend: (userId: string) => Promise<void>;
  blockUser: (userId: string) => Promise<void>;
  unblockUser: (userId: string) => Promise<void>;
  
  // Search and discovery
  searchUsers: (query: string) => Promise<User[]>;
  getSuggestedUsers: () => Promise<User[]>;
  getMutualFriends: (userId: string) => Promise<User[]>;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

export const SocialProvider = ({ children }: { children: ReactNode }) => {
  const [friends, setFriends] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [relationships, setRelationships] = useState<Map<string, Relationship>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    initializeMockData();
  }, []);

  const initializeMockData = () => {
    const mockFriends: User[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        username: '@alice',
        avatar: '/avatars/alice.jpg',
        verified: true,
        isOnline: true,
        bio: 'Designer & Creative',
        location: 'New York, NY',
        mutualFriends: 12,
        followersCount: 1250,
        followingCount: 845,
        postsCount: 167
      },
      {
        id: '2',
        name: 'Bob Smith',
        username: '@bob',
        avatar: '/avatars/bob.jpg',
        verified: false,
        isOnline: true,
        bio: 'Developer & Gamer',
        location: 'San Francisco, CA',
        mutualFriends: 8,
        followersCount: 890,
        followingCount: 634,
        postsCount: 234
      },
      {
        id: '3',
        name: 'Carol Davis',
        username: '@carol',
        avatar: '/avatars/carol.jpg',
        verified: true,
        isOnline: false,
        lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        bio: 'Photographer & Traveler',
        location: 'Los Angeles, CA',
        mutualFriends: 5,
        followersCount: 2100,
        followingCount: 456,
        postsCount: 89
      },
      {
        id: '4',
        name: 'David Wilson',
        username: '@david',
        avatar: '/avatars/david.jpg',
        verified: false,
        isOnline: true,
        bio: 'Music Producer',
        location: 'Nashville, TN',
        mutualFriends: 3,
        followersCount: 567,
        followingCount: 234,
        postsCount: 78
      },
      {
        id: '5',
        name: 'Eva Martinez',
        username: '@eva',
        avatar: '/avatars/eva.jpg',
        verified: true,
        isOnline: false,
        lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        bio: 'Fitness Coach',
        location: 'Miami, FL',
        mutualFriends: 7,
        followersCount: 3400,
        followingCount: 123,
        postsCount: 456
      }
    ];

    const mockFollowers: User[] = [
      ...mockFriends,
      {
        id: '6',
        name: 'Frank Brown',
        username: '@frank',
        avatar: '/avatars/frank.jpg',
        verified: false,
        isOnline: false,
        bio: 'Writer & Blogger',
        location: 'Chicago, IL',
        mutualFriends: 2,
        followersCount: 789,
        followingCount: 456,
        postsCount: 234
      },
      {
        id: '7',
        name: 'Grace Lee',
        username: '@grace',
        avatar: '/avatars/grace.jpg',
        verified: true,
        isOnline: true,
        bio: 'Marketing Manager',
        location: 'Seattle, WA',
        mutualFriends: 9,
        followersCount: 1567,
        followingCount: 890,
        postsCount: 345
      }
    ];

    const mockFollowing: User[] = [
      ...mockFriends.slice(0, 3),
      {
        id: '8',
        name: 'Henry Clark',
        username: '@henry',
        avatar: '/avatars/henry.jpg',
        verified: false,
        isOnline: true,
        bio: 'Chef & Food Lover',
        location: 'Portland, OR',
        mutualFriends: 4,
        followersCount: 2300,
        followingCount: 567,
        postsCount: 123
      }
    ];

    const mockRequests: FriendRequest[] = [
      {
        id: 'req1',
        from: {
          id: '9',
          name: 'Isabella Rodriguez',
          username: '@isabella',
          avatar: '/avatars/isabella.jpg',
          verified: false,
          isOnline: true,
          bio: 'Artist & Designer',
          location: 'Austin, TX',
          mutualFriends: 6,
          followersCount: 1890,
          followingCount: 456,
          postsCount: 89
        },
        to: {
          id: 'current-user',
          name: 'Current User',
          username: '@current',
          avatar: '/avatars/current.jpg',
          verified: true,
          isOnline: true
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: 'pending'
      },
      {
        id: 'req2',
        from: {
          id: '10',
          name: 'Jack Thompson',
          username: '@jack',
          avatar: '/avatars/jack.jpg',
          verified: true,
          isOnline: false,
          bio: 'Entrepreneur',
          location: 'Denver, CO',
          mutualFriends: 11,
          followersCount: 5600,
          followingCount: 234,
          postsCount: 567
        },
        to: {
          id: 'current-user',
          name: 'Current User',
          username: '@current',
          avatar: '/avatars/current.jpg',
          verified: true,
          isOnline: true
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        status: 'pending'
      }
    ];

    // Initialize relationships
    const relationshipMap = new Map<string, Relationship>();
    
    mockFriends.forEach(friend => {
      relationshipMap.set(friend.id, {
        userId: friend.id,
        isFollowing: true,
        isFollower: true,
        isMutualFollowing: true,
        isFriend: true,
        createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30) // Random date within last 30 days
      });
    });

    mockFollowers.forEach(follower => {
      if (!relationshipMap.has(follower.id)) {
        relationshipMap.set(follower.id, {
          userId: follower.id,
          isFollowing: false,
          isFollower: true,
          isMutualFollowing: false,
          isFriend: false,
          createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30)
        });
      }
    });

    mockFollowing.forEach(following => {
      if (!relationshipMap.has(following.id)) {
        relationshipMap.set(following.id, {
          userId: following.id,
          isFollowing: true,
          isFollower: false,
          isMutualFollowing: false,
          isFriend: false,
          createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30)
        });
      }
    });

    setFriends(mockFriends);
    setFollowers(mockFollowers);
    setFollowing(mockFollowing);
    setFriendRequests(mockRequests);
    setRelationships(relationshipMap);
  };

  const onlineFriends = friends.filter(friend => friend.isOnline);

  const getRelationship = (userId: string): Relationship | null => {
    return relationships.get(userId) || null;
  };

  const isFollowing = (userId: string): boolean => {
    return relationships.get(userId)?.isFollowing || false;
  };

  const isFollower = (userId: string): boolean => {
    return relationships.get(userId)?.isFollower || false;
  };

  const isMutualFollowing = (userId: string): boolean => {
    return relationships.get(userId)?.isMutualFollowing || false;
  };

  const isFriend = (userId: string): boolean => {
    return relationships.get(userId)?.isFriend || false;
  };

  const followUser = async (userId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentRelationship = relationships.get(userId);
      const newRelationship: Relationship = {
        userId,
        isFollowing: true,
        isFollower: currentRelationship?.isFollower || false,
        isMutualFollowing: currentRelationship?.isFollower || false,
        isFriend: currentRelationship?.isFriend || false,
        createdAt: currentRelationship?.createdAt || new Date()
      };
      
      setRelationships(prev => new Map(prev).set(userId, newRelationship));
      
      // Add to following list if not already there
      const userToFollow = [...followers, ...friends].find(u => u.id === userId);
      if (userToFollow && !following.some(u => u.id === userId)) {
        setFollowing(prev => [...prev, userToFollow]);
      }
    } catch (err) {
      setError('Failed to follow user');
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowUser = async (userId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentRelationship = relationships.get(userId);
      if (currentRelationship) {
        const newRelationship: Relationship = {
          ...currentRelationship,
          isFollowing: false,
          isMutualFollowing: false
        };
        
        setRelationships(prev => new Map(prev).set(userId, newRelationship));
        setFollowing(prev => prev.filter(u => u.id !== userId));
      }
    } catch (err) {
      setError('Failed to unfollow user');
    } finally {
      setIsLoading(false);
    }
  };

  const sendFriendRequest = async (userId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app, this would send a request to the backend
      console.log(`Friend request sent to user ${userId}`);
    } catch (err) {
      setError('Failed to send friend request');
    } finally {
      setIsLoading(false);
    }
  };

  const acceptFriendRequest = async (requestId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const request = friendRequests.find(req => req.id === requestId);
      if (request) {
        // Add to friends
        setFriends(prev => [...prev, request.from]);
        
        // Update relationship
        const newRelationship: Relationship = {
          userId: request.from.id,
          isFollowing: true,
          isFollower: true,
          isMutualFollowing: true,
          isFriend: true,
          createdAt: new Date()
        };
        
        setRelationships(prev => new Map(prev).set(request.from.id, newRelationship));
        
        // Remove from pending requests
        setFriendRequests(prev => prev.filter(req => req.id !== requestId));
      }
    } catch (err) {
      setError('Failed to accept friend request');
    } finally {
      setIsLoading(false);
    }
  };

  const rejectFriendRequest = async (requestId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (err) {
      setError('Failed to reject friend request');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFriend = async (userId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFriends(prev => prev.filter(friend => friend.id !== userId));
      
      const currentRelationship = relationships.get(userId);
      if (currentRelationship) {
        const newRelationship: Relationship = {
          ...currentRelationship,
          isFriend: false,
          isFollowing: false,
          isMutualFollowing: false
        };
        
        setRelationships(prev => new Map(prev).set(userId, newRelationship));
      }
    } catch (err) {
      setError('Failed to remove friend');
    } finally {
      setIsLoading(false);
    }
  };

  const blockUser = async (userId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove from all lists
      setFriends(prev => prev.filter(friend => friend.id !== userId));
      setFollowers(prev => prev.filter(follower => follower.id !== userId));
      setFollowing(prev => prev.filter(following => following.id !== userId));
      setFriendRequests(prev => prev.filter(req => req.from.id !== userId));
      
      // Remove relationship
      setRelationships(prev => {
        const newMap = new Map(prev);
        newMap.delete(userId);
        return newMap;
      });
    } catch (err) {
      setError('Failed to block user');
    } finally {
      setIsLoading(false);
    }
  };

  const unblockUser = async (userId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app, this would unblock the user
      console.log(`User ${userId} unblocked`);
    } catch (err) {
      setError('Failed to unblock user');
    } finally {
      setIsLoading(false);
    }
  };

  const searchUsers = async (query: string): Promise<User[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const allUsers = [...friends, ...followers, ...following];
      const uniqueUsers = Array.from(new Map(allUsers.map(user => [user.id, user])).values());
      
      return uniqueUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.bio?.toLowerCase().includes(query.toLowerCase())
      );
    } catch (err) {
      setError('Failed to search users');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getSuggestedUsers = async (): Promise<User[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock suggested users based on mutual friends
      const suggested: User[] = [
        {
          id: 'suggested1',
          name: 'Maya Patel',
          username: '@maya',
          avatar: '/avatars/maya.jpg',
          verified: false,
          isOnline: true,
          bio: 'UX Designer',
          location: 'San Diego, CA',
          mutualFriends: 15,
          followersCount: 3400,
          followingCount: 890,
          postsCount: 234
        },
        {
          id: 'suggested2',
          name: 'Alex Chen',
          username: '@alex',
          avatar: '/avatars/alex.jpg',
          verified: true,
          isOnline: false,
          bio: 'Software Engineer',
          location: 'Boston, MA',
          mutualFriends: 12,
          followersCount: 1200,
          followingCount: 567,
          postsCount: 89
        }
      ];
      
      return suggested;
    } catch (err) {
      setError('Failed to get suggested users');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getMutualFriends = async (userId: string): Promise<User[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock mutual friends - in a real app, this would be calculated server-side
      const mutualFriends = friends.slice(0, Math.floor(Math.random() * 3) + 1);
      return mutualFriends;
    } catch (err) {
      setError('Failed to get mutual friends');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: SocialContextType = {
    friends,
    onlineFriends,
    followers,
    following,
    friendRequests,
    getRelationship,
    isFollowing,
    isFollower,
    isMutualFollowing,
    isFriend,
    followUser,
    unfollowUser,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    blockUser,
    unblockUser,
    searchUsers,
    getSuggestedUsers,
    getMutualFriends,
    isLoading,
    error
  };

  return (
    <SocialContext.Provider value={contextValue}>
      {children}
    </SocialContext.Provider>
  );
};

export default SocialContext;
