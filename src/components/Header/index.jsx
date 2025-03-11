import React, { useEffect, useRef, useState } from "react";
import Harmon_Logo from "../../assets/images/Harmon_Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { logout } from "../../app/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = useLocation();
  console.log(currentPath);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close profile dropdown when opening mobile menu
    setMobileProfileOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(event.target)
      ) {
        setMobileProfileOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [
    { key: 1, label: "Trò chuyện", path: "/chats" },
    { key: 2, label: "Góc tâm sự", path: "/tam-su" },
    { key: 3, label: "Chuyên gia", path: "/experts" },
    { key: 4, label: "Bạn bè", path: "/friends" },
    { key: 5, label: "Premium", path: "/premium" },
  ];

  return (
    <header className="mx-auto w-full max-w-7xl rounded-lg bg-custom-gradient px-4 py-3 shadow-sm sm:rounded-xl sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={Harmon_Logo}
            alt="Harmon"
            className="h-10 sm:h-12 md:h-14"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8 xl:space-x-16">
            {items.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`pb-1 text-lg font-medium text-gray-700 transition-colors hover:text-purple-600 ${
                    currentPath.pathname === item.path
                      ? "border-b-2 border-purple-600"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tablet Navigation - Condensed menu for medium screens */}
        <nav className="hidden md:block lg:hidden">
          <ul className="flex space-x-6">
            {items.slice(0, 3).map((item) => (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`pb-1 text-lg font-medium text-gray-700 transition-colors hover:text-purple-600 ${
                    currentPath.pathname === item.path
                      ? "border-b-2 border-purple-600"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="relative">
              <button
                className="flex items-center text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                Khác{" "}
                {profileOpen ? (
                  <RiArrowDropUpLine className="text-xl" />
                ) : (
                  <RiArrowDropDownLine className="text-xl" />
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border bg-white shadow-lg">
                  <ul className="py-2">
                    {items.slice(3).map((item) => (
                      <li key={item.key}>
                        <Link
                          to={item.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Desktop/Tablet User Controls */}
        <div className="hidden items-center space-x-3 md:flex md:space-x-4">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <GoBell className="text-xl text-gray-700" />
          </button>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <span
                className="flex cursor-pointer items-center gap-2 rounded-md p-1 sm:p-2"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src="https://i.pinimg.com/736x/a9/1b/35/a91b35dbe4c722ce0b557dd72a3dca92.jpg"
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10"
                />
                <span className="hidden max-w-20 truncate sm:block">
                  {user.userName}
                </span>
                {profileOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
              </span>

              {profileOpen && (
                <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border bg-white shadow-lg">
                  <ul className="py-2">
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                      Hồ sơ
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              className="rounded-full bg-purple-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-purple-700 sm:px-4 sm:py-2 sm:text-base"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-2 md:hidden">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <GoBell className="text-xl text-gray-700" />
          </button>

          {user && (
            <div className="relative" ref={mobileProfileRef}>
              <button
                onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                className="flex items-center overflow-hidden rounded-full"
              >
                <img
                  src="https://i.pinimg.com/736x/a9/1b/35/a91b35dbe4c722ce0b557dd72a3dca92.jpg"
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </button>

              {mobileProfileOpen && (
                <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border bg-white shadow-lg">
                  <ul className="py-2">
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                      Hồ sơ
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleMobileMenu}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <RiCloseLine className="text-2xl text-gray-700" />
            ) : (
              <RiMenu3Line className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mt-3 border-t pt-3 md:hidden">
          <ul className="flex flex-col space-y-2">
            {items.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className="block rounded-md px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {!user && (
            <div className="mt-3 flex justify-center border-t pt-3">
              <button
                onClick={handleLogin}
                className="mx-4 mb-3 w-full rounded-full bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
