import { motion } from 'framer-motion';
import ProductCardSimple from './ProductCardSimple';

const FeaturedProducts = ({ products }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-light text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Notre Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chaque pièce est soigneusement sélectionnée pour garantir qualité et élégance.
            Trouvez le bijou parfait qui vous ressemble.
          </p>
        </motion.div>

        {/* Grille de produits */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
