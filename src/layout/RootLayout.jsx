import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <div className="relative bg-theme scrollbar-hide">
      <div className="sticky top-0 z-50 my-3">
        <Header />
      </div>
      <div className="h-screen min-h-screen overflow-y-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default RootLayout;
