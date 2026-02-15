import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname === "/register") return null;

  const navLink =
    "text-sm font-medium text-slate-300 hover:text-white transition";

  const activeLink =
    "text-white border-b-2 border-sky-400 pb-1";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              to={user ? "/dashboard" : "/"}
              className="text-xl font-extrabold tracking-wide text-sky-400 hover:text-sky-300"
            >
              AlumniMS
            </Link>

            {user && (
              <div className="hidden sm:flex items-center gap-6">
                <Link
                  to="/dashboard"
                  className={`${navLink} ${
                    pathname === "/dashboard" && activeLink
                  }`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/alumni"
                  className={`${navLink} ${
                    pathname === "/alumni" && activeLink
                  }`}
                >
                  Alumni
                </Link>

                {user.role === "admin" && (
                  <>
                    <Link to="/alumni/add" className={navLink}>
                      Add Alumni
                    </Link>
                    <Link to="/admin/alumni" className={navLink}>
                      Manage Alumni
                    </Link>
                    <Link to="/admin/users" className={navLink}>
                      Users
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* HOME BUTTON */}
            <Link
              to="/"
              className={`${navLink} ${pathname === "/" && activeLink}`}
            >
              Home
            </Link>

            {user ? (
              <>
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-semibold text-white">
                    {user.name}
                  </span>
                  <span className="text-xs text-sky-400 uppercase">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="px-4 py-1.5 rounded-full text-sm bg-rose-500 hover:bg-rose-600 text-white shadow transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 rounded-full text-sm bg-sky-500 hover:bg-sky-600 text-white font-medium transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <svg
                className="h-6 w-6 text-white"
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
          <div className="sm:hidden mt-3 rounded-2xl bg-slate-800 shadow-xl p-4 space-y-2">

            {/* HOME MOBILE */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Home
            </Link>

            {user ? (
              <>
                <div className="pb-3 border-b border-slate-700">
                  <div className="font-semibold text-white">{user.name}</div>
                  <div className="text-xs text-sky-400 uppercase">
                    {user.role}
                  </div>
                </div>

                {[
                  { to: "/dashboard", label: "Dashboard" },
                  { to: "/alumni", label: "Alumni List" },
                  ...(user.role === "admin"
                    ? [
                        { to: "/alumni/add", label: "Add Alumni" },
                        { to: "/admin/alumni", label: "Manage Alumni" },
                        { to: "/admin/users", label: "Manage Users" },
                      ]
                    : []),
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600">
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
