import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Share2,
  Check,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { getProductById } from '../services/firebase/productService';
import ProductImageGallery from '../components/ui/ProductImageGallery';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger le produit depuis Firebase
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-12 w-12 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Produit non trouvé
          </h2>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bouton retour */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </motion.button>

        {/* Message ajouté au panier */}
        {showAddedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <Check className="w-5 h-5" />
            <span>Ajouté au panier !</span>
          </motion.div>
        )}

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galerie d'images du produit */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="relative">
                <ProductImageGallery
                  images={[product.image, product.image2, product.image3].filter(Boolean)}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.isNew && (
                    <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Nouveau
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Actions rapides */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Informations du produit */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Catégorie */}
            <div className="flex items-center gap-2 text-yellow-600">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Nom */}
            <h1
              className="text-4xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {product.name}
            </h1>

            {/* Prix */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-yellow-600">
                {finalPrice.toFixed(2)} $
              </span>
              {product.discount > 0 && (
                <span className="text-2xl text-gray-400 line-through">
                  {product.price.toFixed(2)} $
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Disponibilité */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    En stock ({product.stock} disponibles)
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Épuisé</span>
              )}
            </div>

            {/* Sélecteur de quantité */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Quantité
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-yellow-500 transition-colors flex items-center justify-center font-bold text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-yellow-500 transition-colors flex items-center justify-center font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3 pt-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                icon={ShoppingCart}
                className="w-full"
              >
                Ajouter au panier
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  handleAddToCart();
                  navigate('/panier');
                }}
                disabled={product.stock === 0}
                className="w-full"
              >
                Acheter maintenant
              </Button>
            </div>

            {/* Informations supplémentaires */}
            <div className="bg-gray-100 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">
                Informations sur la livraison
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Livraison sécurisée garantie</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Emballage soigné et élégant</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Service client disponible via WhatsApp</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
