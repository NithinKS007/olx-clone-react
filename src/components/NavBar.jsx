import React, { useContext, useReducer} from "react";
import { Link, useNavigate } from "react-router-dom";
import olxLogo from "../assets/olxLogo.svg";
import { FaUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { SearchContext,AuthContext,UserContext } from "../contexts/ContextProvider";
import { signOutUser } from "../fireBase/fireBaseUtils";

const NavBar = () => {
  const initialState = {
    menuOpen: false,
  };

  const menuReducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_MENU":
        return { ...state, menuOpen: !state.menuOpen };
      default:
        return state;
    }
  };

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };
  const [state, dispatch] = useReducer(menuReducer, initialState);
  const { searchQuery, handleSearchChange } = useContext(SearchContext);
  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSearch = (searchQuery) => {
    handleSearchChange(searchQuery);
  };
  const handleLogout = async () => {
    await signOutUser();
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-4 w-2/3">
        <img src={olxLogo} alt="OLX Logo" className="h-10" />

        <div className="items-center space-x-4 w-full hidden lg:flex">
          <input
            type="text"
            className="px-4 py-2 w-80 border-black border-2 rounded-md"
            placeholder="Search city, area or location..."
          />
          <div className="flex w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="px-4 py-2 flex-grow border-black border-2 rounded-l-md"
              placeholder="Find Cars, Mobile Phones and more..."
            />
            <button
              onClick={() => handleSearch(searchQuery)}
              className="bg-[#1f2937] text-gray-50 text-2xl px-3 py-2 rounded-r-md"
            >
              <IoSearchOutline />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            <FaUser className="text-gray-500 h-8 w-8 rounded-full" />
            <span className="text-lg hidden lg:block">{userData?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-[#1f2937] text-white px-4 py-2 rounded-md hidden lg:block"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signin"
            className="bg-[#1f2937] text-white px-4 py-2 rounded-md hidden lg:block"
          >
            Login
          </Link>
        )}
        <Link
          to={"/addItem"}
          className="border-2 border-black font-bold text-black px-4 py-2 rounded-2xl hidden lg:block"
        >
          <span className="text-lg"> + </span> SELL
        </Link>

        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {state.menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {state.menuOpen && (
        <div className="lg:hidden absolute top-14 left-0 w-full bg-white shadow-md p-4 space-y-4">
          <input
            type="text"
            className="px-4 py-2 w-full border-black border-2 rounded-md"
            placeholder="Search city, area or location..."
          />
          <div className="flex w-full">
            <input
              type="text"
              className="px-4 py-2 flex-grow border-black border-2 rounded-l-md"
              placeholder="Find Cars, Mobile Phones and more..."
            />
            <button className="bg-black text-gray-50 text-2xl px-3 py-2 rounded-r-md">
              <IoSearchOutline />
            </button>
          </div>
          <div className="flex items-center justify-between">
          <FaUser className="text-gray-500 h-8 w-8 rounded-full" />
            <Link
              to={"/addItem"}
              className="border-2 border-black font-bold text-black px-4 py-2 rounded-2xl"
            >
              <span className="text-lg"> + </span> SELL
            </Link>
          </div>
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-[#1f2937] text-white px-4 py-2 rounded-md w-full"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="bg-[#1f2937] text-white px-4 py-2 rounded-md w-full"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
