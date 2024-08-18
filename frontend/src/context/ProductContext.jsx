import { createContext, useCallback, useEffect, useReducer } from "react";

import axios from "../helpers/axios";

const ProductContext = createContext();

const initialState = {
  products: [],
  loading: false,
  links: null,
};

const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.data,
        links: action.payload.links,
        loading: false,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };

    case "DELETE_PRODUCTS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
        loading: false,
      };

    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: state.products.map((product) => {
          return product._id === action.payload._id ? action.payload : product;
        }),
        loading: false,
      };

    case "LOADING":
      return { ...state, loading: true };

    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const fetchProducts = useCallback(async (page = 1) => {
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.get(`/api/products?page=${page}`, {
        headers: {
          Authorization: `Bearer ${document.cookie}`,
        },
        withCredentials: true,
      });

      const products = res.data;

      dispatch({ type: "SET_PRODUCTS", payload: products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider value={{ state, dispatch, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
