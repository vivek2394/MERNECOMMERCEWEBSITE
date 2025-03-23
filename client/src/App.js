import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useEffect } from "react";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import { setAllCategory, setAllSubCategory,setLoadingCategory } from "./store/productSlice";
import {handleAddItemCart} from './store/cartProduct'

import Axios from "./utils/Axios";
import SummaryApi from "./summaryAPI/SummaryApi";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobileLink from "./components/CartMobile";


function App() {

  const dispatch=useDispatch()
  const location = useLocation()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
}

const fetchCategory = async()=>{
  try {
      dispatch(setLoadingCategory(true))
      const res = await Axios({
          ...SummaryApi.getCategory
      })
      const { data : resData } = res

      if(resData.success){
         dispatch(setAllCategory(resData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
      }
  } catch (error) {
      
  }finally{
    dispatch(setLoadingCategory(false))
  }
}

const fetchSubCategory = async()=>{
  try {
      const res = await Axios({
          ...SummaryApi.getSubCategory
      })
      const { data : resData } = res

      if(resData.success){
         dispatch(setAllSubCategory(resData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
      }
  } catch (error) {
      
  }finally{
  }
}



  useEffect(() => {
    fetchUser();
    fetchCategory()
    fetchSubCategory()
    //  fetchCartItem()
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
    </GlobalProvider>
  );
}

export default App;
