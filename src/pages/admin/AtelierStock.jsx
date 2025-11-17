import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllProducts, updateProductStock } from '../../services/firebase/productService';
import {
  Package,
  Search,
  AlertCircle,
  Save,
  ArrowLeft,
  TrendingDown
} from 'lucide-react';

const AtelierStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStock, setEditingStock] = useState({});
  const [saving, setSaving] = useState({});

  // Charger les produits
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromFirebase = await getAllProducts();
        setProducts(productsFromFirebase);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filtrer les produits par recherche
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Produits avec stock bas (moins de 5)
  const lowStockProducts = useMemo(() => {
    return filteredProducts.filter(p => p.stock < 5);
  }, [filteredProducts]);

  const handleStockChange = (productId, newStock) => {
    setEditingStock(prev => ({
      ...prev,
      [productId]: newStock
    }));
  };

  const handleSaveStock = async (productId) => {
    const newStock = editingStock[productId];

    if (newStock === undefined || newStock === '') {
      return;
    }

    const stockNumber = parseInt(newStock);
    if (isNaN(stockNumber) || stockNumber < 0) {
      alert('Le stock doit être un nombre positif ou zéro');
      return;
    }

    setSaving(prev => ({ ...prev, [productId]: true }));

    try {
      await updateProductStock(productId, stockNumber);

      // Mettre à jour l'état local
      setProducts(prev =>
        prev.map(p =>
          p.id === productId ? { ...p, stock: stockNumber } : p
        )
      );

      // Réinitialiser l'édition
      setEditingStock(prev => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });

      alert('Stock mis à jour avec succès!');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stock:', error);
      alert('Erreur lors de la mise à jour du stock');
    } finally {
      setSaving(prev => ({ ...prev, [productId]: false }));
    }
  };

  const getCurrentStock = (product) => {
    return editingStock[product.id] !== undefined
      ? editingStock[product.id]
      : product.stock;
  };

  const isEditing = (productId) => {
    return editingStock[productId] !== undefined;
  };

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
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            to="/atelier"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestion du Stock</h2>
            <p className="text-sm text-gray-500 mt-1">
              Mettez à jour rapidement le stock de vos produits
            </p>
          </div>
        </div>

        {/* Alerte Stock Bas */}
        {lowStockProducts.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">
                  Attention : {lowStockProducts.length} produit{lowStockProducts.length > 1 ? 's' : ''} en stock bas
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Les produits avec moins de 5 unités en stock sont marqués en rouge
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Barre de recherche */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tableau de gestion du stock */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock Actuel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nouveau Stock
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-500 font-medium">
                          {searchTerm ? 'Aucun produit trouvé' : 'Aucun produit disponible'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const lowStock = product.stock < 5;
                    const currentStock = getCurrentStock(product);
                    const editing = isEditing(product.id);

                    return (
                      <tr
                        key={product.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          lowStock ? 'bg-red-50/50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover shadow-sm"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                              {lowStock && (
                                <div className="flex items-center gap-1 mt-1">
                                  <TrendingDown className="w-3 h-3 text-red-500" />
                                  <span className="text-xs text-red-600 font-medium">Stock bas</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{product.category}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            {product.price.toFixed(2)}$
                          </span>
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
                          <input
                            type="number"
                            min="0"
                            value={currentStock}
                            onChange={(e) => handleStockChange(product.id, e.target.value)}
                            className={`w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                              editing ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                            }`}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleSaveStock(product.id)}
                            disabled={!editing || saving[product.id]}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                              editing
                                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {saving[product.id] ? (
                              <>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sauvegarde...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Sauvegarder
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Résumé */}
        {filteredProducts.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total de produits : </span>
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Stock bas ({"<"}5) : </span>
                <span className="font-semibold text-red-600">{lowStockProducts.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Stock total : </span>
                <span className="font-semibold text-gray-900">
                  {filteredProducts.reduce((sum, p) => sum + p.stock, 0)} unités
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AtelierStock;
