import dotenv from 'dotenv';
dotenv.config();
import { connectDB, getDB } from "../db"
import { videos } from "./data.js";

async function importData() {
    try {
        await connectDB();
        const { videosCollection } = getDB();

        if (!Array.isArray(videos)) throw new Error("videos is not an array");

        await videosCollection.deleteMany({});
        await videosCollection.insertMany(videos);

        console.log("✅ Відео імпортовано");
    } catch (err) {
        console.error("❌ Помилка імпорту:", err);
    }
}

importData();
