import { motion } from 'framer-motion';
import { Award, Heart, Sparkles, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            À Propos de Miss Bijoux
          </h1>
          <p className="text-xl text-gray-300 tracking-wide">
            L'élégance à portée de main
          </p>
        </motion.div>
      </section>

      {/* Notre Histoire */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              Notre Histoire
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Miss Bijoux est née d'une passion pour la beauté et l'élégance intemporelle.
              Depuis nos débuts, nous nous sommes engagés à offrir des bijoux raffinés qui
              subliment chaque moment de votre vie.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chaque pièce de notre collection est soigneusement sélectionnée pour sa qualité
              exceptionnelle et son design unique. Nous croyons que les bijoux ne sont pas
              seulement des accessoires, mais des expressions de votre personnalité et de votre style.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Notre mission est simple : vous aider à briller avec confiance et élégance,
              que ce soit pour une occasion spéciale ou au quotidien.
            </p>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
              alt="Notre boutique"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Nos Valeurs */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              Nos Valeurs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ce qui nous guide dans notre engagement envers vous
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-12 h-12" />,
                title: 'Qualité',
                description: 'Des bijoux sélectionnés avec soin pour leur excellence et leur durabilité.'
              },
              {
                icon: <Heart className="w-12 h-12" />,
                title: 'Passion',
                description: 'Un amour profond pour l\'art de la bijouterie et le service client.'
              },
              {
                icon: <Sparkles className="w-12 h-12" />,
                title: 'Élégance',
                description: 'Des designs raffinés qui reflètent votre sophistication naturelle.'
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: 'Confiance',
                description: 'Un engagement envers la transparence et la satisfaction client.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 text-white rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
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

      {/* Notre Engagement */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Notre Engagement
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Chez Miss Bijoux, nous nous engageons à vous offrir une expérience d'achat exceptionnelle.
            De la sélection de nos bijoux à votre satisfaction après l'achat, chaque détail compte pour nous.
            Votre confiance est notre plus belle récompense.
          </p>
          <p className="text-lg text-gray-400 italic">
            "L'élégance n'est pas se faire remarquer, mais se faire mémoriser."
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
