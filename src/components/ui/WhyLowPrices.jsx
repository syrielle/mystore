import { motion } from 'framer-motion';
import { TrendingDown, Store, Users, Heart } from 'lucide-react';

const WhyLowPrices = () => {
  const reasons = [
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: 'Vente Directe',
      description: 'Nous éliminons tous les intermédiaires pour vous offrir les meilleurs prix'
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: 'Pas de Boutique Physique',
      description: 'Aucun frais de location ou d\'exploitation répercutés sur vos achats'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Partenariats Privilégiés',
      description: 'Nos relations directes avec les artisans nous permettent d\'obtenir les meilleurs tarifs'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Notre Mission',
      description: 'Rendre le luxe et l\'élégance accessibles à tous, sans exception'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Comment Proposons-Nous des Prix Si Attractifs ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des bijoux de qualité premium de <span className="font-bold text-yellow-700">2$ à 30$</span> maximum.
            Découvrez notre secret !
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg flex items-center justify-center">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Des Prix Honnêtes, Une Qualité Exceptionnelle
          </h3>
          <p className="text-lg text-yellow-100 mb-6 max-w-2xl mx-auto">
            Nous croyons que tout le monde mérite de porter de beaux bijoux.
            C'est pourquoi nous nous engageons à maintenir nos prix entre 2$ et 30$,
            sans jamais compromettre la qualité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/catalogue"
              className="inline-block px-8 py-4 bg-white text-yellow-900 font-bold rounded-lg hover:bg-yellow-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Découvrir Nos Bijoux
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-yellow-900 transition-all"
            >
              Nous Contacter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyLowPrices;
