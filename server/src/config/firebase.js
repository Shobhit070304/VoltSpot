import admin from "firebase-admin";
import firebaseInfo from "./firebase-info.js";

admin.initializeApp({
  credential: admin.credential.cert(firebaseInfo)
});

export default admin;

