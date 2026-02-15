import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const FlashMessage = ({ message, type = 'success', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-white text-xl" />;
      case 'error':
        return <FaExclamationTriangle className="text-white text-xl" />;
      case 'warning':
        return <FaExclamationTriangle className="text-white text-xl" />;
      case 'info':
        return <FaInfoCircle className="text-white text-xl" />;
      default:
        return <FaInfoCircle className="text-white text-xl" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'success':
        return 'from-green-500 to-emerald-500';
      case 'error':
        return 'from-red-500 to-rose-500';
      case 'warning':
        return 'from-amber-500 to-orange-500';
      case 'info':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-emerald-400/30';
      case 'error':
        return 'border-rose-400/30';
      case 'warning':
        return 'border-amber-400/30';
      case 'info':
        return 'border-cyan-400/30';
      default:
        return 'border-cyan-400/30';
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-600';
      case 'error':
        return 'bg-rose-600';
      case 'warning':
        return 'bg-amber-600';
      case 'info':
        return 'bg-cyan-600';
      default:
        return 'bg-cyan-600';
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-400';
      case 'error':
        return 'bg-rose-400';
      case 'warning':
        return 'bg-amber-400';
      case 'info':
        return 'bg-cyan-400';
      default:
        return 'bg-cyan-400';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ 
          duration: 0.25, 
          ease: [0.4, 0, 0.2, 1],
          scale: { type: "spring", damping: 15 }
        }}
        className="fixed top-6 right-6 z-50 max-w-sm w-full"
      >
        <div className={`relative overflow-hidden rounded-xl shadow-2xl border ${getBorderColor()} backdrop-blur-sm bg-white/95`}>
          {/* Progress Bar */}
          {duration > 0 && onClose && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`absolute top-0 left-0 right-0 h-1 ${getProgressColor()} origin-left`}
            />
          )}
          
          <div className="p-5 flex items-start space-x-4">
            {/* Icon Container */}
            <div className={`shrink-0 h-12 w-12 rounded-xl ${getIconBg()} flex items-center justify-center shadow-lg`}>
              {getIcon()}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 capitalize mb-1">
                {type === 'error' ? 'Error' : 
                 type === 'warning' ? 'Warning' : 
                 type === 'info' ? 'Information' : 'Success'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {message}
              </p>
            </div>

            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="shrink-0 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 ml-2 group"
                aria-label="Close message"
              >
                <FaTimes className="text-sm group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>

          {/* Decorative Gradient */}
          <div className={`absolute -top-10 -right-10 h-20 w-20 rounded-full bg-linear-to-br ${getGradient()} opacity-10 blur-xl`}></div>
        </div>

        {/* Drop Shadow Effect */}
        <div className={`absolute inset-0 -z-10 rounded-xl bg-linear-to-br ${getGradient()} opacity-20 blur-lg`}></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlashMessage;