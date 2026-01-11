import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAlumni, deleteAlumni } from '../api/alumniApi';
import { useFlashMessage } from '../context/FlashMessageContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaEye, FaUser, FaSearch, FaBriefcase, FaGraduationCap, FaUsers } from 'react-icons/fa';

const AdminAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useFlashMessage();
  const { user } = useContext(AuthContext);

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      showError('Access denied. Admin privileges required.');
    }
  }, [user, showError]);

  // Don't render if not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  const fetchAlumni = async () => {
    try {
      const data = await getAlumni();
      setAlumni(data.items || []);
    } catch (err) {
      console.error('Error fetching alumni:', err);
      showError('Failed to load alumni data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}'s profile?`)) return;

    try {
      const token = localStorage.getItem('token');
      await deleteAlumni(id, token);
      showSuccess('Alumni profile deleted successfully!');
      fetchAlumni(); // Refresh the list
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete alumni profile');
    }
  };

  const filteredAlumni = alumni.filter(al =>
    al.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    al.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    al.batch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    al.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading alumni database...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Alumni Management
              </h1>
              <p className="mt-2 text-gray-300 max-w-2xl">
                Admin dashboard to manage alumni profiles, update information, and maintain the alumni database.
              </p>
            </div>
            <Link
              to="/alumni/add"
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <FaPlus className="mr-3" />
              <span>Add New Alumni</span>
              <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <FaUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{alumni.length}</div>
                <div className="text-sm text-gray-600">Total Alumni</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                <FaBriefcase className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {alumni.filter(al => al.company).length}
                </div>
                <div className="text-sm text-gray-600">Employed Alumni</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <FaGraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {new Set(alumni.map(al => al.batch)).size}
                </div>
                <div className="text-sm text-gray-600">Active Batches</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search alumni by name, email, batch, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Alumni Grid */}
        {filteredAlumni.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto">
              <FaUser className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">No alumni found</h3>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms to find what you\'re looking for.' 
                : 'Get started by adding your first alumni profile to the system.'}
            </p>
            {!searchTerm && (
              <div className="mt-8">
                <Link
                  to="/alumni/add"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaPlus className="mr-3" />
                  Add First Alumni
                </Link>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAlumni.map((al, index) => (
              <motion.div
                key={al._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                      {al.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                        {al.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">Batch {al.batch}</span>
                        {al.company && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500 truncate">{al.company}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 pb-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">{al.email}</span>
                    </div>
                    
                    {al.designation && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{al.designation}</span>
                      </div>
                    )}

                    {al.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{al.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-2">
                    <Link
                      to={`/alumni/${al._id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 group/btn"
                    >
                      <FaEye className="mr-2 text-gray-600" />
                      <span className="font-medium">View</span>
                    </Link>
                    <Link
                      to={`/alumni/edit/${al._id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 group/btn"
                    >
                      <FaEdit className="mr-2" />
                      <span className="font-medium">Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(al._id, al.name)}
                      className="inline-flex items-center justify-center px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 group/btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Showing {filteredAlumni.length} of {alumni.length} alumni records
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAlumni;