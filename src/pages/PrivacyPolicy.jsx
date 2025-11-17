import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Politique de Confidentialité
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Miss Bijoux s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Données Collectées</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nous collectons les données personnelles suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse de livraison</li>
              <li>Historique des commandes</li>
              <li>Données de navigation (cookies, adresse IP)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Utilisation des Données</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vos données personnelles sont utilisées pour :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Traiter et gérer vos commandes</li>
              <li>Vous contacter concernant vos achats</li>
              <li>Améliorer notre service client</li>
              <li>Vous envoyer des newsletters (avec votre consentement)</li>
              <li>Analyser l'utilisation de notre site pour l'améliorer</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Base Légale du Traitement</h2>
            <p className="text-gray-700 leading-relaxed">
              Le traitement de vos données personnelles repose sur :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
              <li><strong>L'exécution d'un contrat</strong> : pour traiter vos commandes</li>
              <li><strong>Votre consentement</strong> : pour les newsletters et communications marketing</li>
              <li><strong>Notre intérêt légitime</strong> : pour améliorer nos services</li>
              <li><strong>Une obligation légale</strong> : pour la facturation et la comptabilité</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Partage des Données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous ne vendons ni ne louons vos données personnelles à des tiers. Vos données peuvent être partagées avec :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
              <li>Nos prestataires de services (livraison, paiement) sous contrat</li>
              <li>Les autorités compétentes si la loi l'exige</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conservation des Données</h2>
            <p className="text-gray-700 leading-relaxed">
              Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
              <li>Données de commande : 10 ans (obligation comptable)</li>
              <li>Données de compte client : jusqu'à suppression du compte + 3 ans</li>
              <li>Données de navigation : 13 mois maximum</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos Droits</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
              <li><strong>Droit à l'effacement</strong> : supprimer vos données</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement</li>
              <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong>Droit de retirer votre consentement</strong> : à tout moment</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à : <strong>contact@missbijoux.com</strong>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sécurité des Données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications de la Politique</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page avec une date de mise à jour.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant cette politique de confidentialité, contactez-nous :
            </p>
            <p className="text-gray-700 mt-4">
              <strong>Email :</strong> contact@missbijoux.com<br />
              <strong>Téléphone :</strong> +1 (581) 688-4483
            </p>
          </div>

          <p className="text-sm text-gray-500 italic mt-8">
            Dernière mise à jour : Janvier 2025
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
