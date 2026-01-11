import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaUserTie, FaUserGraduate, FaArrowRight, FaCheckCircle, FaUniversity } from "react-icons/fa";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setLoading(true);

    // Frontend: enforce college email domain
    const collegeEmailRegex = /^[^\s@]+@jietjodhpur\.ac\.in$/i;
    if (!collegeEmailRegex.test(email.trim())) {
      setEmailError("Only JIET Jodhpur college email IDs (@jietjodhpur.ac.in) are allowed.");
      setLoading(false);
      return;
    }

    try {
      const success = await register({ name, email, password, role });
      if (success) {
        navigate("/dashboard");
      }
    } catch (err) {
      // Flash messages will handle the error display
    } finally {
      setLoading(false);
    }
  };

  const checkPasswordStrength = (pass) => {
    setPassword(pass);
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return "bg-gray-200";
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0: return "Very Weak";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-8 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4"
            >
              <FaUniversity className="h-8 w-8" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Join AlumniMS</h1>
            <p className="text-purple-100">Create your account to connect with the alumni community</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50/50"
                    required
                    disabled={loading}
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  College Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="username@jietjodhpur.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50/50`}
                    required
                    disabled={loading}
                  />
                </div>
                {emailError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center space-x-2 text-sm text-red-600 bg-red-50/50 p-3 rounded-lg border border-red-200"
                  >
                    <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{emailError}</span>
                  </motion.div>
                )}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <FaCheckCircle className="h-3 w-3 text-green-500" />
                  <span>Must be a valid JIET Jodhpur college email address</span>
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => checkPasswordStrength(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50/50"
                    required
                    disabled={loading}
                  />
                </div>
                
                {/* Password Strength Meter */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Password strength:</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength === 0 ? 'text-gray-500' :
                        passwordStrength === 1 ? 'text-red-500' :
                        passwordStrength === 2 ? 'text-orange-500' :
                        passwordStrength === 3 ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength * 25}%` }}
                        transition={{ duration: 0.3 }}
                        className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Password Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>At least 8 characters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>One uppercase letter</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>One number</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>One special character</span>
                  </div>
                </div>
              </motion.div>

              {/* Role Selection
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Select Your Role <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-3 ${
                      role === "student" 
                        ? 'border-purple-500 bg-purple-50/50 shadow-md' 
                        : 'border-gray-300 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                    disabled={loading}
                  >
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      role === "student" ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FaUserGraduate className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">Student</div>
                      <div className="text-xs text-gray-600">Access alumni directory and events</div>
                    </div>
                    {role === "student" && (
                      <FaCheckCircle className="h-5 w-5 text-purple-600 ml-auto" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-3 ${
                      role === "admin" 
                        ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                        : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                    disabled={loading}
                  >
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      role === "admin" ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FaUserTie className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">Administrator</div>
                      <div className="text-xs text-gray-600">Manage alumni database and users</div>
                    </div>
                    {role === "admin" && (
                      <FaCheckCircle className="h-5 w-5 text-blue-600 ml-auto" />
                    )}
                  </button>
                </div>
              </motion.div> */}

              {/* Terms & Submit */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-6"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center pt-6 border-t border-gray-200"
            >
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors group"
                >
                  <span>Sign in here</span>
                  <FaArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          <FaUniversity className="inline h-3 w-3 mr-1" />
          Exclusive for JIET Jodhpur students and alumni
        </motion.p>
      </div>
    </div>
  );
};

export default Register;