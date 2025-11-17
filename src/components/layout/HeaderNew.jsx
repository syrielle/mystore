import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const HeaderNew = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const navLinks = [
    { name: 'ACCUEIL', path: '/' },
    {
      name: 'BOUTIQUE',
      path: '/catalogue',
      hasDropdown: true,
      subItems: [
        { name: 'Tous les bijoux', path: '/catalogue' },
        { name: 'Colliers', path: '/catalogue?category=colliers' },
        { name: 'Boucles d\'oreilles', path: '/catalogue?category=boucles' },
        { name: 'Bracelets', path: '/catalogue?category=bracelets' },
        { name: 'Bagues', path: '/catalogue?category=bagues' },
        { name: '─────────', path: '#', disabled: true },
        { name: '✨ Bijoux Africains', path: '/catalogue?category=africain', special: true },
      ]
    },
    { name: 'BIJOUX AFRICAINS', path: '/bijoux-africains', isSpecial: true },
  ];

  const rightNavLinks = [
    { name: 'À PROPOS', path: '/a-propos' },
    { name: 'BLOG', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="bg-[#f5f3f0] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Navigation Gauche - Desktop */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`text-sm font-medium tracking-wider transition-colors flex items-center gap-1 ${
                    link.isSpecial
                      ? 'text-amber-700 hover:text-amber-900 font-bold'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  onMouseEnter={() => link.hasDropdown && setIsShopOpen(true)}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                {link.hasDropdown && isShopOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2"
                    onMouseEnter={() => setIsShopOpen(true)}
                    onMouseLeave={() => setIsShopOpen(false)}
                  >
                    {link.subItems.map((subItem, index) => (
                      subItem.disabled ? (
                        <div key={index} className="px-4 py-1 text-xs text-gray-300 pointer-events-none">
                          {subItem.name}
                        </div>
                      ) : (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            subItem.special
                              ? 'text-amber-700 font-semibold hover:bg-amber-50'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Logo Central */}
          <Link to="/" className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-900 tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
              Miss Bijoux
            </h1>
            <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase mt-1">
              Bijouterie Fine
            </p>
          </Link>

          {/* Navigation Droite - Desktop */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            {rightNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wider transition-colors ${
                  link.isSpecial
                    ? 'text-amber-700 hover:text-amber-900 font-bold'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-4 ml-8">
            <button
              onClick={() => navigate('/panier')}
              className="relative p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => navigate('/panier')}
              className="relative p-2"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-1">
                {[...navLinks, ...rightNavLinks].map((link) => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors tracking-wider"
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && link.subItems && (
                      <div className="pl-8">
                        {link.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default HeaderNew;
