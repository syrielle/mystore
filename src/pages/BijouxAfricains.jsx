import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Globe, ShoppingBag } from 'lucide-react';
import ProductCardSimple from '../components/ui/ProductCardSimple';
import { getAllProducts } from '../services/firebase/productService';

const BijouxAfricains = () => {
  const [africanProducts, setAfricanProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les produits africains depuis Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromFirebase = await getAllProducts();
        // Filtrer les produits africains actifs uniquement
        const africans = productsFromFirebase.filter(p =>
          p.category === 'Bijoux Africains' && p.isActive !== false
        );
        setAfricanProducts(africans);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-700 to-orange-600">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          {/* Pattern d'Afrique */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
          }}></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-amber-300" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Bijoux Africains
            </h1>

            <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
              L'Essence de l'Afrique dans Chaque Pièce
            </p>

            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
              Découvrez notre collection exclusive de bijoux africains authentiques,
              où tradition ancestrale et élégance contemporaine se rencontrent.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/catalogue?category=africain"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-all transform hover:scale-105 shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                Voir la Collection
              </Link>
              <a
                href="#histoire"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-amber-900 transition-all"
              >
                Découvrir l'Histoire
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* L'Histoire Section */}
      <section id="histoire" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80"
                  alt="Bijoux Africains"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-amber-600" />
                <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                  Un Héritage Millénaire
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Les bijoux africains sont bien plus que de simples ornements. Depuis des millénaires,
                ils racontent des histoires, symbolisent des statuts, et célèbrent la beauté naturelle
                de l'Afrique et de ses peuples.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Chaque pièce est le fruit d'un savoir-faire ancestral transmis de génération en génération,
                utilisant des techniques traditionnelles préservées au fil du temps. Les motifs géométriques,
                les perles colorées et les métaux nobles se combinent pour créer des œuvres d'art uniques.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Notre collection célèbre cette richesse culturelle tout en l'adaptant aux goûts contemporains,
                permettant à chacun de porter un morceau d'histoire africaine avec fierté et élégance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Pourquoi Choisir Nos Bijoux Africains ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chaque bijou raconte une histoire unique et porte en lui l'âme de l'Afrique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-12 h-12" />,
                title: 'Authenticité Garantie',
                description: 'Chaque pièce est authentique et reflète les véritables traditions artisanales africaines.'
              },
              {
                icon: <Heart className="w-12 h-12" />,
                title: 'Fait Main avec Amour',
                description: 'Créés par des artisans talentueux qui perpétuent un savoir-faire ancestral unique.'
              },
              {
                icon: <Globe className="w-12 h-12" />,
                title: 'Commerce Équitable',
                description: 'Nous soutenons les communautés locales et garantissons une rémunération juste.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-full mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits Section */}
      {africanProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Notre Collection
              </h2>
              <p className="text-lg text-gray-600">
                Explorez nos bijoux africains authentiques
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {africanProducts.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCardSimple product={product} />
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/catalogue?category=africain"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Voir Toute la Collection
                <ShoppingBag className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-900 to-orange-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Portez l'Afrique avec Fierté
            </h2>
            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              Chaque bijou est une célébration de la beauté, de la culture et de l'artisanat africain.
              Trouvez la pièce qui résonne avec votre âme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/catalogue?category=africain"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-all shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                Découvrir Maintenant
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-amber-900 transition-all"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BijouxAfricains;
