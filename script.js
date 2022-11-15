// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// Grab elements from DOM
const ul = document.querySelector("ul");
const button = document.querySelector("button");

// Your web app's Firebase configuration, here I've used env vars because you shouldn't expose your db config to the public
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Event listerner for interacting with the firebase server
button.addEventListener("click", grabDb);

// Event listener callback function
async function grabDb() {
  // Grabs the collection from the firestore db
  const coll = collection(db, "users");
  // Gets all the documents in the collection
  const snapshot = await getDocs(coll);
  // Loops through the documents in the snapshot
  snapshot.docs.map((doc) => {
    // Converts the documents from Firestores data type to Objects
    const docObj = doc.data();
    // Loops through the key/value pairs in docObj to give us the individual items of the db entry.
    for (let key in docObj) {
      const li = document.createElement("li");
      li.innerHTML = `${key}: ${docObj[key]}`;
      ul.appendChild(li);
    }
  });
}
