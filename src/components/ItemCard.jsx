import React, { useEffect, useState } from "react";
import { fetchSellItems } from "../fireBase/fireBaseAuth";

const ItemCard = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const sellItemsList = await fetchSellItems();

        console.log("fetched list",sellItemsList);
        
        if (sellItemsList) {
          setCardData(sellItemsList);
          setLoading(false);
        } else {
          setCardData([]);
          setLoading(false);
        }
      } catch (error) {
        console.log("error while fetching card data", error);
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }
  if (cardData.length === 0) {
    return <div>No products available.</div>;
  }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  console.log("card Data",cardData);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {cardData.map((card) => (
        <div
          className="bg-white border border-gray-300 rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          key={card.id}
        >
          <img
            className="w-full h-60 p-2 object-cover"
            src={card.imageUrl}
            alt={card.itemName}
          />
          <div className="p-4">
            <div className="text-xl font-bold text-gray-800">₹{card.price}</div>
            <div className="text-lg font-semibold text-gray-700 mt-1">{card.itemName}</div>
            <div className="text-sm text-gray-500 mt-2">{card.state}, {card.place}</div>
            <div className="text-xs text-gray-400 mt-1">{formatDate(card.createdAt)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCard;
