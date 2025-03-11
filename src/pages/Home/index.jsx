import React from "react";
import Harmon_Banner from "../../assets/images/Harmon_Banner.png";
function Home() {
  return (
    <main className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="relative mt-4 flex w-full flex-col items-center justify-end rounded-lg shadow-md sm:mt-6 sm:rounded-xl md:mt-8 md:rounded-2xl lg:mt-10 lg:rounded-full">
        <img
          src={Harmon_Banner}
          alt="Harmon_Banner"
          className="h-auto w-full rounded-lg object-cover"
        />
        <div className="absolute bottom-2 mt-4 cursor-pointer rounded-md bg-[#F1E0FD] px-4 py-1 text-sm font-medium text-[#8A55D4] shadow-lg duration-300 hover:scale-105 sm:bottom-4 sm:rounded-lg sm:px-6 sm:py-1.5 sm:text-base md:bottom-6 md:px-8 md:py-2 md:text-lg md:hover:scale-110 lg:bottom-10 lg:px-10">
          Đặt Lịch Ngay
        </div>
      </div>
    </main>
  );
}

export default Home;
