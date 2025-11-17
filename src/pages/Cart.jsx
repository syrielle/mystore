import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  MessageSquare,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    generateOrderMessage,
  } = useCart();

  // Numéro WhatsApp
  const WHATSAPP_NUMBER = '15816884483'; // Format: code pays + numéro (sans +, espaces ou tirets)

  const handleWhatsAppOrder = () => {
    const message = generateOrderMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    // Vider le panier après l'envoi
    clearCart();
  };

  const handleSMSOrder = () => {
    const message = generateOrderMessage();
    const smsUrl = `sms:${WHATSAPP_NUMBER}?body=${message}`;
    window.location.href = smsUrl;
    // Vider le panier après l'envoi
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gray-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-8">
            Découvrez notre magnifique collection de bijoux
          </p>
          <Button onClick={() => navigate('/')}>
            Voir la collection
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className="text-4xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mon Panier
          </h1>
          <p className="text-gray-600">
            {cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Informations */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {/* Prix */}
                        <div>
                          <span className="text-2xl font-bold text-yellow-600">
                            {item.price.toFixed(2)} $
                          </span>
                        </div>

                        {/* Contrôles de quantité */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-yellow-500 transition-colors flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-yellow-500 transition-colors flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Sous-total */}
                      <div className="mt-2 text-right">
                        <span className="text-sm text-gray-600">
                          Sous-total:{' '}
                          <span className="font-semibold text-gray-900">
                            {(item.price * item.quantity).toFixed(2)} $
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Bouton vider le panier */}
            <Button
              variant="ghost"
              onClick={clearCart}
              className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Vider le panier
            </Button>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Résumé
              </h2>

              {/* Détails */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{getCartTotal().toFixed(2)} $</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total estimé</span>
                    <span className="text-yellow-600">
                      {getCartTotal().toFixed(2)} $
                    </span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  Le montant final sera confirmé lors de notre échange direct.
                  Frais de livraison à déterminer selon votre localisation.
                </p>
              </div>

              {/* Boutons de commande */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  onClick={handleWhatsAppOrder}
                  icon={MessageCircle}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                >
                  Discuter sur WhatsApp
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSMSOrder}
                  icon={MessageSquare}
                  className="w-full"
                >
                  Envoyer par SMS
                </Button>
              </div>

              {/* Information */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  En cliquant sur "Discuter", un message prérempli s'ouvrira
                  dans WhatsApp avec tous les détails de votre commande.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
