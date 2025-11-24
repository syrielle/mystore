import { db } from '../../config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';

const categoriesCollection = collection(db, 'categories');

/**
 * Obtenir toutes les catégories
 * @returns {Promise<Array>} Liste des catégories
 */
export const getAllCategories = async () => {
  try {
    const q = query(categoriesCollection, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};

/**
 * Créer une nouvelle catégorie
 * @param {Object} categoryData - Les données de la catégorie
 * @returns {Promise<Object>} La catégorie créée
 */
export const createCategory = async (categoryData) => {
  try {
    const categoryToCreate = {
      ...categoryData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(categoriesCollection, categoryToCreate);
    return { id: docRef.id, ...categoryToCreate };
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    throw error;
  }
};

/**
 * Mettre à jour une catégorie
 * @param {string} categoryId - L'ID de la catégorie
 * @param {Object} categoryData - Les nouvelles données
 * @returns {Promise<void>}
 */
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, {
      ...categoryData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    throw error;
  }
};

/**
 * Supprimer une catégorie
 * @param {string} categoryId - L'ID de la catégorie
 * @returns {Promise<void>}
 */
export const deleteCategory = async (categoryId) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await deleteDoc(categoryRef);
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    throw error;
  }
};
