import React from "react";
import { FaStar } from "react-icons/fa";

function Item({ item }) {
  return (
    <div className="flex w-full p-3 sm:w-1/2 sm:p-4 md:w-1/3 lg:w-1/3">
      <div className="flex h-full w-full flex-col items-center gap-3 rounded-xl bg-[#F1E0FD] p-4 transition-transform duration-300 hover:scale-105 sm:gap-4 sm:p-6 sm:hover:scale-110 md:gap-5 md:p-8 lg:p-10">
        <img
          src={item.image}
          alt={item.name}
          className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
        />
        <h3 className="text-center text-lg font-bold text-heading sm:text-xl md:text-2xl">
          {item.name}
        </h3>
        <span className="text-center text-base font-medium text-heading sm:text-lg md:text-xl lg:text-2xl">
          {item.cost.toLocaleString("vi-VN")}.000 đ/tháng
        </span>
        <div className="mt-1 flex w-full flex-col items-start justify-start gap-2 sm:mt-2 sm:gap-3">
          {item.info.map((inf, index) => {
            return (
              <div
                className="flex w-full items-start justify-start"
                key={index}
              >
                <FaStar className="mr-2 mt-1 size-3 flex-shrink-0 text-heading" />
                <p className="text-left text-sm text-[#696969] sm:text-base">
                  {" "}
                  {inf.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-auto pt-4">
          <button className="w-full rounded-lg bg-[#E6BFFF] px-6 py-2 text-sm font-medium text-[#8A55D4] sm:w-auto sm:px-8 sm:py-2.5 sm:text-base sm:font-semibold md:px-10 md:py-3">
            Mua Ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
