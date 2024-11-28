import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <ItemCard />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
