import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaUser } from 'react-icons/fa';

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0 },
  hover: { y: -6, boxShadow: '0px 12px 30px rgba(14,165,233,0.25)' },
};

const AlumniCard = ({ al }) => {
  const initials = (al.name || 'A')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  return (
    <motion.article
      layout
      initial="hidden"
      animate="enter"
      whileHover="hover"
      variants={cardVariants}
      className="bg-slate-50 rounded-2xl shadow-md overflow-hidden transition duration-300 border border-slate-200 hover:shadow-xl"
    >
      <div className="flex flex-col items-center p-6">

        {/* Avatar */}
        <div className="w-28 h-28 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-full flex items-center justify-center text-3xl text-white font-bold ring-4 ring-white shadow">
          {al.photoUrl ? (
            <img
              src={al.photoUrl}
              alt={al.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            initials
          )}
        </div>

        {/* Name */}
        <h3 className="mt-4 text-lg font-semibold text-slate-800 text-center">
          {al.name}
        </h3>

        {/* Roll */}
        <div className="mt-1 text-sm text-slate-500 text-center">
          {al.rollNumber || '-'}
        </div>

        {/* Info */}
        <div className="mt-4 w-full text-sm text-slate-600 space-y-2">
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-sky-500" />
            <span>{al.department || '-'}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaBriefcase className="text-indigo-500" />
            <span>{al.company || '-'}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaUser className="text-emerald-500" />
            <span>{al.designation || '-'}</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-5 w-full flex justify-center">
          <Link
            to={`/alumni/${al._id}`}
            className="inline-flex items-center justify-center px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-sm hover:shadow-md transition font-medium"
          >
            View Profile
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default AlumniCard;
