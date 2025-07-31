
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String
    },
    src: {
        type: String,
        required: true
    },
    image: String,
    category: {
        type: String,
        index: true
    },
    author: String,
    views: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

export const Video = mongoose.model('Video', videoSchema);
