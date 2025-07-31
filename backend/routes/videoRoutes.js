import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import { Video } from "../models/Video.js";


router.get("/", async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});


router.get("/api/videos", async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});


router.put("/api/videos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const allowedFields = ["title", "description", "src", "image", "category", "author"];
        const updateData = Object.fromEntries(
            Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
        );

        const result = await Video.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: updateData }
        );

        console.log("🔧 Update payload:", updateData);
        console.log("🆔 Target video:", id);
        console.log("📊 MongoDB result:", result);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "No such video" });
        }
        res.json({ message: "Video updated successfully.", modifiedCount: result.modifiedCount });
    } catch (err) {
        res.status(500).json({ error: "Failed to update video" });
    }
});


router.get("/api/videos/by-author", async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: "$author",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ];

        const stats = await Video.aggregate(pipeline);
        res.json(stats);
    } catch (err) {
        console.error("Aggregation failed:", err);
        res.status(500).json({ error: "Failed to aggregate videos by author" });
    }
});

export default router;
