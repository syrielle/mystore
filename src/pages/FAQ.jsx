import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Commande & Livraison',
      questions: [
        {
          question: 'Comment passer une commande ?',
          answer: 'Ajoutez vos bijoux préférés au panier, puis cliquez sur "Commander via WhatsApp" ou "Commander via SMS". Un message pré-rempli avec votre commande sera généré, que vous pourrez envoyer directement pour finaliser votre achat.'
        },
        {
          question: 'Quels sont les délais de livraison ?',
          answer: 'Les délais de livraison varient selon votre localisation. En général, comptez 3 à 5 jours ouvrables pour une livraison standard. Nous vous communiquerons un délai précis lors de la confirmation de votre commande.'
        },
        {
          question: 'Puis-je suivre ma commande ?',
          answer: 'Oui ! Une fois votre commande expédiée, nous vous enverrons un numéro de suivi par email ou WhatsApp pour suivre votre colis en temps réel.'
        },
        {
          question: 'Livrez-vous à l\'international ?',
          answer: 'Actuellement, nous livrons principalement au niveau national. Pour les demandes internationales, veuillez nous contacter directement via WhatsApp ou email pour discuter des options disponibles.'
        }
      ]
    },
    {
      category: 'Paiement',
      questions: [
        {
          question: 'Quels modes de paiement acceptez-vous ?',
          answer: 'Nous acceptons les paiements par virement bancaire, mobile money, et paiement à la livraison dans certaines zones. Les détails de paiement vous seront communiqués après confirmation de votre commande via WhatsApp ou SMS.'
        },
        {
          question: 'Mes informations de paiement sont-elles sécurisées ?',
          answer: 'Absolument ! Toutes vos transactions sont sécurisées. Nous ne stockons aucune information bancaire et utilisons des méthodes de paiement fiables et reconnues.'
        },
        {
          question: 'Puis-je payer en plusieurs fois ?',
          answer: 'Selon le montant de votre commande, nous pouvons proposer des options de paiement échelonné. Contactez-nous via WhatsApp pour discuter des modalités.'
        }
      ]
    },
    {
      category: 'Produits & Qualité',
      questions: [
        {
          question: 'Vos bijoux sont-ils authentiques ?',
          answer: 'Oui, tous nos bijoux sont authentiques et de haute qualité. Nous sélectionnons soigneusement chaque pièce pour garantir son excellence et sa durabilité.'
        },
        {
          question: 'Comment entretenir mes bijoux ?',
          answer: 'Pour préserver l\'éclat de vos bijoux, nettoyez-les régulièrement avec un chiffon doux, évitez le contact avec l\'eau et les produits chimiques, et rangez-les dans un endroit sec à l\'abri de la lumière directe.'
        },
        {
          question: 'Proposez-vous des certificats d\'authenticité ?',
          answer: 'Pour certains bijoux en or ou avec pierres précieuses, nous fournissons des certificats d\'authenticité. Les détails sont indiqués sur la fiche produit de chaque article concerné.'
        },
        {
          question: 'Les bijoux sont-ils hypoallergéniques ?',
          answer: 'La plupart de nos bijoux sont conçus pour minimiser les risques d\'allergie. Les matériaux utilisés sont indiqués sur chaque fiche produit. En cas de peau sensible, nous vous recommandons de nous contacter avant l\'achat.'
        }
      ]
    },
    {
      category: 'Retours & Échanges',
      questions: [
        {
          question: 'Puis-je retourner un article ?',
          answer: 'Oui, vous disposez de 14 jours après réception pour retourner un article non porté et dans son emballage d\'origine. Contactez-nous pour initier un retour.'
        },
        {
          question: 'Comment faire un échange ?',
          answer: 'Si vous souhaitez échanger un article, contactez-nous via WhatsApp ou email avec votre numéro de commande et le bijou que vous souhaitez recevoir à la place.'
        },
        {
          question: 'Les frais de retour sont-ils à ma charge ?',
          answer: 'Les frais de retour sont généralement à la charge du client, sauf en cas d\'erreur de notre part ou de produit défectueux. Dans ces cas, nous prenons en charge tous les frais.'
        },
        {
          question: 'Quand serai-je remboursé ?',
          answer: 'Une fois le retour reçu et vérifié, nous procédons au remboursement sous 5 à 7 jours ouvrables par le même moyen de paiement utilisé lors de l\'achat.'
        }
      ]
    },
    {
      category: 'Service Client',
      questions: [
        {
          question: 'Comment puis-je vous contacter ?',
          answer: 'Vous pouvez nous joindre via WhatsApp, SMS, email (contact@missbijoux.com) ou par téléphone au +1 (581) 688-4483. Notre équipe est disponible pour répondre à vos questions.'
        },
        {
          question: 'Proposez-vous un service de personnalisation ?',
          answer: 'Nous travaillons sur des options de personnalisation pour certains bijoux. Contactez-nous directement pour discuter de vos besoins spécifiques.'
        },
        {
          question: 'Puis-je acheter une carte cadeau ?',
          answer: 'Les cartes cadeaux sont en cours de développement. En attendant, vous pouvez contacter notre service client pour des options alternatives.'
        }
      ]
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
            Questions Fréquentes
          </h1>
          <p className="text-xl text-gray-300 tracking-wide">
            Tout ce que vous devez savoir sur Miss Bijoux
          </p>
        </motion.div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            {/* Category Title */}
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-900"
            >
              {category.category}
            </motion.h2>

            {/* Questions */}
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const globalIndex = `${categoryIndex}-${questionIndex}`;
                const isOpen = openIndex === globalIndex;

                return (
                  <motion.div
                    key={questionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: questionIndex * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-12 text-white"
          >
            <MessageCircle className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Notre équipe est là pour vous aider ! Contactez-nous et nous vous répondrons dans les plus brefs délais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/15816884483"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="mailto:contact@missbijoux.com"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
