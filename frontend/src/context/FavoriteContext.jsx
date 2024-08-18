import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import axios from "../helpers/axios";
import { toast } from "sonner";

const FavoriteContext = createContext();

const initialState = {
  favorites: [],
  loading: true,
};

const FavoriteReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
        loading: false,
      };
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FROM_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (product) => product._id !== action.payload
        ),
      };
    case "RESET_FAVORITES":
      return {
        ...state,
        favorites: [],
        loading: true,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

const FavoriteContextProvider = ({ children }) => {
  const { state: stateUser } = useContext(AuthContext);
  const userId = stateUser?.user?._id;

  const [state, dispatch] = useReducer(FavoriteReducer, initialState);

  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
          const res = await axios.get(`/api/users/${userId}/favorites`);
          console.log(res);
          dispatch({ type: "SET_FAVORITES", payload: res.data });
        } catch (error) {
          console.error("Error fetching favorites:", error);
          dispatch({ type: "SET_FAVORITES", payload: [] });
        }
      };
      fetchFavorites();
    } else {
      dispatch({ type: "RESET_FAVORITES" });
    }
  }, [userId]);

  const addToFav = async (productId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.post(`/api/users/${userId}/favorites`, {
        productId,
      });

      if (res.status === 200) {
        // Handle if the response contains the entire favorites list (array)
        if (Array.isArray(res.data)) {
          dispatch({ type: "SET_FAVORITES", payload: res.data });
        } else {
          dispatch({ type: "ADD_TO_FAVORITE", payload: res.data });
        }

        toast.success("Product added to favorites!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to add favorite");
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const removeFromFav = async (productId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.delete(
        `/api/users/${userId}/favorites/${productId}`
      );
      if (res.status === 200) {
        dispatch({ type: "REMOVE_FROM_FAVORITE", payload: productId });
        toast.success("Product removed from favorites!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to remove favorite");
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <FavoriteContext.Provider value={{ state, addToFav, removeFromFav }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteContextProvider };
