import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Harmon_Logo from "../../../assets/images/Harmon_Logo.png";
import { resendOtp, verify } from "../../../services/authService";
import { buyPremium } from "../../../services/premiumService";
const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = localStorage.getItem("email");
      const response = await verify(email, otp.join(""));

      if (response) {
        toast.success("Xác thực thành công");

        navigate("/login");
      } else {
        toast.error("Mã OTP không đúng");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await resendOtp(JSON.stringify(email));

      if (response) {
        toast.success("Mã OTP đã được gửi lại");
      } else {
        toast.error("Không thể gửi lại mã OTP");
      }
    } catch (error) {
      toast.error("Không thể gửi lại mã OTP");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-custom-gradient">
      <ToastContainer />
      <div className="flex w-full max-w-sm flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-7 shadow-2xl backdrop-blur-2xl sm:w-3/4 md:w-2/4 lg:w-1/4">
        <img
          src={Harmon_Logo}
          alt="Harmon_Logo"
          className="mx-auto mb-5 h-20 w-20"
        />
        <h2 className="text-xl font-semibold italic text-heading">
          Xác thực OTP
        </h2>
        <p className="text-sm text-heading">
          Nhập mã OTP đã gửi đến email của bạn
        </p>

        <form
          className="mt-6 flex flex-col items-center"
          onSubmit={handleVerify}
        >
          <div className="flex justify-center gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength="1"
                className="size-10 rounded-lg border border-purple-500 text-center text-lg focus:outline-none focus:ring focus:ring-purple-400 lg:size-12"
              />
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 w-1/2 rounded bg-purple-500 px-4 py-2 font-semibold text-white hover:bg-purple-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Đang xác thực..." : "Xác nhận"}
          </button>
        </form>

        <div className="mt-4 flex flex-col items-center justify-center text-purple-800">
          <span className="text-sm">Bạn vẫn chưa nhận được mã OTP?</span>
          <span
            className="cursor-pointer font-bold text-purple-900 hover:underline"
            onClick={handleResendOtp}
          >
            Bấm vào đây để gửi lại
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
