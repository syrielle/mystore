import { motion } from 'framer-motion';

const LegalNotice = () => {
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
            Mentions Légales
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Éditeur du Site</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Raison sociale :</strong> Miss Bijoux<br />
              <strong>Email :</strong> contact@missbijoux.com<br />
              <strong>Téléphone :</strong> +1 (581) 688-4483<br />
              <strong>SIRET :</strong> XXX XXX XXX XXXXX
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Directeur de la Publication</h2>
            <p className="text-gray-700">
              Le directeur de la publication du site est [Nom du Directeur].
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hébergement</h2>
            <p className="text-gray-700 leading-relaxed">
              Le site est hébergé par :<br />
              <strong>Raison sociale :</strong> [Nom de l'hébergeur]<br />
              <strong>Adresse :</strong> [Adresse de l'hébergeur]<br />
              <strong>Téléphone :</strong> [Numéro de téléphone]
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Propriété Intellectuelle</h2>
            <p className="text-gray-700 leading-relaxed">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Protection des Données Personnelles</h2>
            <p className="text-gray-700 leading-relaxed">
              Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse : contact@missbijoux.com
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Le site peut être amené à vous demander l'acceptation de cookies pour des besoins de statistiques et d'affichage. Un cookie est une information déposée sur votre disque dur par le serveur du site que vous visitez.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Vous pouvez vous opposer à l'enregistrement de cookies en configurant votre navigateur.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation de Responsabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              Miss Bijoux ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
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

export default LegalNotice;
