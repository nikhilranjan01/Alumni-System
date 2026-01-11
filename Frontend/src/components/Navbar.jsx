import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide navbar on login/register pages
  const isAuthPage =
    window.location.pathname === "/login" ||
    window.location.pathname === "/register";
  if (isAuthPage) return null;

  return (
    <nav className="bg-slate-900 text-slate-100 shadow-lg sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="font-bold text-xl tracking-wide text-sky-400 hover:text-sky-300 transition"
            >
              AlumniMS
            </Link>

            {user && (
              <>
                <Link
                  to="/alumni"
                  className="hidden sm:inline-block text-sm font-medium text-slate-300 hover:text-white transition"
                >
                  Alumni List
                </Link>

                <Link
                  to="/dashboard"
                  className="hidden sm:inline-block text-sm font-medium text-slate-300 hover:text-white transition"
                >
                  Dashboard
                </Link>

                {user.role === "admin" && (
                  <>
                    <Link
                      to="/alumni/add"
                      className="hidden sm:inline-block text-sm font-medium text-slate-300 hover:text-white transition"
                    >
                      Add Alumni
                    </Link>

                    <Link
                      to="/admin/alumni"
                      className="hidden sm:inline-block text-sm font-medium text-slate-300 hover:text-white transition"
                    >
                      Manage Alumni
                    </Link>

                    <Link
                      to="/admin/users"
                      className="hidden sm:inline-block text-sm font-medium text-slate-300 hover:text-white transition"
                    >
                      Manage Users
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <span className="hidden sm:inline-block text-sm font-medium text-slate-300">
                  {user.name}
                </span>

                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-sky-500 text-white rounded-full">
                  {user.role ? user.role.toUpperCase() : "USER"}
                </span>

                <button
                  onClick={logout}
                  className="bg-rose-500 hover:bg-rose-600 px-4 py-1.5 text-sm rounded-full transition shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1.5 text-sm rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-1.5 text-sm rounded-full bg-sky-500 text-white font-medium hover:bg-sky-600 transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-slate-800 transition"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden mt-3 bg-slate-800 rounded-xl shadow-lg p-4 space-y-2">
            {user ? (
              <>
                <div className="px-3 py-2 border-b border-slate-600">
                  <div className="font-semibold text-white">{user.name}</div>
                  <div className="text-xs text-slate-400">
                    {user.role ? user.role.toUpperCase() : "USER"}
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
                >
                  Dashboard
                </Link>

                <Link
                  to="/alumni"
                  className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
                >
                  Alumni List
                </Link>

                {user.role === "admin" && (
                  <>
                    <Link
                      to="/alumni/add"
                      className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      Add Alumni
                    </Link>

                    <Link
                      to="/admin/alumni"
                      className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      Manage Alumni
                    </Link>

                    <Link
                      to="/admin/users"
                      className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      Manage Users
                    </Link>
                  </>
                )}

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block px-4 py-2 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
