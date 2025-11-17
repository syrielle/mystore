import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage } from '../../config/firebase';

// Collection reference
const productsCollection = collection(db, 'products');

/**
 * Upload une image vers Firebase Storage
 * @param {File} file - Le fichier image
 * @param {string} productId - L'ID du produit
 * @param {string} imageType - 'main' ou 'hover'
 * @returns {Promise<string>} L'URL de l'image uploadée
 */
export const uploadProductImage = async (file, productId, imageType = 'main') => {
  try {
    // Créer un nom de fichier unique
    const timestamp = Date.now();
    const fileName = `${productId}_${imageType}_${timestamp}.${file.name.split('.').pop()}`;
    const storageRef = ref(storage, `products/${fileName}`);

    // Upload le fichier
    const snapshot = await uploadBytes(storageRef, file);

    // Obtenir l'URL de téléchargement
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image:', error);
    throw new Error('Échec de l\'upload de l\'image');
  }
};

/**
 * Supprimer une image de Firebase Storage
 * @param {string} imageUrl - L'URL de l'image à supprimer
 */
export const deleteProductImage = async (imageUrl) => {
  try {
    // Extraire le chemin de l'image depuis l'URL
    const imagePath = imageUrl.split('/o/')[1].split('?')[0];
    const decodedPath = decodeURIComponent(imagePath);
    const imageRef = ref(storage, decodedPath);

    await deleteObject(imageRef);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    // Ne pas throw l'erreur car ce n'est pas critique
  }
};

/**
 * Créer un nouveau produit
 * @param {Object} productData - Les données du produit
 * @param {File} mainImageFile - Fichier image principale
 * @param {File|null} hoverImageFile - Fichier image hover (optionnel)
 * @returns {Promise<Object>} Le produit créé
 */
export const createProduct = async (productData, mainImageFile, hoverImageFile = null) => {
  try {
    // Générer un ID temporaire pour le produit
    const tempId = `prod_${Date.now()}`;

    // Upload de l'image principale
    const mainImageUrl = await uploadProductImage(mainImageFile, tempId, 'main');

    // Upload de l'image hover si fournie
    let hoverImageUrl = null;
    if (hoverImageFile) {
      hoverImageUrl = await uploadProductImage(hoverImageFile, tempId, 'hover');
    }

    // Créer le produit dans Firestore
    const productToCreate = {
      ...productData,
      image: mainImageUrl,
      imageHover: hoverImageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(productsCollection, productToCreate);

    return {
      id: docRef.id,
      ...productToCreate,
    };
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    throw new Error('Échec de la création du produit');
  }
};

/**
 * Récupérer tous les produits
 * @returns {Promise<Array>} Liste de tous les produits
 */
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(productsCollection);
    const products = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw new Error('Échec de la récupération des produits');
  }
};

/**
 * Récupérer un produit par son ID
 * @param {string} productId - L'ID du produit
 * @returns {Promise<Object>} Le produit
 */
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error('Produit non trouvé');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw error;
  }
};

/**
 * Mettre à jour un produit
 * @param {string} productId - L'ID du produit
 * @param {Object} productData - Les nouvelles données
 * @param {File|null} mainImageFile - Nouveau fichier image principale (optionnel)
 * @param {File|null} hoverImageFile - Nouveau fichier image hover (optionnel)
 * @returns {Promise<Object>} Le produit mis à jour
 */
export const updateProduct = async (
  productId,
  productData,
  mainImageFile = null,
  hoverImageFile = null
) => {
  try {
    const docRef = doc(db, 'products', productId);
    const currentProduct = await getProductById(productId);

    let updateData = {
      ...productData,
      updatedAt: serverTimestamp(),
    };

    // Upload nouvelle image principale si fournie
    if (mainImageFile) {
      // Supprimer l'ancienne image
      if (currentProduct.image) {
        await deleteProductImage(currentProduct.image);
      }
      // Upload la nouvelle
      updateData.image = await uploadProductImage(mainImageFile, productId, 'main');
    }

    // Upload nouvelle image hover si fournie
    if (hoverImageFile) {
      // Supprimer l'ancienne image hover
      if (currentProduct.imageHover) {
        await deleteProductImage(currentProduct.imageHover);
      }
      // Upload la nouvelle
      updateData.imageHover = await uploadProductImage(hoverImageFile, productId, 'hover');
    }

    await updateDoc(docRef, updateData);

    return {
      id: productId,
      ...currentProduct,
      ...updateData,
    };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    throw new Error('Échec de la mise à jour du produit');
  }
};

/**
 * Supprimer un produit
 * @param {string} productId - L'ID du produit à supprimer
 */
export const deleteProduct = async (productId) => {
  try {
    // Récupérer le produit pour obtenir les URLs des images
    const product = await getProductById(productId);

    // Supprimer les images du storage
    if (product.image) {
      await deleteProductImage(product.image);
    }
    if (product.imageHover) {
      await deleteProductImage(product.imageHover);
    }

    // Supprimer le document Firestore
    const docRef = doc(db, 'products', productId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    throw new Error('Échec de la suppression du produit');
  }
};

/**
 * Mettre à jour uniquement le stock d'un produit
 * @param {string} productId - L'ID du produit
 * @param {number} newStock - Le nouveau stock
 */
export const updateProductStock = async (productId, newStock) => {
  try {
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, {
      stock: newStock,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du stock:', error);
    throw new Error('Échec de la mise à jour du stock');
  }
};
