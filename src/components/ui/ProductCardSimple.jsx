import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'lucide-react';

const ProductCardSimple = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produit/${product.id}`);
  };

  // Déterminer le badge en fonction du prix
  const getPriceBadge = (price) => {
    if (price <= 10) {
      return { label: 'Petit Prix', color: 'bg-green-500' };
    } else if (price <= 20) {
      return { label: 'Prix Doux', color: 'bg-blue-500' };
    } else if (price <= 30) {
      return { label: 'Top Qualité', color: 'bg-purple-500' };
    }
    return null;
  };

  const badge = getPriceBadge(product.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image avec effet hover */}
      <div className="relative aspect-square overflow-hidden mb-4 bg-white">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Badge de prix */}
        {badge && (
          <div className={`absolute top-2 right-2 ${badge.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}>
            <Tag className="w-3 h-3" />
            {badge.label}
          </div>
        )}
      </div>

      {/* Informations produit */}
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">
          {product.price.toFixed(2)} $
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCardSimple;
