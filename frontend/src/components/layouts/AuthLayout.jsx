import React from "react";
import UI_Img from "../../assets/images/ui_img.webp";

function AuthLayout({ children }) {
  return (
    <div className=" flex">
      <div className=" w-screen h-screen md:w-[60vm] px-12 pt-8 pb-12">
        <h2 className=" text-lg font-medium text-black">Task Manager</h2>
        {children}
      </div>
      <div className=" hidden md:flex w-[40vm] h-screen items-center justify-center bg-[url('/bg-img.jpeg')] bg-cover bg-no-repeat bg-center overflow-hidden">
        <img src={UI_Img} className=" w-60 lg:w-[90%]" alt="" />{" "}
      </div>
    </div>
  );
}

export default AuthLayout;
