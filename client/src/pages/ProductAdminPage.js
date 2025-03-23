import React, { useEffect, useState } from 'react';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../summaryAPI/SummaryApi';
import Axios from '../utils/Axios';
import Loading from '../components/Loding';
import { IoSearchOutline } from "react-icons/io5";
import ProductCardAdmin from '../components/ProductCardAdmin';

const ProductAdminPage = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // 🔹 Store delayed search input

  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // Delay API call by 500ms

    return () => clearTimeout(handler);
  }, [search]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: debouncedSearch, //  Use debounced value
        }
      });

      const { data: resData } = res;

      if (resData.success) {
        setTotalPageCount(resData.totalNoPage);
        setProductData(resData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when `page` or `debouncedSearch` changes
  useEffect(() => {
    fetchProductData();
  }, [page, debouncedSearch]); // Now updates correctly

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Product</h2>
        <div className='h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200'>
          <IoSearchOutline size={25} />
          <input
            type='text'
            placeholder='Search product here ...'
            className='h-full w-full outline-none bg-transparent'
            value={search}
            onChange={(e) => setSearch(e.target.value)} //  Set search input
          />
        </div>
      </div>

      {loading && <Loading />}

      <div className='p-4 bg-blue-50'>
        <div className='min-h-[55vh]'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {productData.map((p, index) => (
              <ProductCardAdmin key={p._id} data={p} fetchProductData={fetchProductData} />
            ))}
          </div>
        </div>

        <div className='flex justify-between my-4'>
          <button onClick={handlePrevious} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
          <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdminPage;
