import {
  LayoutDashboard,
  Files,
  Share2,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass =
    ({ isActive }) =>
      `
      flex
      items-center
      gap-3

      px-4
      py-3

      rounded-xl

      transition-all

      ${
        isActive
          ? "bg-violet-500/15 text-violet-400"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }
    `;

  return (
    <aside
      className="
        w-72

        bg-[#171923]

        border-r
        border-[#262a35]

        flex
        flex-col
      "
    >
      {/* Logo */}

      <div className="p-6">
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              w-11
              h-11

              rounded-xl

              bg-violet-600

              flex
              items-center
              justify-center

              text-white
              font-bold
              text-lg

              shadow-lg
              shadow-violet-600/20
            "
          >
            B
          </div>

          <div>
            <h1
              className="
                logo-font

                text-2xl
                font-bold
              "
            >
              <span className="text-white">
                Bit
              </span>

              <span className="text-violet-500">
                Share
              </span>
            </h1>

            <p
              className="
                text-xs
                text-slate-500
                mt-1
              "
            >
              Secure File Sharing
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <div
        className="
          flex-1
          px-4
          py-4

          space-y-2
        "
      >
        <NavLink
          to="/dashboard"
          className={navClass}
        >
          <LayoutDashboard
            size={20}
          />
          Dashboard
        </NavLink>

        <NavLink
          to="/files"
          className={navClass}
        >
          <Files size={20} />
          Files
        </NavLink>

        <NavLink
          to="/shares"
          className={navClass}
        >
          <Share2 size={20} />
          Links
        </NavLink>
      </div>

      {/* User Section */}

      <div
        className="
          border-t
          border-[#262a35]

          p-4
        "
      >
        <div className="mb-4">
          <p
            className="
              font-medium
              text-white
            "
          >
            {user?.username}
          </p>

          <p
            className="
              text-sm
              text-slate-400
            "
          >
            {user?.email}
          </p>
        </div>

        <button
          onClick={
            handleLogout
          }
          className="
            w-full

            rounded-xl

            border
            border-red-500/20

            bg-red-500/10

            py-3

            text-red-400

            transition

            hover:bg-red-500/20
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;