import { motion } from 'framer-motion';

const TermsOfSale = () => {
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
            Conditions Générales de Vente
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 1 - Objet</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre Miss Bijoux et ses clients. Toute commande implique l'acceptation sans réserve des présentes CGV.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 2 - Produits</h2>
            <p className="text-gray-700 leading-relaxed">
              Les produits proposés sont ceux qui figurent sur le site www.missbijoux.com. Les photographies sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite avec le produit offert, notamment en ce qui concerne les couleurs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 3 - Commandes</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Les commandes sont passées via WhatsApp ou SMS. Le processus de commande est le suivant :
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>Sélection des produits et ajout au panier</li>
              <li>Vérification du panier</li>
              <li>Envoi de la commande via WhatsApp ou SMS</li>
              <li>Confirmation de la commande par notre équipe</li>
              <li>Traitement et expédition</li>
            </ol>
            <p className="text-gray-700 leading-relaxed mt-4">
              Toute commande est considérée comme ferme et définitive après notre confirmation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 4 - Prix</h2>
            <p className="text-gray-700 leading-relaxed">
              Les prix sont indiqués en euros (€), toutes taxes comprises (TTC). Miss Bijoux se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 5 - Paiement</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Les modalités de paiement acceptées sont :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Virement bancaire</li>
              <li>Mobile Money</li>
              <li>Paiement à la livraison (selon zones)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Les détails de paiement vous seront communiqués après confirmation de votre commande.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 6 - Livraison</h2>
            <p className="text-gray-700 leading-relaxed">
              Les délais de livraison varient selon votre localisation. En général, comptez 3 à 5 jours ouvrables pour une livraison standard. Les frais de livraison sont calculés en fonction de l'adresse de livraison et vous seront communiqués lors de la confirmation de commande.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Miss Bijoux ne pourra être tenue responsable des retards de livraison dus à des événements de force majeure ou au transporteur.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 7 - Droit de Rétractation</h2>
            <p className="text-gray-700 leading-relaxed">
              Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Les produits doivent être retournés dans leur état d'origine, non portés, avec leur emballage d'origine. Les frais de retour sont à la charge du client, sauf en cas d'erreur de notre part ou de produit défectueux.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 8 - Garanties</h2>
            <p className="text-gray-700 leading-relaxed">
              Tous nos produits bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés, conformément aux articles du Code de la consommation.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              En cas de défaut de conformité, le client peut choisir entre la réparation et le remplacement du bien. Si la demande de remplacement ou de réparation n'est pas possible, le client peut rendre le bien et se faire restituer le prix ou garder le bien et se faire rendre une partie du prix.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 9 - Responsabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              Miss Bijoux s'engage à apporter le plus grand soin à l'exécution de vos commandes. Notre responsabilité ne pourra être engagée en cas de force majeure ou de fait imprévisible et insurmontable d'un tiers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 10 - Propriété Intellectuelle</h2>
            <p className="text-gray-700 leading-relaxed">
              Tous les éléments du site www.missbijoux.com sont et restent la propriété intellectuelle exclusive de Miss Bijoux. Toute reproduction, exploitation, rediffusion ou utilisation des éléments du site, qu'ils soient logiciels, visuels ou sonores, est strictement interdite.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 11 - Données Personnelles</h2>
            <p className="text-gray-700 leading-relaxed">
              Les données personnelles collectées sont nécessaires au traitement de votre commande et à l'amélioration de nos services. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Pour plus d'informations, consultez notre <a href="/politique-confidentialite" className="text-blue-600 hover:underline">Politique de Confidentialité</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 12 - Médiation</h2>
            <p className="text-gray-700 leading-relaxed">
              En cas de litige, vous pouvez recourir gratuitement à un médiateur de la consommation dans les conditions prévues par le Code de la consommation. Le médiateur tentera de rapprocher les parties en vue d'aboutir à une solution amiable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 13 - Droit Applicable</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes CGV sont soumises au droit français. En cas de litige et à défaut d'accord amiable, le différend sera porté devant les tribunaux compétents.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant ces conditions générales de vente :
            </p>
            <p className="text-gray-700 mt-4">
              <strong>Miss Bijoux</strong><br />
              Email : contact@missbijoux.com<br />
              Téléphone : +1 (581) 688-4483
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

export default TermsOfSale;
