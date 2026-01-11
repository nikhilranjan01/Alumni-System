import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Header */}
      <header className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 shadow-2xl overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Alumni Dashboard
            </h1>
            <p className="text-gray-300 mt-2">Manage and connect with alumni community</p>
          </div>

          <div className="flex items-center space-x-4 bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-700/50 shadow-lg">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">
                {user ? `Welcome back,` : "Welcome"}
              </div>
              <div className="font-bold text-white text-lg">{user?.name || "Guest"}</div>
              <div className="text-xs mt-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full inline-block font-medium shadow-md">
                {user?.role ? user.role.toUpperCase() : "USER"}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 -mt-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* View Alumni Card */}
          <Link
            to="/alumni"
            className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-2xl"></div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                Browse Alumni
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Explore and connect with alumni network. View profiles, career paths, and achievements.
              </p>
              <div className="text-blue-500 font-medium text-sm flex items-center space-x-1">
                <span>Explore Network</span>
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Add Alumni Card */}
          {user && user.role === "admin" && (
            <Link
              to="/alumni/add"
              className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-t-2xl"></div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
                  Add Alumni
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Register new alumni with detailed profiles. Add educational background, career info, and contact details.
                </p>
                <div className="text-green-500 font-medium text-sm flex items-center space-x-1">
                  <span>Add New</span>
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            </Link>
          )}

          {/* Admin Panel Card */}
          {user && user.role === "admin" && (
            <Link
              to="/admin/alumni"
              className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-violet-400 rounded-t-2xl"></div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-100 to-violet-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">
                  Admin Panel
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Manage alumni database, user permissions, and system configurations from centralized admin interface.
                </p>
                <div className="text-purple-500 font-medium text-sm flex items-center space-x-1">
                  <span>Manage System</span>
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          )}

        </div>

        {/* Welcome Message */}
        <div className="mt-12 bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Welcome to Alumni Management System</h2>
          <p className="text-gray-300 mb-6">
            Connect with your alumni community, manage profiles, and foster professional relationships 
            through our comprehensive platform designed for institutions and alumni networks.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-400"></div>
              <span className="text-sm">Secure alumni database</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <span className="text-sm">Role-based access control</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-purple-400"></div>
              <span className="text-sm">Professional networking</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;