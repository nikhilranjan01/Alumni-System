import { useEffect, useState, useContext, useMemo } from "react";
import { getAlumni } from "../api/alumniApi";
import AlumniCard from "../components/AlumniCard";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaCalendarAlt, FaGraduationCap, FaUsers, FaBuilding, FaUserTie } from 'react-icons/fa';

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const [query, setQuery] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const data = await getAlumni();
      setAlumni(data.items || data || []);
    } catch (err) {
      console.error(err);
      setAlumni([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAlumni(); }, []);

  const branches = useMemo(() => {
    const s = new Set();
    alumni.forEach(a => a.department && s.add(a.department));
    return Array.from(s).sort();
  }, [alumni]);

  const years = useMemo(() => {
    const s = new Set();
    alumni.forEach(a => a.batch && s.add(a.batch));
    return Array.from(s).sort((a,b) => b - a);
  }, [alumni]);

  const filtered = useMemo(() => {
    return alumni.filter(a => {
      if (query) {
        const q = query.toLowerCase();
        const inText = (a.name || '').toLowerCase().includes(q) || 
                      (a.company || '').toLowerCase().includes(q) || 
                      (a.department || '').toLowerCase().includes(q) ||
                      (a.designation || '').toLowerCase().includes(q);
        if (!inText) return false;
      }
      if (branch && a.department !== branch) return false;
      if (year && String(a.batch) !== String(year)) return false;
      return true;
    });
  }, [alumni, query, branch, year]);

  // Reset filters
  const resetFilters = () => {
    setQuery('');
    setBranch('');
    setYear('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Alumni Directory
              </h1>
              <p className="text-gray-600 mt-2">Connect with your alumni community</p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200/50 shadow-lg">
                <div className="text-2xl font-bold text-gray-800">{alumni.length}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <FaUsers className="h-3 w-3" />
                  <span>Total Alumni</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200/50 shadow-lg">
                <div className="text-2xl font-bold text-gray-800">{branches.length}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <FaGraduationCap className="h-3 w-3" />
                  <span>Departments</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200/50 shadow-lg">
                <div className="text-2xl font-bold text-gray-800">{years.length}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <FaCalendarAlt className="h-3 w-3" />
                  <span>Batches</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <FaFilter className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Filter Alumni</h2>
              </div>
              
              {(query || branch || year) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors"
                >
                  <span>Clear all filters</span>
                  <span className="text-blue-500">×</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by name, company, department, or position..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                />
              </div>

              {/* Branch Filter */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGraduationCap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={branch}
                  onChange={e => setBranch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 appearance-none cursor-pointer"
                >
                  <option value="">All Departments</option>
                  {branches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 appearance-none cursor-pointer"
                >
                  <option value="">All Graduation Years</option>
                  {years.map(y => (
                    <option key={y} value={y}>Batch {y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            <AnimatePresence>
              {(query || branch || year) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="flex flex-wrap gap-2">
                    {query && (
                      <div className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                        Search: "{query}"
                        <button onClick={() => setQuery('')} className="ml-2 hover:text-blue-900">×</button>
                      </div>
                    )}
                    {branch && (
                      <div className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
                        Department: {branch}
                        <button onClick={() => setBranch('')} className="ml-2 hover:text-purple-900">×</button>
                      </div>
                    )}
                    {year && (
                      <div className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm">
                        Batch: {year}
                        <button onClick={() => setYear('')} className="ml-2 hover:text-green-900">×</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-gray-700">
            <span className="font-semibold">{filtered.length}</span> of <span className="font-semibold">{alumni.length}</span> alumni found
          </div>
          <div className="text-sm text-gray-600">
            {filtered.length === alumni.length ? 'Showing all alumni' : 'Filtered results'}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <div className="relative inline-block">
              <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading alumni directory...</p>
            <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
          </div>
        ) : (
          <>
            {/* No Results State */}
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200"
              >
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto">
                  <FaUsers className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">No alumni found</h3>
                <p className="text-gray-600 mt-2 max-w-md mx-auto">
                  {query || branch || year 
                    ? 'Try adjusting your filters to find what you\'re looking for.' 
                    : 'No alumni have been added to the system yet.'}
                </p>
                {(query || branch || year) && (
                  <button
                    onClick={resetFilters}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Clear All Filters
                  </button>
                )}
              </motion.div>
            ) : (
              <>
                {/* Alumni Grid */}
                <AnimatePresence>
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filtered.map((al, index) => (
                      <motion.div
                        key={al._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <AlumniCard al={al} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Results Summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600"
                >
                  <p>
                    Showing {filtered.length} alumni
                    {query && ` matching "${query}"`}
                    {branch && ` from ${branch}`}
                    {year && ` graduated in ${year}`}
                  </p>
                </motion.div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AlumniList;