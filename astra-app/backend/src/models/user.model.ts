import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  posts: mongoose.Types.ObjectId[];
  wallet: {
    balance: number;
    transactions: mongoose.Types.ObjectId[];
  };
  gaming: {
    level: number;
    points: number;
    achievements: string[];
  };
  business: {
    isVerified: boolean;
    businessName?: string;
    businessType?: string;
  };
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: 150
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  wallet: {
    balance: {
      type: Number,
      default: 0
    },
    transactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
    }]
  },
  gaming: {
    level: {
      type: Number,
      default: 1
    },
    points: {
      type: Number,
      default: 0
    },
    achievements: [{
      type: String
    }]
  },
  business: {
    isVerified: {
      type: Boolean,
      default: false
    },
    businessName: {
      type: String
    },
    businessType: {
      type: String
    }
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'en'
    }
  }
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
export { IUser };
