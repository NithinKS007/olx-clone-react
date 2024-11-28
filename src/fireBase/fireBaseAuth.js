import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./fireBaseConfig";
import { toast } from "react-toastify";
import handleImageUpload from "../utils/cloudinary";

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

    await setDoc(doc(db, "users", userData.uid), {
      uid: userData.uid,
      name,
      authProvider: "local",
      email,
      phone,
    });

    const userDocRef = doc(db, "users", userData.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      toast.success("Account created successfully!");
      return userData;
    } else {
      toast.error("Error creating account.");
    }
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

    const signInSuccess = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("Login successful!");
    console.log("Login successful");
    return signInSuccess;
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

const addItem = async (
  brand,
  year,
  itemName,
  itemId,
  state,
  place,
  zipCode,
  description,
  price,
  username,
  phone,
  selectedImage,
  userId
) => {
  try {
    const imageUrl = await handleImageUpload(selectedImage);

    brand = String(brand);
    year = String(year);
    itemName = String(itemName);
    itemId = String(itemId);
    state = String(state);
    place = String(place);
    zipCode = Number(zipCode);
    description = String(description);
    price = Number(price);
    username = String(username);
    phone = String(phone);

    const itemData = {
      brand,
      year,
      itemName,
      itemId,
      state,
      place,
      zipCode,
      description,
      price,
      username,
      phone,
      createdAt: new Date(),
      userId,
      imageUrl,
    };

    await addDoc(collection(db, "items"), itemData);

    toast.success("Item added successfully");
  } catch (error) {
    toast.error(`Error adding item: ${error.message}`);
  }
};

const fetchSellItems = async () => {
  try {
    const items = await getDocs(collection(db, "items"));

    const itemsList = items.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return itemsList;
  } catch (error) {
    console.log("error while fetching the selling items", error);
  }
};

const fetchSellItemDetails = async (id) => {
  try {
 
    const docRef = doc(db, "items", id);  
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const userCollection = collection(db, "users");
      const q = query(userCollection, where("uid", "==", data.userId));
      const userSnap = await getDocs(q);
      const userDetails = userSnap.docs[0]?.data();

      const itemData = {
        ...data,
        user: userDetails,
      };
      return itemData;
    }
  } catch (error) {
    console.log("error while fetching item details", error);
  }
};
export {
  auth,
  db,
  registerUser,
  signInUser,
  signOutUser,
  addItem,
  fetchSellItems,
  fetchSellItemDetails,
};
