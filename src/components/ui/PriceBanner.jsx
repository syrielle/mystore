import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const PriceBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 py-12">
      {/* Pattern d'arrière-plan */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)',
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Bijoux de Luxe à Petit Prix
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-yellow-100 font-semibold mb-2">
              De 2$ à 30$ Maximum !
            </p>
            <p className="text-white/90">
              L'élégance n'a jamais été aussi accessible
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0"
          >
            <Link
              to="/catalogue"
              className="inline-block px-8 py-4 bg-white text-yellow-900 font-bold text-lg rounded-lg hover:bg-yellow-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              Voir Nos Bijoux
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/30"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">2$</div>
            <div className="text-sm text-yellow-100">Prix Minimum</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">30$</div>
            <div className="text-sm text-yellow-100">Prix Maximum</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
            <div className="text-sm text-yellow-100">Qualité Garantie</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceBanner;
