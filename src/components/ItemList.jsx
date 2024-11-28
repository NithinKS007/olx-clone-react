import { Link } from "react-router-dom";

const ItemList = ({ filteredItems }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-10">
      {filteredItems.map((item) => (
        <Link
          to={`/item/${item.id}`}
          key={item.itemId}
          className="bg-white border border-gray-300 rounded-lg overflow-hidden"
        >
          <img
            className="w-full h-40 p-2 object-cover"
            src={item.imageUrl}
            alt={item.itemName}
          />
          <div className="p-4">
            <div className="text-xl font-bold text-gray-800">
              ₹{item.price}
            </div>
            <div className="text-lg font-semibold text-gray-700 mt-1">
              {item.itemName}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <div>
                {item.state}, {item.place}
              </div>
              <div className="text-xs text-gray-400">
                  {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ItemList;
