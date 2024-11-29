import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ShimmerItemList = ({ itemsCount }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-10">
      {Array(itemsCount)
        .fill()
        .map((Item, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <Skeleton height={160} />
            <div className="p-4">
              <Skeleton height={24} width="60%" /> 
              <Skeleton height={20} width="80%" className="mt-2" /> 
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <Skeleton height={16} width="40%" /> 
                <Skeleton height={16} width="20%" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShimmerItemList;
