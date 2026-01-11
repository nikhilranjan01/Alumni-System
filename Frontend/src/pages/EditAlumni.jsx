import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getAlumnus, updateAlumni } from "../api/alumniApi";
import { useFlashMessage } from "../context/FlashMessageContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaLinkedin, FaBriefcase, FaGraduationCap, FaBuilding, FaIdCard, FaArrowLeft, FaSave } from "react-icons/fa";

const EditAlumni = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showSuccess, showError } = useFlashMessage();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      showError('Access denied. Admin privileges required.');
      navigate('/dashboard');
    }
  }, [user, navigate, showError]);

  // Don't render if not admin
  if (!user || user.role !== 'admin') {
    return null;
  }
  
  const [alumni, setAlumni] = useState({
    name: "",
    rollNumber: "",
    email: "",
    department: "",
    batch: "",
    company: "",
    designation: "",
    phone: "",
    linkedin: "",
  });

  const fetchAlumni = async () => {
    try {
      const data = await getAlumnus(id);
      setAlumni({
        name: data.name || "",
        rollNumber: data.rollNumber || "",
        email: data.email || "",
        department: data.department || "",
        batch: data.batch || "",
        company: data.company || "",
        designation: data.designation || "",
        phone: data.phone || "",
        linkedin: data.linkedin || "",
      });
    } catch (err) {
      console.error("Error fetching alumni:", err);
      showError("Failed to load alumni data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleChange = (e) => {
    setAlumni({ ...alumni, [e.target.name]: e.target.value });
    setError(""); // Clear any previous errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!alumni.name || alumni.name.trim().length === 0) {
      setError("Name is required");
      return;
    }
    if (/^\d+$/.test(alumni.name.trim())) {
      setError("Name must contain letters");
      return;
    }
    if (alumni.rollNumber && !/^[a-zA-Z0-9\-]{1,20}$/.test(alumni.rollNumber)) {
      setError("Roll number must be alphanumeric (max 20 characters, no spaces)");
      return;
    }
    if (alumni.email) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(alumni.email)) {
        setError("Invalid email format");
        return;
      }
    }
    if (alumni.batch && !/^\d{4}$/.test(String(alumni.batch))) {
      setError("Batch must be a 4-digit year (e.g., 2020)");
      return;
    }
    if (alumni.phone && !/^\d{10}$/.test(alumni.phone)) {
      setError("Phone must be exactly 10 digits (numbers only)");
      return;
    }

    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      await updateAlumni(id, alumni, token);
      showSuccess("Alumni profile updated successfully!");
      navigate("/admin/alumni");
    } catch (err) {
      console.error(err);
      showError(err.response?.data?.message || "Failed to update alumni");
    } finally {
      setUpdating(false);
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
          <p className="mt-4 text-gray-600 font-medium">Loading alumni profile...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/admin/alumni"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Alumni Management</span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Edit Alumni Profile
              </h1>
              <p className="text-gray-600 mt-2">Update and modify alumni information</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-sm text-gray-500">Editing ID: {id?.substring(0, 8)}...</div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Update Alumni Information</h2>
                <p className="text-emerald-100 text-sm">Modify the details below to update this alumni profile</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Grid Layout for Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span>Personal Information</span>
                    </h3>
                  </div>
                  
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter full name"
                        name="name"
                        value={alumni.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50/50"
                        required
                      />
                      <div className="absolute right-3 top-3">
                        <FaUser className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="alumni@example.com"
                        name="email"
                        value={alumni.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50/50"
                        required
                      />
                      <div className="absolute right-3 top-3">
                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="10-digit number"
                        name="phone"
                        value={alumni.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50/50"
                      />
                      <div className="absolute right-3 top-3">
                        <FaPhone className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* LinkedIn Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="https://linkedin.com/in/username"
                        name="linkedin"
                        value={alumni.linkedin}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50/50"
                      />
                      <div className="absolute right-3 top-3">
                        <FaLinkedin className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic & Professional Information */}
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>Academic & Professional</span>
                    </h3>
                  </div>

                  {/* Roll Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Roll Number / Student ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g., CS2020-123"
                        name="rollNumber"
                        value={alumni.rollNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                      />
                      <div className="absolute right-3 top-3">
                        <FaIdCard className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Department / Course</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g., Computer Science"
                        name="department"
                        value={alumni.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  {/* Batch */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Year of Graduation <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="YYYY"
                        name="batch"
                        value={alumni.batch}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                        required
                      />
                      <div className="absolute right-3 top-3">
                        <FaGraduationCap className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Current Company</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g., TechCorp Inc."
                        name="company"
                        value={alumni.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                      />
                      <div className="absolute right-3 top-3">
                        <FaBuilding className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Designation */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Job Title / Position</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g., Senior Software Engineer"
                        name="designation"
                        value={alumni.designation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                      />
                      <div className="absolute right-3 top-3">
                        <FaBriefcase className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                >
                  {updating ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Updating Profile...</span>
                    </>
                  ) : (
                    <>
                      <FaSave className="h-5 w-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/alumni")}
                  className="px-6 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>

            {/* Profile Preview */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Preview</h3>
              <div className="bg-gray-50/50 rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                    {alumni.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{alumni.name || 'Not set'}</div>
                    <div className="text-sm text-gray-600">
                      {alumni.designation && alumni.company 
                        ? `${alumni.designation} at ${alumni.company}` 
                        : alumni.designation || alumni.company || 'Profile incomplete'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAlumni;