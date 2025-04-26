// src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">CareerAI</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/test-karir" 
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
            >
              Tes Karir
            </Link>
            <Link 
              to="/explore" 
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
            >
              Eksplorasi
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;