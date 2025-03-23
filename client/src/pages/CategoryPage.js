import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Axios from "../utils/Axios";
import SummaryApi from "../summaryAPI/SummaryApi";
import toast from "react-hot-toast";
import Loading from "../components/Loding";
import NoData from "../components/NoData";
import EditCategory from "../components/EditCategory";
import CofirmBox from "../components/CofirmBox";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {

    const [openUploadCategory,setOpenUploadCategory] = useState(false)
    const [loading,setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] = useState({
        name : "",
        image : "",
    })
    const [openConfimBoxDelete,setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })

    const fetchCategory = async()=>{
        try {
            setLoading(true)
            const res= await Axios({
                ...SummaryApi.getCategory
            })
            const { data : resData } = res;

            if(resData.success){
                setCategoryData(resData.data)
            }
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])



    const handleDeleteCategory = async()=>{
      try {
          const res = await Axios({
              ...SummaryApi.deleteCategory,
              data : deleteCategory
          })

          const { data : resData } = res

          if(resData.success){
              toast.success(resData.message)
              fetchCategory()
              setOpenConfirmBoxDelete(false)
          }
      } catch (error) {
          AxiosToastError(error)
      }
  }
  
  
  return (
    <section className=''>
    <div className='p-2   bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
    </div>
    {
        !categoryData[0] && !loading && (
            <NoData/>
        )
    }

<div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {categoryData.map((category) => (
    <div
      className="w-full max-w-[140px] bg-white rounded-lg shadow-md p-3 flex flex-col items-center transition-transform duration-200 hover:scale-105"
      key={category._id}
    >
      <img
        alt={category.name}
        src={category.image}
        className="w-full h-[120px] object-contain rounded-md"
      />
      <h3 className="text-sm font-semibold mt-2 text-center">{category.name}</h3>
      <div className="flex items-center gap-2 mt-3 w-full">
        <button
          onClick={() => {
            setOpenEdit(true);
            setEditData(category);
          }}
          className="flex-1 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-600 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setOpenConfirmBoxDelete(true);
            setDeleteCategory(category);
          }}
          className="flex-1 text-xs font-medium bg-red-100 hover:bg-red-200 text-red-600 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


    {
        loading && (
            <Loading/>
        )
    }

    {
        openUploadCategory && (
            <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
        )
    }

     {
        openEdit && (
            <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
        )
    }

     {
       openConfimBoxDelete && (
        <CofirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
       ) 
    }  
</section>
  )
};

export default CategoryPage;
