import { useContext } from "react";
import { SellItemContext,SearchContext } from "../contexts/ContextProvider";
import ShimmerItemList from "./ShimmerItemList";
import ItemList from "./ItemList";

const ItemCard = () => {
  const { items, loading } = useContext(SellItemContext);
  const { searchQuery } = useContext(SearchContext);

  const searchTerm = searchQuery.toLowerCase();
  const filteredItems = items.filter((item) => {
    return (
      item.itemName.toLowerCase().includes(searchTerm) ||
      item.state.toLowerCase().includes(searchTerm) ||
      item.place.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      {loading ? <ShimmerItemList itemsCount={8} /> : <ItemList filteredItems={filteredItems} />}
    </>
  );
};

export default ItemCard;
