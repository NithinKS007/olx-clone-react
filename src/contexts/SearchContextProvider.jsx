import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate()

  const handleSearchChange = (searchText) => {
    setSearchQuery(searchText);
    navigate("/")

  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearchChange }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
