import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import IndexRoute from "./routes/Index.route";
import { Toaster } from "./components/ui/sonner.jsx";
import { BookAudio, Check, Loader, OctagonAlert, ShieldX } from "lucide-react";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { FavoriteContextProvider } from "./context/FavoriteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ProductContextProvider>
      <CartContextProvider>
        <FavoriteContextProvider>
          <IndexRoute />
        </FavoriteContextProvider>
      </CartContextProvider>
    </ProductContextProvider>

    <Toaster
      classNames=" dark:bg-slate-900"
      toastOptions={{
        classNames: {
          error:
            " border border-red-500 text-red-500 bg-white dark:bg-slate-900",
          success:
            "border border-green-500 text-green-500 bg-white dark:bg-slate-900",
          warning:
            "border border-yellow-500 text-yellow-500 bg-white dark:bg-slate-900",
          info: "border border-blue-500 text-blue-500 bg-white dark:bg-slate-900",
        },
      }}
      icons={{
        success: <Check />,
        info: <BookAudio />,
        warning: <OctagonAlert />,
        error: <ShieldX />,
        loading: <Loader />,
      }}
    />
  </AuthContextProvider>
);
