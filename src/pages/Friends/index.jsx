import React from "react";
import SideBar from "./SideBar";
import Requests from "./Requests";

function Friends() {
  return (
    <div className="grid max-h-screen w-full grid-cols-10 gap-5 overflow-hidden px-10 py-5">
      <div className="col-span-2 h-full">
        <div className="sticky top-0">
          <SideBar />
        </div>
      </div>

      <div className="col-span-8 overflow-y-auto rounded-lg bg-gray-200">
        <Requests />
      </div>
    </div>
  );
}

export default Friends;
