import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import ProductCardSimple from '../components/ui/ProductCardSimple';
import { getAllProducts } from '../services/firebase/productService';

const Catalogue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les produits depuis Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromFirebase = await getAllProducts();
        // Filtrer uniquement les produits actifs pour le site public
        const activeProducts = productsFromFirebase.filter(p => p.isActive !== false);
        setProducts(activeProducts);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [
    { id: 'all', name: 'Tous les Bijoux', count: products.length },
    { id: 'Bijoux Africains', name: '✨ Bijoux Africains', count: products.filter(p => p.category === 'Bijoux Africains').length, isSpecial: true },
    { id: 'Colliers', name: 'Colliers', count: products.filter(p => p.category === 'Colliers').length },
    { id: 'Boucles d\'oreilles', name: "Boucles d'Oreilles", count: products.filter(p => p.category === 'Boucles d\'oreilles').length },
    { id: 'Bracelets', name: 'Bracelets', count: products.filter(p => p.category === 'Bracelets').length },
    { id: 'Bagues', name: 'Bagues', count: products.filter(p => p.category === 'Bagues').length },
  ];

  const priceRanges = [
    { id: 'all', name: 'Tous les prix', min: 0, max: Infinity },
    { id: '0-10', name: 'Moins de 10$', min: 0, max: 10 },
    { id: '10-20', name: '10$ - 20$', min: 10, max: 20 },
    { id: '20-30', name: '20$ - 30$', min: 20, max: 30 },
  ];

  // Update selected category when URL param changes
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
    setIsFilterOpen(false);
  };

  // Filtrer par catégorie et par prix
  const filteredProducts = products.filter(product => {
    // Filtre par catégorie
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;

    // Filtre par prix
    const priceRange = priceRanges.find(r => r.id === selectedPriceRange);
    const priceMatch = !priceRange || (product.price >= priceRange.min && product.price <= priceRange.max);

    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Notre Collection
          </h1>
          <p className="text-lg text-gray-300">
            {filteredProducts.length} bijou{filteredProducts.length > 1 ? 'x' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Catégories</h2>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? category.isSpecial
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                            : 'bg-gray-900 text-white'
                          : category.isSpecial
                          ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 hover:from-amber-200 hover:to-orange-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={category.isSpecial ? 'font-bold' : 'font-medium'}>{category.name}</span>
                        <span className={`text-sm ${
                          selectedCategory === category.id ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Filtre par Prix */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Prix</h2>
                <nav className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedPriceRange === range.id
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="font-medium">{range.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg shadow-md p-6 mt-6 text-white">
                <h3 className="text-lg font-bold mb-3">Besoin d'Aide ?</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Notre équipe est disponible pour vous conseiller dans votre choix.
                </p>
                <a
                  href="https://wa.me/15816884483"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-white text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contacter via WhatsApp
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-white py-3 rounded-lg shadow-md font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filtrer par Catégorie
              </button>
            </div>

            {/* Selected Category Badge */}
            {selectedCategory !== 'all' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-3"
              >
                <span className="text-gray-700">Filtre actif :</span>
                <span className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className="hover:bg-gray-700 rounded-full p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              </motion.div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <svg className="animate-spin h-12 w-12 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCardSimple product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun bijou trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de sélectionner une autre catégorie
                </p>
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Voir tous les bijoux
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Filtrer par Catégorie</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? category.isSpecial
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                            : 'bg-gray-900 text-white'
                          : category.isSpecial
                          ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 hover:from-amber-200 hover:to-orange-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={category.isSpecial ? 'font-bold' : 'font-medium'}>{category.name}</span>
                        <span className={`text-sm ${
                          selectedCategory === category.id ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalogue;
