import admin from "firebase-admin";
import firebaseInfo from "./firebase-info.js";

admin.initializeApp({
  credential: admin.credential.cert(firebaseInfo as admin.ServiceAccount)
});

export default admin;

