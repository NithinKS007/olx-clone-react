import React, { useEffect, useState } from "react";
import { FaShareAlt, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchSellItemDetails } from "../fireBase/fireBaseUtils";

const ItemDetail = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCardDetailsData = async (id) => {
      try {
        const itemDetails = await fetchSellItemDetails(id);

        if (itemDetails) {
          setItem(itemDetails);
          setLoading(false);
        } else {
          setItem({});
          setLoading(false);
        }
      } catch (error) {
        console.log("error while fetching card details data",error);
        setLoading(false)
      }
    };

    fetchCardDetailsData(id);
  }, []);

  if(loading) {

    return <div>Loading Product details...</div>
  }

  const isEmpty = (item) =>Object.keys(item).length === 0
  if(isEmpty(item)) {
    
     return <div>No Products available in the given data</div>
  }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  console.log("item data received",item);
  
  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div className="flex flex-col sm:flex-row w-full max-w-6xl">
        <div className="sm:w-3/5 w-full flex justify-center items-center bg-black max-h-96 mb-6 sm:mb-0">
          <img
            src={item.imageUrl}
            alt="Product"
            className="object-contain w-full max-h-96"
          />
        </div>
        <div className="sm:w-2/5 w-full px-4">
          <div className="flex justify-between items-center mb-4 p-4 shadow-md">
            <h1 className="text-2xl font-bold">₹ {item.price}</h1>
            <div className="flex space-x-3">
              <FaShareAlt className="text-gray-600 cursor-pointer" />
              <FaHeart className="text-gray-600 cursor-pointer" />
            </div>
          </div>

          <div className="mb-4 p-4 shadow-md">
            <p className="text-gray-600 mb-4">{item.year} - {item.km} km</p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">{item.brand}</span> {item.itemName}
            </p>
            <div>
              <p className="text-gray-800">{item.place}, {item.state} {item.zipCode}</p>
              <p className="text-gray-400 text-sm">Posted on {formatDate(item.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center mb-6 shadow-md p-4">
            <div className="bg-gray-300 rounded-full h-16 w-16 flex items-center justify-center mr-4">
              <img
                src="https://via.placeholder.com/50"
                alt="User"
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold">{item.user.name}</p>
              <p className="font-bold">{item.user.phone}</p>
            </div>
          </div>

          <div className="mb-6 p-4 shadow-md">
            <h2 className="font-semibold">Posted in {new Date(item.createdAt.seconds * 1000).getFullYear()}</h2>
            <p className="text-gray-800">
              {item.place}, {item.state} {item.zipCode}
            </p>
          </div>

          <button className="mb-6 p-4 shadow-md bg-[#1f2937] text-white w-full">
            MAKE THE DEAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
