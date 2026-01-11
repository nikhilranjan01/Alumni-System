const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 mt-12 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
        
        {/* Brand */}
        <h2 className="text-lg font-semibold text-sky-400 tracking-wide">
          AlumniMS
        </h2>

        {/* Tagline */}
        <p className="text-sm text-slate-400">
          Connecting Alumni • Building Futures • Growing Together
        </p>

        {/* Divider */}
        <div className="w-24 h-0.5 bg-sky-500 mx-auto rounded-full"></div>

        {/* Copyright */}
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} AlumniMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
