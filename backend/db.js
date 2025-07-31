import 'dotenv/config';
import mongoose from 'mongoose';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@test.xm463mn.mongodb.net/Test?retryWrites=true&w=majority`;

let db;


export async function connectDB() {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    db = mongoose.connection;
    console.log("✅ DB connected via Mongoose");
}

