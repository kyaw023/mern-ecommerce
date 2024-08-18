import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import axios from "../helpers/axios";
import { toast } from "sonner";

const CartContext = createContext();

const initialState = {
  carts: [],
  loading: true,
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        carts: [...state.carts, ...action.payload],
        loading: false,
      };

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        carts: state.carts.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        carts: state.carts.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        carts: state.carts.filter((item) => item?._id !== action.payload),
      };
    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const { state: stateUser } = useContext(AuthContext);

  const id = stateUser?.user?._id;

  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await axios.get(`/api/carts/${id}/carts`);

          const products = res.data;

          dispatch({ type: "ADD_TO_CART", payload: products });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      })();
    }
  }, [id]);

  const addToCart = async (userId, productId, quantity) => {
    console.log(userId, productId, quantity);
    try {
      const products = {
        userId: userId,
        productId: productId,
        quantity: parseInt(quantity),
      };
      const res = await axios.post(`/api/carts/add-cart`, products, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch({ type: "ADD_TO_CART", payload: [res.data] });
        toast.success("Products successfully added to the cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };
  return (
    <CartContext.Provider value={{ state, dispatch, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
