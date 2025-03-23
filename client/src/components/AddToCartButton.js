import React, { useEffect, useState } from "react";
import Loading from "./Loding";
import { FaMinus, FaPlus } from "react-icons/fa6";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../summaryAPI/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useSelector } from "react-redux";

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemsDetails] = useState();

  const handleADDTocart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);

      const res = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data?._id,
        },
      });

      const { data: resData } = res;

      if (resData.success) {
        toast.success(resData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Item is already in cart!"); // Show error to the user
      } else {
        AxiosToastError(error); // Handle other errors
      }
    } finally {
      setLoading(false);
    }
  };


   //checking this item in cart or not
   useEffect(() => {
    const checkingitem = cartItem.some(item => item.productId._id === data._id)
    setIsAvailableCart(checkingitem)

    const product = cartItem.find(item => item.productId._id === data._id)
    setQty(product?.quantity)
    setCartItemsDetails(product)
}, [data, cartItem])

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await updateCartItem(cartItemDetails?._id, qty + 1);

    if (res.success) {
      toast.success("Item added");
    }
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) {
      deleteCartItem(cartItemDetails?._id);
    } else {
      const res = await updateCartItem(cartItemDetails?._id, qty - 1);

      if (res.success) {
        toast.success("Item remove");
      }
    }
  };
  return (
    <div className="w-full max-w-[150px]">
      {isAvailableCart ? (
        <div className="flex w-full h-full">
          <button
            onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaMinus />
          </button>

          <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center">
            {qty}
          </p>

          <button
            onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleADDTocart}
          className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
