import 'dotenv/config';
import mongoose from 'mongoose';

// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: "backend-nodejs-23bad",
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: "24459820329",
//     appId: process.env.FIREBASE_APP_ID
// };

//   Initialize Firebase
// const app = initializeApp(firebaseConfig);

//   Initialize Firestore
// const db = getFirestore(app);

// export { db };

// Connection string should look like: 
// mongodb+srv://<username>:<password>@cluster0.mongodb.net/<your-db>?retryWrites=true&w=majority
const mongoURI = process.env.MONGO_URI || '';
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // You can add options here if needed
    });
    console.info('MongoDB connection successful');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
connectToDatabase();
const db = mongoose.connection;
export { db };