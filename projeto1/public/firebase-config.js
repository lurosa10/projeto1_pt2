import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDGqpBJPumo68mzLc2SzAe6XlrETZBLThk",
  authDomain: "app-crud-firebase-d6200.firebaseapp.com",
  projectId: "app-crud-firebase-d6200",
  storageBucket: "app-crud-firebase-d6200.firebasestorage.app",
  messagingSenderId: "1035721515958",
  appId: "1:1035721515958:web:2489a76f113610cbcad717"
};

// 🔹 Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// 🔹 Exporta para o app.js
export { app, auth, provider, db, signInWithPopup, signOut, onAuthStateChanged };
