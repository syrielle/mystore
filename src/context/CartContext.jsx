import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Récupérer le panier du localStorage au chargement
    const savedCart = localStorage.getItem('bijoux-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('bijoux-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Si le produit existe déjà, augmenter la quantité
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Sinon, ajouter le nouveau produit avec quantité 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculer le total du panier
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Obtenir le nombre total d'articles
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Générer un ID unique pour le panier (pour le lien partagé)
  const generateCartId = () => {
    return `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Générer le message pour WhatsApp/SMS
  const generateOrderMessage = () => {
    const siteUrl = window.location.origin;
    let message = `*NOUVELLE COMMANDE DE BIJOUX*\n\n`;
    message += `*Details de la commande :*\n\n`;

    cartItems.forEach((item, index) => {
      const productUrl = `${siteUrl}/produit/${item.id}`;
      message += `*${index + 1}. ${item.name}*\n`;
      message += `   Lien : ${productUrl}\n`;
      message += `   Quantite : ${item.quantity}\n`;
      message += `   Prix unitaire : ${item.price.toFixed(2)} $\n`;
      message += `   Sous-total : *${(item.price * item.quantity).toFixed(2)} $*\n\n`;
    });

    message += `*TOTAL : ${getCartTotal().toFixed(2)} $*\n\n`;
    message += `Je souhaite finaliser cette commande.\n`;
    message += `Pouvez-vous me confirmer la disponibilite et les modalites de paiement/livraison ?\n\n`;
    message += `Merci !`;

    return encodeURIComponent(message);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    generateOrderMessage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
