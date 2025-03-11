import React, { useEffect, useRef, useState } from "react";
import { getListeners } from "../../services/listenerService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Item from "./Item";
import { FaFilter } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

function Listener() {
  const navigate = useNavigate();
  const [listeners, setListeners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [priceSortOpen, setPriceSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState({
    field: "",
    value: false,
  });
  const dropdownRef = useRef(null);
  const topics = [
    { key: 1, label: "Stress Lo Âu" },
    { key: 2, label: "Trầm Cảm" },
    { key: 3, label: "Kiểm Soát Cảm Xúc" },
    { key: 4, label: "Rối Loạn Giấc Ngủ" },
    { key: 5, label: "Kỹ Năng Giao Tiếp" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListeners(sortBy);
        setListeners(response.data.items);
        setCurrentPage(response.data.page);
        setSize(response.data.size);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách người nghe");
      }
    };
    fetchData();
  }, [sortBy]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPriceSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSortByPrice = (value) => {
    setSortBy({ field: "sortByPrice", value: value });
  };
  return (
    <div className="my-10 flex w-full max-w-[90rem] flex-col items-start px-4 md:px-8">
      <h1 className="text-xl font-bold text-heading md:text-3xl">
        DANH SÁCH NGƯỜI NGHE
      </h1>

      {/* FILTER & SORT SECTION */}
      <div className="my-6 flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Filter Button & Topics */}
        <div className="my-1 flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-heading px-3 py-1 text-heading">
            <FaFilter />
            <span className="text-sm md:text-lg">Lọc</span>
          </button>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <div
                key={topic.key}
                className="cursor-pointer rounded-lg border border-gray-400 bg-white px-3 py-1 text-xs hover:bg-gray-200 md:text-sm"
              >
                # {topic.label}
              </div>
            ))}
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className="relative flex items-center">
          <p className="mr-3 text-sm md:text-lg">Sắp xếp theo:</p>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-400 px-3 py-1"
              onClick={() => setPriceSortOpen(!priceSortOpen)}
            >
              Giá
              {priceSortOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </button>
            {priceSortOpen && (
              <div className="absolute left-0 z-50 mt-2 w-32 rounded-lg border border-gray-400 bg-white p-2 shadow-lg">
                <p
                  className="cursor-pointer p-1 hover:bg-gray-100"
                  onClick={() => handleSortByPrice(true)}
                >
                  Thấp - Cao
                </p>
                <p
                  className="cursor-pointer p-1 hover:bg-gray-100"
                  onClick={() => handleSortByPrice(false)}
                >
                  Cao - Thấp
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LISTENER LIST */}
      {listeners.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listeners.map((listener, index) => (
            <Item listener={listener} key={index} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center text-heading">
          <p className="text-lg font-medium">
            Hiện tại chưa có danh sách người nghe nào
          </p>
          <p className="text-base">Vui lòng quay lại sau</p>
          <button
            className="mt-6 rounded-lg bg-text px-6 py-3 font-medium text-white transition-all hover:bg-opacity-80"
            onClick={() => navigate("/")}
          >
            Trở về
          </button>
        </div>
      )}
    </div>
  );
}

export default Listener;
