import React from "react";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import InfoCheckout from "../../components/InfoCheckout";

function Buy() {
  const person = {
    name: "Nguyễn Thúc Thùy Tiên",
    gender: "Female",
    email: "tiencute@gmail.com",
    phone: "0901232323",
  };
  return (
    <div className="mt-5 w-full bg-red-400">
      <InfoCheckout />
      <div></div>
    </div>
  );
}

export default Buy;
