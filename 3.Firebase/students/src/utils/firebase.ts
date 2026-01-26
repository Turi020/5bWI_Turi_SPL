// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"; // Add this import
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Add this import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1hadq6Z_XxPFyJwed9XA1MGHEUzebaGc",
  authDomain: "demostudents.firebaseapp.com",
  projectId: "demostudents",
  storageBucket: "demostudents.firebasestorage.app",
  messagingSenderId: "44260817594",
  appId: "1:44260817594:web:dad6ff36ea754ef399a083",
  measurementId: "G-6PRQEBBRVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // Fix the export name
export const auth = getAuth(app); // Add this export
export const googleProvider = new GoogleAuthProvider(); // Add this export

export const fetchTeachers = async () => {
  try {
    console.log("Fetching teachers from Firestore..."); // Debug log
    const querySnapshot = await getDocs(collection(db, "teachers"));
    const teachers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched teachers:", teachers); // Debug log
    if (teachers.length === 0) {
      console.warn("No teachers found in Firestore.");
    }
    return teachers;
  } catch (error) {
    console.error("Error fetching teachers:", error); // Log errors
    throw error;
  }
};

