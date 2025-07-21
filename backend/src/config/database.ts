// Mock database pool for development
export const pool = {
  query: async (sql: string, params?: any[]) => {
    console.log('Mock DB Query:', sql, params);
    return { rows: [] };
  }
};

export const connectDB = async () => {
  try {
    console.log('🗄️  Database connection simulated (MongoDB ready)');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};
