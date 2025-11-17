import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllProducts } from '../../services/firebase/productService';
import { getRevenueStats } from '../../services/firebase/orderService';
import {
  Package,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Plus,
  Eye,
  Boxes,
  ShoppingCart
} from 'lucide-react';

const AtelierDashboard = () => {
  const [products, setProducts] = useState([]);
  const [revenueStats, setRevenueStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les produits et statistiques depuis Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsFromFirebase, stats] = await Promise.all([
          getAllProducts(),
          getRevenueStats()
        ]);
        setProducts(productsFromFirebase);
        setRevenueStats(stats);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculer les statistiques à partir des données Firebase
  const stats = useMemo(() => {
    if (products.length === 0) {
      return {
        totalProducts: 0,
        lowStockProducts: 0,
        bestSellersCount: 0,
        averagePrice: '0.00',
      };
    }

    const totalProducts = products.length;

    // Produits avec stock bas (moins de 5)
    const lowStockProducts = products.filter(p => p.stock < 5).length;

    // Produits best sellers
    const bestSellersCount = products.filter(p => p.isBestSeller).length;

    // Prix moyen
    const averagePrice = (
      products.reduce((sum, p) => sum + p.price, 0) / totalProducts
    ).toFixed(2);

    return {
      totalProducts,
      lowStockProducts,
      bestSellersCount,
      averagePrice,
    };
  }, [products]);

  const statCards = [
    {
      title: 'Revenu Total',
      value: revenueStats ? `${revenueStats.totalRevenue.toFixed(2)}$` : '0.00$',
      icon: DollarSign,
      color: 'bg-green-500',
      trend: revenueStats ? `${revenueStats.totalSales} vente${revenueStats.totalSales > 1 ? 's' : ''}` : '0 vente',
    },
    {
      title: 'Revenu du Mois',
      value: revenueStats ? `${revenueStats.monthlyRevenue.toFixed(2)}$` : '0.00$',
      icon: TrendingUp,
      color: 'bg-blue-500',
      trend: 'Ce mois-ci',
    },
    {
      title: 'Commandes en Attente',
      value: revenueStats ? revenueStats.pendingOrders : 0,
      icon: ShoppingCart,
      color: 'bg-yellow-500',
      trend: 'À traiter',
    },
    {
      title: 'Total Produits',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
      trend: `${stats.totalProducts} produit${stats.totalProducts > 1 ? 's' : ''} en ligne`,
    },
  ];

  const quickActions = [
    {
      title: 'Nouvelle Commande',
      description: 'Enregistrer une vente',
      icon: Plus,
      link: '/atelier/commandes/nouvelle',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Voir les Commandes',
      description: 'Historique des ventes',
      icon: ShoppingCart,
      link: '/atelier/commandes',
      color: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
      title: 'Ajouter un Produit',
      description: 'Créer un nouveau bijou',
      icon: Package,
      link: '/atelier/produits/nouveau',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Gérer le Stock',
      description: 'Mise à jour rapide',
      icon: Boxes,
      link: '/atelier/stock',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  // Produits récents (triés par date de création, les 5 plus récents)
  const recentProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        // Trier par date de création (createdAt) si disponible
        if (a.createdAt && b.createdAt) {
          return b.createdAt.seconds - a.createdAt.seconds;
        }
        return 0;
      })
      .slice(0, 5);
  }, [products]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-12 w-12 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord</h2>
          <p className="text-sm text-gray-500 mt-1">
            Vue d'ensemble de votre boutique de bijoux
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.trend}</p>
              </div>
            );
          })}
        </div>

        {/* Actions Rapides */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Actions Rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white rounded-xl p-6 transition-all transform hover:scale-105 shadow-lg`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <h4 className="font-bold text-lg mb-1">{action.title}</h4>
                  <p className="text-sm text-white/80">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Produits Récents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Produits Récents</h3>
              <Link
                to="/atelier/produits"
                className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Voir tout →
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-500 font-medium">Aucun produit pour le moment</p>
                        <Link
                          to="/atelier/produits/nouveau"
                          className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                        >
                          Ajouter votre premier produit →
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentProducts.map((product) => {
                    const lowStock = product.stock < 5;
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <span className="text-sm font-medium text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{product.category}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">{product.price.toFixed(2)}$</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${lowStock ? 'text-red-600' : 'text-gray-900'}`}>
                              {product.stock}
                            </span>
                            {lowStock && (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-1">
                            {product.isNew && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Nouveau
                              </span>
                            )}
                            {product.isBestSeller && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Best Seller
                              </span>
                            )}
                            {!product.isNew && !product.isBestSeller && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                Actif
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AtelierDashboard;
