import { useEffect, useState, useContext } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../api/userApi';
import { useFlashMessage } from '../context/FlashMessageContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaUserShield, 
  FaUserGraduate, 
  FaCrown, 
  FaTrash, 
  FaArrowUp, 
  FaArrowDown, 
  FaEnvelope, 
  FaIdBadge,
  FaUsers,
  FaSearch,
  FaFilter,
  FaSort
} from 'react-icons/fa';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { showSuccess, showError } = useFlashMessage();
  const { user } = useContext(AuthContext);

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      showError('Access denied. Admin privileges required.');
    }
  }, [user, showError]);

  useEffect(() => {
    let result = [...users];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(u => u.role === roleFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name?.localeCompare(b.name);
      if (sortBy === 'role') return a.role?.localeCompare(b.role);
      if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
    
    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter, sortBy]);

  // Don't render if not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  const fetchUsers = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const data = await getUsers(token);
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const changeRole = async (id, role) => {
    if (!window.confirm(`Change role to ${role}?`)) return;
    try {
      const token = localStorage.getItem('token');
      await updateUserRole(id, role, token);
      showSuccess(`User role changed to ${role} successfully!`);
      fetchUsers();
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to change role');
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      await deleteUser(id, token);
      showSuccess('User deleted successfully!');
      fetchUsers();
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading user database...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
        </div>
      </div>
    );
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'from-purple-500 to-pink-500';
      case 'student': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <FaCrown className="h-3.5 w-3.5" />;
      case 'student': return <FaUserGraduate className="h-3.5 w-3.5" />;
      default: return <FaUser className="h-3.5 w-3.5" />;
    }
  };

  const getUserCount = (role) => users.filter(u => u.role === role).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-600 mt-2">Manage user accounts, roles, and permissions across the platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
                <div className="text-2xl font-bold text-gray-800">{users.length}</div>
                <div className="text-sm text-gray-600">Total Users</div>
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
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <FaUserShield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{getUserCount('admin')}</div>
                <div className="text-sm text-gray-600">Administrators</div>
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
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                <FaUserGraduate className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{getUserCount('student')}</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                <FaFilter className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{filteredUsers.length}</div>
                <div className="text-sm text-gray-600">Filtered</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search users by name, email or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </div>

          {/* Role Filter */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrators</option>
              <option value="student">Students</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSort className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl flex items-center space-x-3"
          >
            <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-red-700 font-medium">{error}</span>
          </motion.div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Table Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaIdBadge className="h-5 w-5" />
                <h2 className="text-lg font-semibold">System Users ({filteredUsers.length})</h2>
              </div>
              <div className="text-sm text-gray-300">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    User Profile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto">
                        <FaUser className="h-10 w-10 text-gray-500" />
                      </div>
                      <h3 className="mt-6 text-lg font-semibold text-gray-800">No users found</h3>
                      <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u, index) => (
                    <motion.tr
                      key={u._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      {/* User Profile */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${getRoleColor(u.role)} flex items-center justify-center text-white font-bold shadow-md`}>
                            {u.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{u.name}</div>
                            <div className="text-xs text-gray-500">ID: {u._id?.substring(0, 8)}...</div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <FaEnvelope className="h-3.5 w-3.5 text-gray-400 mr-2 flex-shrink-0" />
                            <span className="truncate max-w-xs">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getRoleColor(u.role)}/10 border border-transparent`}>
                            <div className="flex items-center space-x-1.5">
                              {getRoleIcon(u.role)}
                              <span className="text-sm font-medium capitalize">{u.role}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm text-gray-600">Active</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {u.role !== 'admin' ? (
                            <button
                              onClick={() => changeRole(u._id, 'admin')}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow hover:shadow-lg group min-w-[120px]"
                            >
                              <FaArrowUp className="mr-2 h-3.5 w-3.5 group-hover:translate-y-[-2px] transition-transform" />
                              Promote
                            </button>
                          ) : (
                            <button
                              onClick={() => changeRole(u._id, 'student')}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow hover:shadow-lg group min-w-[120px]"
                            >
                              <FaArrowDown className="mr-2 h-3.5 w-3.5 group-hover:translate-y-[2px] transition-transform" />
                              Demote
                            </button>
                          )}
                          <button
                            onClick={() => removeUser(u._id)}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-rose-600 transition-all duration-200 shadow hover:shadow-lg group"
                          >
                            <FaTrash className="mr-2 h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
              <div>
                Showing {filteredUsers.length} of {users.length} users
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
              <div className="flex items-center space-x-4 mt-2 md:mt-0">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Admin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <FaUserShield className="h-5 w-5 text-blue-600 mr-2" />
            User Management Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                <span>Only promote trusted users to Admin role</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                <span>Admins have full system access and privileges</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5"></div>
                <span>Deleting users is permanent and cannot be undone</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5"></div>
                <span>Exercise caution when performing administrative actions</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsers;