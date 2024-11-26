import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./fireBaseConfig";
import { toast } from "react-toastify";

const registerUser = async (name, email, phone, password) => {
  try {
    name = String(name);
    email = String(email);
    phone = String(phone);
    password = String(password);

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userData = response.user;

    await addDoc(collection(db, "users"), {
      uid: userData.uid,
      name,
      email,
      phone,
    });
    toast.success("Account created successfully!");
  } catch (error) {
    toast.error(`Sign-up failed:${error.message}`);
    console.log("Sign-up failed", error);
    console.log("Error code Sign-up", error.code);
  }
};

const signInUser = async (email, password) => {
  try {
    email = String(email);
    password = String(password);

    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
    console.log("Login successful");
  } catch (error) {
    toast.error(`Login error: ${error.message}`);
    console.log("Login error", error.code);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);

    toast.success("Logout successful!");
    console.log("Logout successfully");
  } catch (error) {
    toast.error("Logout failed: " + error.message);
    console.log("Logout failed:", error);
  }
};

export { auth, db, registerUser, signInUser, signOutUser };
