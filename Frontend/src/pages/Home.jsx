import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-tr from-slate-50 via-blue-50 to-purple-50 flex flex-col overflow-hidden">

      {/* HERO */}
      <header className="relative py-20">
        {/* Background Blurs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold bg-linear-to-tr from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Welcome to AlumniMS
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Connect, network, and grow with your alumni community.  
            Build relationships that shape your future.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="px-8 py-3 rounded-xl font-semibold text-white bg-linear-to-tr from-purple-600 to-blue-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 rounded-xl font-semibold border border-gray-300 bg-white/80 backdrop-blur hover:bg-white shadow hover:shadow-lg transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className="flex-1 max-w-7xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group">
          <h2 className="font-bold text-2xl mb-3 group-hover:text-purple-600 transition">
            Connect
          </h2>
          <p className="text-gray-600">
            Discover alumni from your batch, department, or company and stay in touch effortlessly.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group">
          <h2 className="font-bold text-2xl mb-3 group-hover:text-blue-600 transition">
            Network
          </h2>
          <p className="text-gray-600">
            Share opportunities, collaborate on projects, and build strong professional connections.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group">
          <h2 className="font-bold text-2xl mb-3 group-hover:text-indigo-600 transition">
            Grow
          </h2>
          <p className="text-gray-600">
            Participate in alumni events, mentorship programs, and unlock career growth.
          </p>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <footer className="text-center pb-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} AlumniMS — Building Stronger Connections
      </footer>
    </div>
  );
};

export default Home;
