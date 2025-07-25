// components/layouts/MainLayout.jsx
import React from "react";
import { Navigation } from "../ui/Navigation";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <div className="pt-30">{<Outlet />}</div>
    </>
  );
};

export default MainLayout;
