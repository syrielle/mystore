import { motion } from 'framer-motion';
import ProductCardSimple from './ProductCardSimple';

const BestSellers = ({ products }) => {
  return (
    <section className="py-16 bg-[#f5f3f0] w-full">
      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-4"
      >
        <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">
          Nos Meilleures Ventes
        </p>
        <h2
          className="text-3xl md:text-4xl font-light text-gray-900"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Collection Signature
        </h2>
      </motion.div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grille de produits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCardSimple key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
