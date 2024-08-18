import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ShoppingCart, UserRound } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
import { CartContext } from "../../context/CartContext";
import logo from "../../assets/app-store_906320.png";
import ThemeToggle from "../Theme/ThemeToggle";

const NavbarComponent = () => {
  const { state } = useContext(AuthContext);
  const { state: cart } = useContext(CartContext);
  console.log(state);

  const nav = useNavigate();

  const [name, setName] = useState("");

  const [categories, setCategories] = useState([]);

  const [isDropDown, setIsDropDown] = useState(false);

  const { user, loading } = state;
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/users/categories");
      setCategories(res.data);
    })();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/search?q=${name}`);
      if (response.status === 200) {
        nav("/search", { state: response?.data });
        setName("");
      }
    } catch (err) {
      console.log(err);
      console.error(err);
    }
  };

  const dropDownHandler = () => {
    setIsDropDown(!isDropDown);
  };

  return (
    <div className="max-w-[1200px] mx-auto py-3 dark:bg-dark-background bg-light-background relative">
      <div className="flex items-center justify-between px-2 md:px-0 ">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <img className="w-10 h-10" src={logo} alt="Shopcart logo" />
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex items-center z-50 bg-white dark:bg-slate-900 md:dark:bg-transparent md:space-x-4 space-y-5 md:space-y-0 px-4 md:px-0 py-7 md:py-0 text-sm absolute md:static left-0 right-0 transition-all duration-500 ease-in-out transform  max-w-xs md:mx-0 mx-auto rounded-xl ${
            isDropDown
              ? "opacity-100 translate-y-0 top-14 z-50 shadow-xl"
              : "opacity-0 translate-y-[-20px] top-14 pointer-events-none md:pointer-events-auto"
          } md:opacity-100 md:translate-y-0 md:top-0 md:shadow-none`}
        >
          <li>
            <Link
              to={"/"}
              className="text-light-text dark:text-dark-text transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/category"}
              className="text-light-text dark:text-dark-text transition-colors duration-300"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to={"/new"}
              className="text-light-text dark:text-dark-text transition-colors duration-300"
            >
              What's New
            </Link>
          </li>
          <li>
            <Link
              to={"/order-history"}
              className="text-light-text dark:text-dark-text transition-colors duration-300"
            >
              My Orders
            </Link>
          </li>
        </ul>

        {/* Search Input */}
        <div className="absolute md:static -bottom-12 left-0 right-0">
          <form onSubmit={submitHandler}>
            <Input
              value={state?.name}
              onChange={(e) => setName(e.target.value)}
              className="md:h-8 h-10 w-[350px] md:w-[300px] mx-auto dark:bg-dark-card  dark:text-dark-text text-light-text"
              placeholder="Search products"
            />
          </form>
        </div>

        {/* Auth & Cart Section */}
        <div className="flex items-center space-x-5">
          {/* Account */}
          <div className="flex items-center space-x-1">
            <UserRound
              className="text-light-text dark:text-dark-text"
              size={16}
            />
            <Link
              to={`/profile/${state?.user?._id}`}
              className="text-sm text-light-text dark:text-dark-text"
            >
              Account
            </Link>
          </div>

          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <div className="flex items-center space-x-1">
              <ShoppingCart
                className="text-light-text dark:text-dark-text"
                size={16}
              />
              <span className="text-sm text-light-text dark:text-dark-text">
                Cart
              </span>
            </div>
            <span className="absolute -top-3 right-0 bg-red-500 text-white px-1 rounded text-xs">
              {cart?.carts.length}
            </span>
          </Link>

          {/* Dark Mode Toggle */}
          <ThemeToggle userId={state?.user?._id} />

          {/* Mobile Icon */}
          <Button
            onClick={dropDownHandler}
            variant="outline"
            size="sm"
            className="relative w-8 h-8 p-0 flex items-center md:hidden justify-center focus:outline-none transition-all duration-300"
          >
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              {/* Top Line */}
              <span
                className={`block absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                  isDropDown ? "rotate-45 top-2.5" : "-translate-y-1.5"
                }`}
              />
              {/* Middle Line */}
              <span
                className={`block absolute h-0.5 w-full bg-current transition-all duration-300 ease-in-out ${
                  isDropDown ? "opacity-0 scale-50" : "opacity-100 scale-100"
                }`}
              />
              {/* Bottom Line */}
              <span
                className={`block absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                  isDropDown ? "-rotate-45 bottom-2.5" : "translate-y-1.5"
                }`}
              />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
