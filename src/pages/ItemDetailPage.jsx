import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ItemDetail from "../components/ItemDetail";

const ItemDetailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
      <ItemDetail />
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetailPage;
