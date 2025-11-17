import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-full">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Miss Bijoux
              </h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Découvrez notre collection exclusive de bijoux élégants et raffinés.
              Chaque pièce est sélectionnée avec soin pour sublimer votre style.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-yellow-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-yellow-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="hover:text-yellow-400 transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="hover:text-yellow-400 transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">contact@missbijoux.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Miss Bijoux. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Conçu avec passion pour sublimer votre élégance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
