import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { setCredentials, clearUser } from "../../../app/slices/userSlice"; // Import action từ Redux
import { register } from "../../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  userName: Yup.string().required("Tên đăng nhập không được để trống"),
  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ hoa")
    .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ thường")
    .matches(/\d/, "Mật khẩu phải chứa ít nhất một số")
    .matches(/[@$!%*?&]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt")
    .required("Mật khẩu không được để trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Xác nhận mật khẩu không khớp")
    .required("Xác nhận mật khẩu không được để trống"),
});

function Step3({ currentStep, setCurrentStep }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isAgree, setIsAgree] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: user.userName || "",
      password: user.password || "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        setCredentials({
          userName: values.userName,
          password: values.password,
        }),
      );
      console.log("Lưu vào Redux:", values);
      setCurrentStep(currentStep + 1);
    },
  });

  const handleBack = () => {
    dispatch(
      setCredentials({
        userName: formik.values.userName,
        password: formik.values.password,
      }),
    );
    setCurrentStep(currentStep - 1);
  };
  function transGender(gender) {
    switch (gender.trim().toLowerCase()) {
      case "nam":
        return "Male";
      case "nữ":
        return "Female";
      default:
        return "Other";
    }
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", user.email);
    try {
      const response = await register({
        userName: formik.values.userName,
        password: formik.values.password,
        fullName: user.fullName,
        email: user.email,
        phone: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        gender: transGender(user.gender),
        avatarUrl: user.avatarUrl,
        weight: user.weight,
      });
      if (response.status == 201) {
        dispatch(clearUser());

        formik.resetForm();
        toast.success("Đang chuyển đến trang xác thực mã OTP");
        navigate("/verify-otp");
      } else {
        toast.error("Đăng Ký thất bại");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit} className="mt-5 w-full">
      <div className="mb-5 flex w-full flex-col gap-2 text-heading">
        <label className="font-medium" htmlFor="userName">
          Tên Đăng Nhập
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          className="w-full rounded-xl border border-gray-400 bg-transparent px-4 py-2 placeholder-slate-400 outline-none backdrop-blur-sm"
          placeholder="username123@"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.userName && formik.errors.userName && (
          <p className="text-xs text-red-500">{formik.errors.userName}</p>
        )}
      </div>

      <div className="mb-5 flex w-full flex-col gap-2 text-heading">
        <label className="font-medium" htmlFor="password">
          Mật Khẩu
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full rounded-xl border border-gray-400 bg-transparent px-4 py-2 placeholder-slate-400 outline-none backdrop-blur-sm"
          placeholder="Nhập mật khẩu"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-xs text-red-500">{formik.errors.password}</p>
        )}
      </div>

      <div className="mb-5 flex w-full flex-col gap-2 text-heading">
        <label className="font-medium" htmlFor="confirmPassword">
          Xác Nhận Mật Khẩu
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="w-full rounded-xl border border-gray-400 bg-transparent px-4 py-2 placeholder-slate-400 outline-none backdrop-blur-sm"
          placeholder="Nhập lại mật khẩu"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-xs text-red-500">
            {formik.errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="flex gap-2 text-heading">
        <input
          type="checkbox"
          className="accent-heading"
          checked={isAgree}
          onChange={() => setIsAgree(!isAgree)}
        />
        <label onClick={() => setIsAgree(!isAgree)} className="cursor-pointer">
          Tôi đã đọc và đồng ý với các chính sách và điều khoản của Harmon
        </label>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-heading px-4 py-2 text-white hover:opacity-80"
          onClick={handleBack}
        >
          <IoMdArrowRoundBack /> Trở về
        </button>
      </div>
      <button
        type="button"
        className={`mt-10 w-full rounded-lg py-2 text-white ${
          formik.isValid && isAgree
            ? "bg-heading"
            : "cursor-not-allowed bg-gray-400"
        }`}
        disabled={!formik.isValid || !isAgree}
        onClick={handleRegister}
      >
        Đăng Ký
      </button>
    </form>
  );
}

export default Step3;
