import React, { useState } from "react";
import LoginFrom from "./_components/LoginFrom";

const LoginPage = () => {
  return (
    <div className="relative">
      <img
        className="w-full h-[700px] rounded-lg"
        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div className="bg-black/50 absolute top-0 bottom-0 left-0 right-6 flex justify-end py-10 ">
        <div className="bg-foreground rounded-lg">
          <p className="text-center text-white font-medium text-xl mt-7">
            Shop Game DD Work
          </p>
          <LoginFrom />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
