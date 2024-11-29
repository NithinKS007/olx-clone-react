import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../fireBase/fireBaseConfig";
import { AuthContext } from "./AuthContextProvider";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const getUserData = async () => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  };
  
  useEffect(() => {
    getUserData();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
