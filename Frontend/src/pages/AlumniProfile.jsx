import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlumnus } from '../api/alumniApi';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaBriefcase, FaGraduationCap, FaUser, FaBuilding, FaMapMarkerAlt, FaIdCard, FaCalendarAlt } from 'react-icons/fa';

const Hero = ({ al }) => (
  <div className="relative w-full bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 py-16 overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
    </div>
    
    <div className="relative max-w-6xl mx-auto px-4 text-center text-white">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center -mt-24 mb-6"
      >
        <div className="relative">
          <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 flex items-center justify-center">
            {al.photoUrl ? (
              <img src={al.photoUrl} alt={al.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-6xl font-bold text-white">
                {(al.name||'A').split(' ').map(n=>n[0]).slice(0,2).join('')}
              </div>
            )}
          </div>
          {/* Decorative rings */}
          <div className="absolute -inset-4 rounded-full border-2 border-blue-400/30 animate-ping"></div>
          <div className="absolute -inset-6 rounded-full border border-cyan-400/20"></div>
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
      >
        {al.name}
      </motion.h1>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex flex-wrap justify-center gap-3"
      >
        {al.designation && (
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center space-x-2">
            <FaUser className="h-3.5 w-3.5" />
            <span className="font-medium">{al.designation}</span>
          </div>
        )}
        {al.company && (
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center space-x-2">
            <FaBuilding className="h-3.5 w-3.5" />
            <span className="font-medium">{al.company}</span>
          </div>
        )}
        {al.batch && (
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center space-x-2">
            <FaGraduationCap className="h-3.5 w-3.5" />
            <span className="font-medium">Batch {al.batch}</span>
          </div>
        )}
      </motion.div>
    </div>
  </div>
);

const GlassCard = ({ title, icon: Icon, children, gradient = "from-blue-500/10 to-cyan-500/10" }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300`}
  >
    <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-200/50">
      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {Icon && <Icon className="h-5 w-5 text-blue-600" />}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const AlumniProfile = () => {
  const { id } = useParams();
  const [al, setAl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAlumnus(id);
        setAl(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!al) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 pb-16">
      <Hero al={al} />

      <main className="max-w-6xl mx-auto -mt-12 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Professional Details */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard 
            title="Professional Overview" 
            icon={FaBriefcase}
            gradient="from-blue-500/10 to-cyan-500/10"
          >
            <div className="space-y-4">
              {al.company && (
                <div className="flex items-start space-x-3 p-3 bg-blue-50/50 rounded-xl">
                  <FaBuilding className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Current Company</div>
                    <div className="text-lg text-gray-800 font-semibold">{al.company}</div>
                  </div>
                </div>
              )}
              
              {al.designation && (
                <div className="flex items-start space-x-3 p-3 bg-blue-50/50 rounded-xl">
                  <FaUser className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Position</div>
                    <div className="text-lg text-gray-800 font-semibold">{al.designation}</div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {al.rollNumber && (
                  <div className="p-3 bg-gray-50/70 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Student ID</div>
                    <div className="text-gray-800 font-medium flex items-center space-x-2">
                      <FaIdCard className="h-4 w-4 text-gray-500" />
                      <span>{al.rollNumber}</span>
                    </div>
                  </div>
                )}
                
                {al.batch && (
                  <div className="p-3 bg-gray-50/70 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Graduation Year</div>
                    <div className="text-gray-800 font-medium flex items-center space-x-2">
                      <FaCalendarAlt className="h-4 w-4 text-gray-500" />
                      <span>{al.batch}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>

          {/* Additional Info Card */}
          <GlassCard 
            title="Academic Background" 
            icon={FaGraduationCap}
            gradient="from-purple-500/10 to-pink-500/10"
          >
            <div className="space-y-3">
              {al.department && (
                <div className="p-3 bg-purple-50/50 rounded-xl">
                  <div className="text-sm text-gray-600 font-medium">Department / Course</div>
                  <div className="text-gray-800 font-semibold">{al.department}</div>
                </div>
              )}
              
              <div className="text-sm text-gray-600 leading-relaxed">
                {al.department && al.batch ? (
                  `Completed ${al.department} program in ${al.batch}. `
                ) : ''}
                Alumni profiles showcase career progression and professional achievements post-graduation.
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column - Contact & Quick Info */}
        <div className="space-y-6">
          <GlassCard 
            title="Contact Information" 
            icon={FaEnvelope}
            gradient="from-emerald-500/10 to-green-500/10"
          >
            <div className="space-y-4">
              {al.email && (
                <a 
                  href={`mailto:${al.email}`}
                  className="flex items-center space-x-3 p-3 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaEnvelope className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="text-gray-800 font-medium truncate">{al.email}</div>
                  </div>
                </a>
              )}
              
              {al.phone && (
                <a 
                  href={`tel:${al.phone}`}
                  className="flex items-center space-x-3 p-3 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPhone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="text-gray-800 font-medium">{al.phone}</div>
                  </div>
                </a>
              )}
              
              {al.linkedin && (
                <a 
                  href={al.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaLinkedin className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">LinkedIn</div>
                    <div className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      Connect on LinkedIn
                    </div>
                  </div>
                  <svg className="h-4 w-4 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </GlassCard>

          <GlassCard 
            title="Quick Information" 
            icon={FaIdCard}
            gradient="from-amber-500/10 to-orange-500/10"
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-amber-50/50 rounded-lg">
                  <div className="text-xs text-gray-500">Alumni Since</div>
                  <div className="font-semibold text-gray-800">{al.batch || 'N/A'}</div>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-lg">
                  <div className="text-xs text-gray-500">Profile Status</div>
                  <div className="font-semibold text-gray-800">Active</div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-200/50">
                <div className="text-xs text-gray-500 mb-2">Last Updated</div>
                <div className="text-sm text-gray-700">Recently verified</div>
              </div>
            </div>
          </GlassCard>

          {/* Connect Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
          >
            <svg className="h-5 w-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Send Message</span>
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default AlumniProfile;