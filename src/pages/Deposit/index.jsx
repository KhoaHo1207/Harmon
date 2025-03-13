import React, { useState } from "react";
import InfoCheckout from "../../components/InfoCheckout";

function Deposit() {
  const [amount, setAmount] = useState(0);
  const [description, setDesciption] = useState("");
  return (
    <div className="my-5 grid w-full max-w-7xl grid-cols-3 justify-center gap-10">
      <div className="col-span-2">
        <InfoCheckout />
      </div>
      <div className="flex flex-col rounded-lg border border-violet-200 bg-[#F1E0FD] p-5 text-gray-600">
        <h3 className="mb-5 text-2xl font-bold">Thông Tin Thanh Toán</h3>
        <div className="mb-5 flex w-full flex-col gap-2">
          <label className="font-semibold" htmlFor="amount">
            Số Tiền Nạp (đ)
          </label>
          <input
            type="number"
            min={5000}
            value={amount.toLocaleString("vi-VN")}
            name="amount"
            id="amount"
            className="rounded-lg border border-violet-400 bg-transparent px-4 py-2 outline-none"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-5 flex w-full flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold">
            Mô Tả
            <p className="text-xs">(Không bắt buộc)</p>
          </label>
          <textarea
            value={description}
            name="description"
            id="desciption"
            className="rounded-lg border border-violet-400 bg-transparent px-4 py-2 outline-none"
            onChange={(e) => setDesciption(e.target.value)}
            rows={5}
          />
        </div>

        <button className="rounded-lg bg-heading px-5 py-2 text-white">
          Thanh Toán
        </button>
      </div>
    </div>
  );
}

export default Deposit;
