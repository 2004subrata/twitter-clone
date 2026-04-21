import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            width={"300px"}
            className="ml-2"
            // src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?t=st=1776514638~exp=1776518238~hmac=1d0f2e15b0652f1a06d04361795b03f65f33fd86f05c4be67b1510dc37aeb653&w=740"
            src="https://cdn-icons-png.flaticon.com/512/11823/11823292.png"
            alt="twitter-logo"
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-5xl">Happening Now</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl font-bold">
            {isLogin ? "Login" : "Signup"}
          </h1>
          <form className="flex flex-col w-[70%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}
            <input
              type="text"
              placeholder="Email"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <input
              type="text"
              placeholder="Password"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <button className="bg-[#1A8CD8] border-none my-4 py-2 rounded-full text-lg text-white">
              {isLogin ? "Login" : "Create account"}
            </button>
            <h1>
              {isLogin
                ? "Do not have an account ? "
                : "Already have an account ? "}
              <span
                onClick={loginSignupHandler}
                className="font-bold text-blue-600 cursor-pointer"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
