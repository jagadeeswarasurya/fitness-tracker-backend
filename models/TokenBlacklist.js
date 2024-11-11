import mongoose from 'mongoose';

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

// Exporting the TokenBlacklist model
export default mongoose.model('TokenBlacklist', tokenBlacklistSchema);
