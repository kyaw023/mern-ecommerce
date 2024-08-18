import React, { useContext, useEffect, useState } from "react";

import useFetch from "../../hook/useFetch";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

import BasicRating from "../../components/product/BasicRating";
import { Input } from "../../components/ui/input";
import { FavoriteContext } from "../../context/FavoriteContext";
import { LoadingComponent } from "../../components";

const ProductDetailPage = () => {
  const { state } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { state: favoriteLists, addToFav } = useContext(FavoriteContext);

  const { id } = useParams();
  const { data, isError, isLoading } = useFetch(`/api/products/${id}`, id);

  const [addFav, setAddFav] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    // Parse input value as an integer

    console.log(value);

    if (!isNaN(value) && value >= 1 && data?.stock >= value) {
      // Update input value if valid
      e.target.value = value;
    } else {
      // Reset to default or previous value if invalid (optional)
      e.target.value = 1; // Default value or other fallback
    }
  };

  const changeHandler = (e) => {
    setQuantity(e.target.value);
  };

  const addToCartHandler = () => {
    addToCart(state.user?._id, id, quantity);
  };

  useEffect(() => {
    setAddFav(
      favoriteLists?.favorites.some((fav) => {
        return fav?._id === id;
      })
    );
  }, [favoriteLists?.favorites, id]);

  const addToFavorite = async () => {
    try {
      await addToFav(state.user?._id, id);
      setAddFav(true); // Only set to true if API call succeeds
      toast.success("Added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error(
        `${error?.response?.data?.msg || "Failed to add to favorites"}`
      );
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <section className="py-8 h-screen bg-white md:py-16 dark:bg-transparent antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 border border-gray-800 p-10 rounded-xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className=" h-[400px] object-cover "
                src={import.meta.env.VITE_BACKEND_ASSET_URL + data?.images}
                alt=""
              />
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {data?.name}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  ${data?.price}
                </p>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <BasicRating rate={data?.averageRating} />
                </div>
              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  onClick={() => addToFavorite()}
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill={addFav ? "red" : "white"}
                    color={addFav ? "red" : "black"}
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  Add to favorites
                </button>
                <button
                  onClick={() => addToCartHandler()}
                  className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to cart
                </button>
                <Input
                  type="number"
                  value={quantity}
                  className="w-[100px] dark:bg-gray-700 dark:text-slate-200"
                  placeholder="qunatity"
                  onChange={changeHandler}
                  onInput={handleInputChange}
                />
              </div>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {data?.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </LoadingComponent>
  );
};

export default ProductDetailPage;
