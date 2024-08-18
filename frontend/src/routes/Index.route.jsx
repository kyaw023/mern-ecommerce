import React, { useContext } from "react";
import App from "../App";
import {
  AdminBrandPage,
  AdminCategoryPage,
  AdminCustomerPage,
  AdminDashboardPage,
  AdminDeliveryPage,
  AdminInfoPage,
  AdminOrderPage,
  AdminProductPage,
  CartPage,
  CategoryPage,
  CheckoutFormPage,
  EditCreateProfilePage,
  FavoritePage,
  HomePage,
  LoginPage,
  OrderConfirmPage,
  OrderDetailPage,
  OrderHistoryPage,
  PasswordResetFormPage,
  ProductDetailPage,
  ProfilePage,
  RegisterPage,
  SearchPage,
  UserProfilePage,
  VerifyPage,
} from "../page";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NewArrivalPage from "../page/product/NewArrival.page";

const IndexRoute = () => {
  const { state } = useContext(AuthContext);

  const { user, loading } = state;

  const isAdmin = user && user?.isAdmin;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: user || loading ? <HomePage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/new",
          element:
            user || loading ? <NewArrivalPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/category",
          element:
            user || loading ? <CategoryPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/checkout-form",
          element:
            user || loading ? <CheckoutFormPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/verify/success/:id",
          element:
            user || loading ? <OrderConfirmPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/verify",
          element:
            user || loading ? <VerifyPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/order-history",
          element:
            user || loading ? <OrderHistoryPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/order-detail/:id",
          element:
            user || loading ? <OrderDetailPage /> : <Navigate to={"/login"} />,
        },

        {
          path: "/cart",
          element: user || loading ? <CartPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/search",
          element:
            user || loading ? <SearchPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/detail/:id",
          element:
            user || loading ? (
              <ProductDetailPage />
            ) : (
              <Navigate to={"/login"} />
            ),
        },
        {
          path: "/login",
          element: !user && !loading ? <LoginPage /> : <Navigate to={"/"} />,
        },
        {
          path: "/register",
          element: !user && !loading ? <RegisterPage /> : <Navigate to={"/"} />,
        },
        {
          path: "/profile/:id",
          element: user && <UserProfilePage />,
          children: [
            {
              path: "editProfile",
              element: <EditCreateProfilePage />,
            },
            {
              path: "reset-password",
              element: <PasswordResetFormPage />,
            },
            {
              path: "favorite",
              element: <FavoritePage />,
            },
            {
              index: true,
              element: <ProfilePage />,
            },
          ],
        },
      ],
    },

    {
      path: "/admin",
      element:
        isAdmin || loading ? <AdminDashboardPage /> : <Navigate to={"/"} />,
      children: [
        {
          path: "customers",
          element: <AdminCustomerPage />,
        },
        {
          path: "delivery",
          element: <AdminDeliveryPage />,
        },
        {
          path: "brand",
          element: <AdminBrandPage />,
        },
        {
          path: "categories",
          element: <AdminCategoryPage />,
        },
        {
          path: "products",
          element: <AdminProductPage />,
        },
        {
          path: "info",
          element: <AdminInfoPage />,
        },
        {
          path: "orders",
          element: <AdminOrderPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default IndexRoute;
