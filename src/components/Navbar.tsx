import { LogOut, Menu, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Tên App */}
        <a href="#" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="text-2xl font-semibold text-gray-900">WebApp</span>
        </a>

        {/* Ở Mobile: Button Menu, Ở Desktop: Các Links */}
        <div className="flex-1 flex justify-center md:justify-center">
          {/* Ở Mobile: Hiển thị nút Menu */}
          <button
            className="md:hidden text-gray-900 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Ở Desktop: Hiển thị các menu */}
          <div
            className={`absolute top-16 left-0 w-full md:static md:w-auto md:flex transition-all duration-300 ease-in-out ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul className="bg-white md:bg-transparent shadow-lg md:shadow-none border border-gray-200 md:border-0 rounded-lg md:rounded-none flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 w-full md:w-auto">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-gray-900 font-medium rounded-md relative group"
                >
                  Home
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-gray-900 font-medium rounded-md relative group"
                >
                  Services
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative flex items-center">
          {/* Avatar */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="/avatar.png"
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
          </button>

          {/* Ở desktop: Hiển thị luôn Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="hidden md:flex items-center gap-1 py-2 px-4 text-gray-900 font-medium relative group cursor-pointer"
          >
            <LogOut size={20} className="text-gray-700" />
            <span>Logout</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
          </button>

          {/* Ở mobile: Hiện Logout trong dropdown khi click vào avatar */}
          {showDropdown && (
            <div className="absolute right-0 mt-18 w-40 bg-white border border-gray-200 rounded-md shadow-lg md:hidden">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 py-2 px-4 text-gray-900 font-medium relative group w-full text-left cursor-pointer"
              >
                <LogOut size={20} className="text-gray-700" />
                <span>Logout</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
