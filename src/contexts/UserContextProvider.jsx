import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../fireBase/fireBaseConfig";
import { AuthContext } from "./AuthContextProvider";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUserData = async () => {
      
      if (currentUser) {
        const userDocRef = doc(db, "users",currentUser.uid);
        const userDoc = await getDoc(userDocRef);;
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setLoading(false);
        } else {
          setUserData(null);
          setLoading(false);
        }
      } else {
        setUserData(null);
        setLoading(false);
      }
    };

    getUserData();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("data",userData);
  
  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
