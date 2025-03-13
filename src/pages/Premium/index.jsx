import React, { useEffect, useState } from "react";
import { premium_list } from "./premium_list";
import cute_sad_icon from "../../assets/images/cute_sad_icon.png";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import { toast } from "react-toastify";
import { getPremiums } from "../../services/premiumService";

function Premium() {
  const [premiums, setPremiums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getPremiums();
        setPremiums(response.items);
      };
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  }, []);

  return (
    <div className="mt-6 flex flex-col items-center justify-center px-4 sm:mt-8 sm:px-6 md:mt-10 md:px-8">
      <h1 className="mb-8 text-center text-xl font-bold text-heading sm:mb-12 sm:text-2xl md:mb-16 md:text-3xl lg:mb-20">
        CÁC GÓI PREMIUM
      </h1>

      {premiums && premiums.length > 0 ? (
        <div className="w-full max-w-6xl overflow-hidden p-10">
          <div className="-mx-3 flex flex-wrap sm:-mx-4 lg:justify-between">
            {premiums.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-2 sm:mt-8 sm:gap-3 md:mt-10">
          <img
            src={cute_sad_icon}
            alt="no item found"
            className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
          />
          <p className="text-center text-lg font-semibold italic text-heading sm:text-xl">
            Chưa có gói Premium nào
          </p>
          <button
            className="mt-4 rounded-md bg-text px-4 py-2 text-white transition-transform duration-300 hover:scale-105 sm:mt-5 sm:px-5 sm:hover:scale-110 md:mt-7"
            onClick={() => navigate("/")}
          >
            Trở về trang chủ
          </button>
        </div>
      )}
    </div>
  );
}

export default Premium;
