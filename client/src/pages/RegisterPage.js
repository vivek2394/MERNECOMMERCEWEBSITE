import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import Axios from "../utils/Axios";
import SummaryApi from "../summaryAPI/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if both pass matches
    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password must be same");
      return;
    }
    try {
      const res = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (res.data.error) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  // ittrate on all field and check all feild are filled or not. and give true or false value
  //if all fields are filled then give true otherwise gives false.
  const valideValue = Object.values(data).every((el) => el);

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p>Welcome to Blinkit</p>
        <form className="grid gap-4 mt-6">
          {/* name */}
          <div className="grid gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          {/* email */}
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          {/* password */}
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200 w-full"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your Password"
              />
              <div
                onClick={() => setshowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye size={22} />
                ) : (
                  <FaRegEyeSlash size={22} />
                )}
              </div>
            </div>
          </div>
          {/* confrim password */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200 w-full"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your Confirm Password"
              />
              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaRegEye size={22} />
                ) : (
                  <FaRegEyeSlash size={22} />
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>
        
        <p>
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>

      {/* if user already have account  */}
    </section>
  );
};

export default RegisterPage;
