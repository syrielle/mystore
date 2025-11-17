import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleViewDetails = () => {
    navigate(`/produit/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group"
      onClick={handleViewDetails}
    >
      {/* Image du produit */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge nouveau ou promotion */}
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Nouveau
          </span>
        )}

        {product.discount && (
          <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            -{product.discount}%
          </span>
        )}

        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleViewDetails}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-5 h-5 text-gray-800" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-yellow-500 p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Informations du produit */}
      <div className="p-5">
        {/* Catégorie */}
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          {product.category}
        </p>

        {/* Nom du produit */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
          {product.name}
        </h3>

        {/* Description courte */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Prix */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discount ? (
              <>
                <span className="text-2xl font-bold text-yellow-600">
                  {(product.price * (1 - product.discount / 100)).toFixed(2)} $
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.price.toFixed(2)} $
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-yellow-600">
                {product.price.toFixed(2)} $
              </span>
            )}
          </div>

          {/* Indicateur de stock */}
          {product.stock > 0 ? (
            <span className="text-xs text-green-600 font-medium">
              En stock
            </span>
          ) : (
            <span className="text-xs text-red-600 font-medium">
              Épuisé
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
