import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const FooterNew = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo central */}
        <div className="text-center mb-16">
          <h2
            className="text-6xl md:text-7xl font-bold mb-4 tracking-wider"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Miss Bijoux
          </h2>
          <p className="text-sm tracking-[0.3em] uppercase text-gray-400">
            Bijouterie Fine
          </p>
        </div>

        {/* Contenu en 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Liens rapides */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 text-gray-300">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogue"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Boutique
                </Link>
              </li>
              <li>
                <Link
                  to="/a-propos"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 text-gray-300">
              Informations Légales
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/mentions-legales"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link
                  to="/politique-confidentialite"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/cgv"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Conditions Générales de Vente
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 text-gray-300">
              À Propos
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Miss Bijoux propose des bijoux élégants et raffinés.
              Chaque pièce est sélectionnée avec soin pour sublimer
              votre élégance naturelle.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (581) 688-4483</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@missbijoux.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-12 mb-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">
              Inscrivez-vous à Notre Newsletter
            </h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded text-sm focus:outline-none focus:border-gray-600 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black font-medium text-sm rounded hover:bg-gray-200 transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Réseaux sociaux et copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-xs">
              © {currentYear} Miss Bijoux. Tous droits réservés.
            </p>

            {/* Contact */}
            <div className="flex gap-4">
              <a
                href="mailto:contact@missbijoux.com"
                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                title="Contactez-nous par email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
