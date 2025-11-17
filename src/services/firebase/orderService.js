import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase';

// Collection reference
const ordersCollection = collection(db, 'orders');

/**
 * Créer une nouvelle commande
 * @param {Object} orderData - Les données de la commande
 * @returns {Promise<Object>} La commande créée
 */
export const createOrder = async (orderData) => {
  try {
    const orderToCreate = {
      ...orderData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(ordersCollection, orderToCreate);

    return {
      id: docRef.id,
      ...orderToCreate,
    };
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    throw new Error('Échec de la création de la commande');
  }
};

/**
 * Récupérer toutes les commandes
 * @returns {Promise<Array>} Liste de toutes les commandes
 */
export const getAllOrders = async () => {
  try {
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders = [];

    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return orders;
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    throw new Error('Échec de la récupération des commandes');
  }
};

/**
 * Récupérer une commande par son ID
 * @param {string} orderId - L'ID de la commande
 * @returns {Promise<Object>} La commande
 */
export const getOrderById = async (orderId) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error('Commande non trouvée');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    throw error;
  }
};

/**
 * Mettre à jour une commande
 * @param {string} orderId - L'ID de la commande
 * @param {Object} orderData - Les nouvelles données
 * @returns {Promise<Object>} La commande mise à jour
 */
export const updateOrder = async (orderId, orderData) => {
  try {
    const docRef = doc(db, 'orders', orderId);

    const updateData = {
      ...orderData,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(docRef, updateData);

    return {
      id: orderId,
      ...updateData,
    };
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande:', error);
    throw new Error('Échec de la mise à jour de la commande');
  }
};

/**
 * Supprimer une commande
 * @param {string} orderId - L'ID de la commande à supprimer
 */
export const deleteOrder = async (orderId) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande:', error);
    throw new Error('Échec de la suppression de la commande');
  }
};

/**
 * Récupérer les commandes par statut
 * @param {string} status - Le statut (pending, paid, shipped, completed, cancelled)
 * @returns {Promise<Array>} Liste des commandes filtrées
 */
export const getOrdersByStatus = async (status) => {
  try {
    const q = query(
      ordersCollection,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = [];

    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return orders;
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes par statut:', error);
    throw new Error('Échec de la récupération des commandes');
  }
};

/**
 * Calculer les statistiques de revenus
 * @returns {Promise<Object>} Statistiques des revenus
 */
export const getRevenueStats = async () => {
  try {
    const orders = await getAllOrders();

    // Commandes payées uniquement
    const paidOrders = orders.filter(o => o.status === 'paid' || o.status === 'shipped' || o.status === 'completed');

    // Revenu total
    const totalRevenue = paidOrders.reduce((sum, order) => sum + order.total, 0);

    // Nombre de ventes
    const totalSales = paidOrders.length;

    // Revenu du mois en cours
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyOrders = paidOrders.filter(order => {
      if (order.createdAt && order.createdAt.toDate) {
        return order.createdAt.toDate() >= startOfMonth;
      }
      return false;
    });
    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.total, 0);

    // Commandes en attente
    const pendingOrders = orders.filter(o => o.status === 'pending').length;

    return {
      totalRevenue,
      totalSales,
      monthlyRevenue,
      pendingOrders,
      averageOrderValue: totalSales > 0 ? totalRevenue / totalSales : 0,
    };
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    throw new Error('Échec du calcul des statistiques');
  }
};
