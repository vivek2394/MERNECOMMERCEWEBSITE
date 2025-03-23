import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../summaryAPI/SummaryApi'

const ProductPage = () => {
  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)

  const fetchProductData = async()=>{
    try {
        const res = await Axios({
           ...SummaryApi.getProduct,
           data : {
              page : page,
           }
        })

        const { data : resData } = res
        
        if(resData.success){
          
          setProductData(resData.data)
        }

    } catch (error) {
      AxiosToastError(error)
    }
  }
  
  console.log("product page")
  useEffect(()=>{
    fetchProductData()
  },[])
  return (
    <section className=''>
    <div className='p-2   bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button  className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
    </div>
    </section>
  )
}

export default ProductPage
