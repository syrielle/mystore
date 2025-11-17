import { motion } from 'framer-motion';
import { Gem, DollarSign, ShieldCheck, MessageCircle } from 'lucide-react';

const Advantages = () => {
  const advantages = [
    {
      icon: <Gem className="w-10 h-10" />,
      title: 'Qualité Premium',
      description: 'Des bijoux soigneusement sélectionnés pour leur qualité exceptionnelle'
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: 'De 2$ à 30$ Maximum',
      description: 'Le luxe accessible à tous sans compromis sur la qualité',
      highlight: true
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: '100% Satisfait ou Remboursé',
      description: 'Votre satisfaction est notre priorité absolue'
    },
    {
      icon: <MessageCircle className="w-10 h-10" />,
      title: 'Service Client Réactif',
      description: 'Contactez-nous via WhatsApp ou SMS pour toute question'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Pourquoi Choisir Miss Bijoux ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des bijoux de qualité à des prix imbattables
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-center p-6 rounded-xl transition-all hover:shadow-xl ${
                advantage.highlight
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-50 border-2 border-yellow-300'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                advantage.highlight
                  ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white'
                  : 'bg-gray-900 text-white'
              }`}>
                {advantage.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                advantage.highlight ? 'text-yellow-900' : 'text-gray-900'
              }`}>
                {advantage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
