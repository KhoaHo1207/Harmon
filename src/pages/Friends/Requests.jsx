import React from "react";
import { friends } from "./Data";
function Requests() {
  return (
    <div className="h-[1500px] px-5 pt-7">
      <h3 className="mb-5 text-lg font-bold">Lời mời kết bạn</h3>
      <div className="grid grid-cols-6 gap-5">
        {friends &&
          friends.length > 0 &&
          friends.map((friend, index) => {
            return (
              <div
                key={index}
                className="col-span-1 rounded-md border border-gray-300 bg-white shadow-sm"
              >
                <img
                  src={friend.avatarUrl}
                  alt={friend.name}
                  className="h-[200px] w-full rounded-t-md object-cover"
                />
                <div className="p-3">
                  <div className="mb-3 font-semibold">{friend.name}</div>
                  <div className="flex w-full gap-2 text-sm text-gray-500">
                    <span>Giới tính:</span>
                    <span>{friend.gender}</span>
                  </div>
                  <div className="flex w-full gap-2 text-sm text-gray-500">
                    <span>Tuổi:</span>
                    <span>{friend.age}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Requests;
