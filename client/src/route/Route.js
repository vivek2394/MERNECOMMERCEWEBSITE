import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuPageMobile from "../pages/UserMenuPageMobile";
import Dashboard from "../layouts/Dashboard";
import ProfilePage from "../pages/ProfilePage";
import MyOrdersPage from "../pages/MyOrdersPage";
import AddressPage from "../pages/AddressPage";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProductPage from "../pages/UploadProductPage";
import ProductAdminPage from "../pages/ProductAdminPage";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/ProductListPage ";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobilePage from "../pages/CartMobilePage";
import CheckoutPage from "../pages/CheckoutPage";
import SuccessPage from "../pages/SuccessPage";
import Cancel from "../pages/CancelPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuPageMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "myorders",
            element: <MyOrdersPage />,
          },
          {
            path: "address",
            element: <AddressPage />,
          },
          {
            path: "category",
            element: (
              <AdminPermision>
                <CategoryPage />
              </AdminPermision>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermision>
                <SubCategoryPage />
              </AdminPermision>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermision>
                <UploadProductPage />
              </AdminPermision>
            ),
          },
          {
            path: "product",
            element: <ProductAdminPage />,
          },
        ],
      },
      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },
      {
        path: "product/:product",
        element: <ProductDisplayPage />,
      },
      {
        path: "cart",
        element: <CartMobilePage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },

      {
        path: "success",
        element: <SuccessPage />,
      },
      {
        path : 'cancel',
        element : <Cancel/>
    }
    //   
    ],
  },
]);

export default router;
