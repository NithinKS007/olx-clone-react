import { createContext, useState, useEffect } from "react"; 
import { fetchSellItems } from "../fireBase/fireBaseUtils";

export const SellItemContext = createContext();

const SellItemContextProvider = ({ children }) => {
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
    <SellItemContext.Provider value={{ items ,loading}}>  
      {children}
    </SellItemContext.Provider>
  );
};

export default SellItemContextProvider;
