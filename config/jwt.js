import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

export { JWT_SECRET, JWT_EXPIRATION };
