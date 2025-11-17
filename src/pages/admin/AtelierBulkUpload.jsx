import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { createProduct } from '../../services/firebase/productService';
import {
  Upload,
  X,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

const AtelierBulkUpload = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [uploadResults, setUploadResults] = useState([]);

  const categories = [
    'Colliers',
    'Bagues',
    'Bracelets',
    'Boucles d\'oreilles',
    'Ensembles',
    'Bijoux Africains'
  ];

  // Gérer la sélection des fichiers
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Initialiser les données de produit pour chaque fichier
    const initialData = files.map((file, index) => ({
      id: index,
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '), // Nom du fichier sans extension
      description: '',
      price: '',
      category: 'Colliers',
      stock: '10',
      isNew: false,
      isBestSeller: false,
      discount: 0,
    }));
    setProductsData(initialData);
  };

  // Mettre à jour les données d'un produit
  const updateProductData = (id, field, value) => {
    setProductsData(prev =>
      prev.map(product =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  // Supprimer une image
  const removeImage = (id) => {
    setProductsData(prev => prev.filter(p => p.id !== id));
    setSelectedFiles(prev => prev.filter((_, index) => index !== id));
  };

  // Valider un produit
  const validateProduct = (product) => {
    if (!product.name.trim()) return 'Le nom est requis';
    if (!product.price || product.price <= 0) return 'Prix invalide';
    if (product.price > 30) return 'Prix max 30$';
    if (!product.stock || product.stock < 0) return 'Stock invalide';
    return null;
  };

  // Upload tous les produits
  const handleBulkUpload = async () => {
    // Valider tous les produits
    const errors = productsData.map(p => validateProduct(p));
    const hasErrors = errors.some(e => e !== null);

    if (hasErrors) {
      alert('Certains produits ont des erreurs. Veuillez les corriger.');
      return;
    }

    setUploading(true);
    setUploadProgress({ current: 0, total: productsData.length });
    const results = [];

    for (let i = 0; i < productsData.length; i++) {
      const product = productsData[i];

      try {
        const productData = {
          name: product.name,
          description: product.description || `Magnifique ${product.name.toLowerCase()}`,
          price: parseFloat(product.price),
          category: product.category,
          stock: parseInt(product.stock),
          isNew: product.isNew,
          isBestSeller: product.isBestSeller,
          discount: parseInt(product.discount) || 0,
        };

        await createProduct(productData, product.file);

        results.push({ name: product.name, success: true });
        setUploadProgress({ current: i + 1, total: productsData.length });
      } catch (error) {
        console.error(`Erreur pour ${product.name}:`, error);
        results.push({ name: product.name, success: false, error: error.message });
      }
    }

    setUploadResults(results);
    setUploading(false);

    const successCount = results.filter(r => r.success).length;
    alert(`Import terminé! ${successCount}/${results.length} produits ajoutés avec succès.`);

    if (successCount > 0) {
      navigate('/atelier/produits');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/atelier/produits')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Upload en Masse</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sélectionnez plusieurs images et remplissez les informations rapidement
          </p>
        </div>

        {/* Zone d'upload */}
        {selectedFiles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <div className="w-32 h-32 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
                <Upload className="w-16 h-16 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sélectionner les images
              </h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                Cliquez pour sélectionner toutes les images de vos produits en une fois
              </p>
              <div className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors">
                Choisir les fichiers
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <p className="text-xs text-gray-400 mt-4">PNG, JPG, WEBP (max. 5MB par image)</p>
            </label>
          </div>
        ) : (
          <>
            {/* Barre de progression */}
            {uploading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                  <span className="text-sm font-medium text-blue-900">
                    Upload en cours... {uploadProgress.current} / {uploadProgress.total}
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* En-tête avec boutons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{productsData.length}</span> produit{productsData.length > 1 ? 's' : ''} à importer
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedFiles([]);
                      setProductsData([]);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleBulkUpload}
                    disabled={uploading || productsData.length === 0}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 h-5" />
                    Tout Importer ({productsData.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Grille de produits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsData.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={product.preview}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(product.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Formulaire */}
                  <div className="p-4 space-y-3">
                    {/* Nom */}
                    <div>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProductData(product.id, 'name', e.target.value)}
                        placeholder="Nom du produit"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    {/* Prix et Stock */}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => updateProductData(product.id, 'price', e.target.value)}
                        placeholder="Prix ($)"
                        step="0.01"
                        min="0"
                        max="30"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => updateProductData(product.id, 'stock', e.target.value)}
                        placeholder="Stock"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    {/* Catégorie */}
                    <select
                      value={product.category}
                      onChange={(e) => updateProductData(product.id, 'category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    {/* Description (optionnelle) */}
                    <textarea
                      value={product.description}
                      onChange={(e) => updateProductData(product.id, 'description', e.target.value)}
                      placeholder="Description (optionnel)"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    {/* Badges */}
                    <div className="flex gap-2 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.isNew}
                          onChange={(e) => updateProductData(product.id, 'isNew', e.target.checked)}
                          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                        />
                        <span className="text-gray-700">Nouveau</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.isBestSeller}
                          onChange={(e) => updateProductData(product.id, 'isBestSeller', e.target.checked)}
                          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                        />
                        <span className="text-gray-700">Best Seller</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AtelierBulkUpload;
