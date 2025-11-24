import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, MapPin } from 'lucide-react';

const Contact = () => {

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
            Contactez-Nous
          </h1>
          <p className="text-xl text-gray-300 tracking-wide">
            Nous sommes à votre écoute
          </p>
        </motion.div>
      </section>

      {/* Contact Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              Informations de Contact
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Notre équipe est là pour répondre à toutes vos questions. N'hésitez pas à nous contacter par le moyen qui vous convient le mieux.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:missbijoux761@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                    missbijoux761@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Téléphone / SMS</h3>
                  <a href="tel:+15816884483" className="text-gray-600 hover:text-gray-900 transition-colors">
                    +1 (581) 688-4483
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/15816884483"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Discuter sur WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              Envoyez-nous un Message
            </h2>

            <form
              action="https://formsubmit.co/missbijoux761@gmail.com"
              method="POST"
              className="space-y-6"
            >
              {/* Champs cachés FormSubmit */}
              <input type="hidden" name="_subject" value="Nouveau message de contact - Miss Bijoux" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="Information sur un produit">Information sur un produit</option>
                  <option value="Question sur une commande">Question sur une commande</option>
                  <option value="Retour ou échange">Retour ou échange</option>
                  <option value="Opportunité de partenariat">Opportunité de partenariat</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  placeholder="Écrivez votre message ici..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Envoyer le Message
              </button>

              <p className="text-sm text-gray-500 text-center">
                * Champs obligatoires
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              Trouvez-Nous
            </h2>
            <div className="w-full h-[400px] bg-gray-300 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">Carte interactive à venir</p>
                <p className="text-sm mt-2">123 Rue de l'Élégance, 75001 Paris</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
