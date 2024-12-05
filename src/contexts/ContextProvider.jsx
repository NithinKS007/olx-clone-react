import React, { createContext, useState, useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../fireBase/fireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { fetchSellItems } from "../fireBase/fireBaseUtils";

export const AuthContext = createContext();
export const UserContext = createContext();
export const SearchContext = createContext();
export const SellItemContext = createContext();

export const ContextProvider = ({ children }) => {
  //Authentication
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  //UserDataContext
  const [userData, setUserData] = useState(null);

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

  //SearchContext
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearchChange = (searchText) => {
    setSearchQuery(searchText);
    navigate("/");
  };

  //SellItemContext 
  const [items, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellItemData = async () => {
    try {
      const sellItemsList = await fetchSellItems();

      if (sellItemsList) {
        setItemList(sellItemsList);
        setLoading(false);
      } else {
        setItemList([]);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching card data", error);
      setItemList([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellItemData();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      <UserContext.Provider value={{ userData }}>
        <SearchContext.Provider value={{ searchQuery, handleSearchChange }}>
          <SellItemContext.Provider value={{ items, loading }}>
            {children}
          </SellItemContext.Provider>
        </SearchContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};


