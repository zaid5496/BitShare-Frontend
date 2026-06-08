import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Files,
  Share2,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-white/80
        backdrop-blur-md
        border-b
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          justify-between
          items-center
        "
      >
        <Link
          to="/dashboard"
          className="
            text-2xl
            font-black
            text-blue-600
          "
        >
          BitShare
        </Link>

        <div
          className="
            flex
            items-center
            gap-6
          "
        >
          <Link
            to="/dashboard"
            className="
              flex
              items-center
              gap-2
            "
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/files"
            className="
              flex
              items-center
              gap-2
            "
          >
            <Files size={18} />
            Files
          </Link>

          <Link
            to="/shares"
            className="
              flex
              items-center
              gap-2
            "
          >
            <Share2 size={18} />
            Shares
          </Link>

          <span
            className="
              text-sm
              text-slate-500
            "
          >
            {user?.username}
          </span>

          <button
            onClick={
              handleLogout
            }
            className="
              flex
              items-center
              gap-2
              bg-red-500
              text-white
              px-4
              py-2
              rounded-xl
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;