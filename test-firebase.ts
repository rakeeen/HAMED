import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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

async function run() {
  try {
    console.log("Testing write...");
    await setDoc(doc(db, 'content', 'test'), { hello: 'world' });
    console.log("Write successful!");
    const snap = await getDoc(doc(db, 'content', 'test'));
    console.log("Read successful! Data:", snap.data());
  } catch(e) {
    console.error("Firebase Error:");
    console.error(e);
  }
  process.exit(0);
}
run();
