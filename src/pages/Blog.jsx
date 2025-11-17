import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: 'Les Tendances Bijoux pour 2025',
      excerpt: 'Découvrez les styles qui vont marquer l\'année et comment les intégrer à votre garde-robe.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      author: 'Miss Bijoux',
      date: '15 Janvier 2025',
      category: 'Tendances'
    },
    {
      id: 2,
      title: 'Comment Entretenir vos Bijoux Précieux',
      excerpt: 'Nos conseils d\'experts pour préserver l\'éclat de vos bijoux préférés au fil du temps.',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      author: 'Miss Bijoux',
      date: '10 Janvier 2025',
      category: 'Conseils'
    },
    {
      id: 3,
      title: 'L\'Art de Superposer les Colliers',
      excerpt: 'Maîtrisez l\'art du layering pour créer des looks uniques et personnalisés.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      author: 'Miss Bijoux',
      date: '5 Janvier 2025',
      category: 'Style'
    },
    {
      id: 4,
      title: 'Choisir le Bijou Parfait pour Chaque Occasion',
      excerpt: 'Un guide complet pour sélectionner les bijoux adaptés à chaque moment de votre vie.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
      author: 'Miss Bijoux',
      date: '28 Décembre 2024',
      category: 'Guide'
    },
    {
      id: 5,
      title: 'La Symbolique des Pierres Précieuses',
      excerpt: 'Explorez la signification cachée derrière vos pierres préférées et leur pouvoir.',
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80',
      author: 'Miss Bijoux',
      date: '20 Décembre 2024',
      category: 'Culture'
    },
    {
      id: 6,
      title: 'Bijoux Minimalistes : Moins c\'est Plus',
      excerpt: 'Pourquoi le minimalisme continue de dominer le monde de la bijouterie fine.',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80',
      author: 'Miss Bijoux',
      date: '15 Décembre 2024',
      category: 'Tendances'
    }
  ];

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
            Notre Blog
          </h1>
          <p className="text-xl text-gray-300 tracking-wide">
            Conseils, tendances et inspirations bijoux
          </p>
        </motion.div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <button className="flex items-center gap-2 text-gray-900 font-semibold text-sm group-hover:gap-3 transition-all">
                  Lire la suite
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            Charger Plus d'Articles
          </button>
        </motion.div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              Ne Manquez Aucun Article
            </h2>
            <p className="text-gray-600 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers conseils et tendances directement dans votre boîte mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
