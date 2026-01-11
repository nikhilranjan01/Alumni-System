import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addAlumni } from "../api/alumniApi";
import { useFlashMessage } from "../context/FlashMessageContext";
import { AuthContext } from "../context/AuthContext";

const AddAlumni = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useFlashMessage();
  const { user } = useContext(AuthContext);

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAlumni({ ...alumni, [e.target.name]: e.target.value });
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
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await addAlumni(alumni, token);
      console.log("Alumni added successfully:", response);
      showSuccess("Alumni profile added successfully!");
      // Reset form
      setAlumni({ name: "", email: "", batch: "" });
      // Redirect to alumni list
      setTimeout(() => navigate("/alumni"), 500);
    } catch (err) {
      console.error("Error adding alumni:", err);
      const msg = err.response?.data?.message || "Failed to add alumni";
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Add New Alumni
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Register alumni members with comprehensive profiles including academic background, career information, and contact details.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Alumni Registration Form</h2>
                <p className="text-emerald-100 text-sm">Fill in the details below to add a new alumni</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
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
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
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
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
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
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
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
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Adding Alumni...</span>
                    </>
                  ) : (
                    <>
                      <span>Add Alumni Profile</span>
                      <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Back Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <Link 
                to="/alumni" 
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <svg className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Alumni Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAlumni;