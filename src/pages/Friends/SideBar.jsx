import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

function SideBar() {
  const items = [
    {
      key: 1,
      label: "Trang chủ",
      icon: <FaUserFriends />,
    },
    {
      key: 2,
      label: "Lời mời kết bạn",
      icon: <FaUserFriends />,
    },
    {
      key: 3,
      label: "Gợi ý",
      icon: <FaUserFriends />,
    },
    {
      key: 4,
      label: "Tất cả bạn bè",
      icon: <FaUserFriends />,
    },
  ];

  return (
    <div className="sticky top-0 flex h-screen flex-col items-start justify-start rounded-lg bg-custom-gradient p-2">
      <h3 className="px-3 py-5 text-xl font-bold">Bạn Bè</h3>
      <div className="flex w-full flex-col items-start justify-start">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex w-full cursor-pointer items-center justify-between rounded-md p-3 hover:bg-stone-200/70"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gray-200 p-2 text-heading">
                {item.icon}
              </span>
              <span className="font-semibold">{item.label}</span>
            </div>

            <FaChevronRight className="text-gray-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
