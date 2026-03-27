import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUIpBtWDuKbkIGkjIOP4F3wKVAmhWT3dc",
  authDomain: "hamed-web.firebaseapp.com",
  projectId: "hamed-web",
  storageBucket: "hamed-web.firebasestorage.app",
  messagingSenderId: "927863215454",
  appId: "1:927863215454:web:9b9438384ef20574b4ebcf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

getDoc(doc(db, "content", "main"))
  .then(snap => {
    if(snap.exists()) {
      console.log("DB DATA EXISTS!");
      console.log("Name in DB:", snap.data().siteConfig?.name);
    } else {
      console.log("DB DATA DOES NOT EXIST.");
    }
    process.exit(0);
  })
  .catch(e => {
    console.error("FIREBASE ERROR:", e.message);
    process.exit(1);
  });
