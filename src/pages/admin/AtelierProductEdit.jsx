import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { getProductById, updateProduct } from '../../services/firebase/productService';
import {
  Upload,
  X,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

const AtelierProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Colliers',
    stock: '',
    isNew: false,
    isBestSeller: false,
    discount: 0,
  });

  const [currentMainImage, setCurrentMainImage] = useState(null);
  const [currentHoverImage, setCurrentHoverImage] = useState(null);
  const [newMainImage, setNewMainImage] = useState(null);
  const [newHoverImage, setNewHoverImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [hoverImagePreview, setHoverImagePreview] = useState(null);

  const [errors, setErrors] = useState({});

  const categories = ['Colliers', 'Bagues', 'Bracelets', 'Boucles d\'oreilles', 'Ensembles', 'Bijoux Africains'];

  // Charger le produit existant
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await getProductById(id);
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          stock: product.stock.toString(),
          isNew: product.isNew || false,
          isBestSeller: product.isBestSeller || false,
          discount: product.discount || 0,
        });
        setCurrentMainImage(product.image);
        setCurrentHoverImage(product.imageHover);
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error);
        alert('Produit introuvable');
        navigate('/atelier/produits');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, mainImage: 'L\'image ne doit pas dépasser 5 MB' }));
        return;
      }
      setNewMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, mainImage: '' }));
    }
  };

  const handleHoverImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, hoverImage: 'L\'image ne doit pas dépasser 5 MB' }));
        return;
      }
      setNewHoverImage(file);
      setHoverImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, hoverImage: '' }));
    }
  };

  const removeNewMainImage = () => {
    setNewMainImage(null);
    setMainImagePreview(null);
  };

  const removeNewHoverImage = () => {
    setNewHoverImage(null);
    setHoverImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du produit est requis';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      newErrors.price = 'Le prix doit être un nombre positif';
    } else if (price < 2 || price > 30) {
      newErrors.price = 'Le prix doit être entre 2$ et 30$';
    }

    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0) {
      newErrors.stock = 'Le stock doit être un nombre positif ou zéro';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        isNew: formData.isNew,
        isBestSeller: formData.isBestSeller,
        discount: parseInt(formData.discount) || 0,
      };

      // Mettre à jour le produit (avec nouvelles images si fournies)
      await updateProduct(id, productData, newMainImage, newHoverImage);

      alert('Produit modifié avec succès!');
      navigate('/atelier/produits');
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      alert('Erreur lors de la modification du produit: ' + error.message);
    } finally {
      setSaving(false);
    }
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
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/atelier/produits')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Modifier le Produit</h2>
            <p className="text-sm text-gray-500 mt-1">
              Modifiez les informations et images du produit
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Images du Produit</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Principale */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Principale *
                </label>

                {/* Image actuelle */}
                {currentMainImage && !mainImagePreview && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Image actuelle :</p>
                    <img
                      src={currentMainImage}
                      alt="Image actuelle"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                  </div>
                )}

                {/* Nouvelle image preview */}
                {mainImagePreview ? (
                  <div className="relative">
                    <img
                      src={mainImagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-yellow-500"
                    />
                    <button
                      type="button"
                      onClick={removeNewMainImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-green-600 mt-2">Nouvelle image sélectionnée</p>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-500 text-center px-4">
                        Cliquez pour changer l'image principale
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleMainImageChange}
                    />
                  </label>
                )}
                {errors.mainImage && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.mainImage}
                  </p>
                )}
              </div>

              {/* Image Hover */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Hover (optionnelle)
                </label>

                {/* Image actuelle */}
                {currentHoverImage && !hoverImagePreview && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Image hover actuelle :</p>
                    <img
                      src={currentHoverImage}
                      alt="Image hover actuelle"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                  </div>
                )}

                {/* Nouvelle image preview */}
                {hoverImagePreview ? (
                  <div className="relative">
                    <img
                      src={hoverImagePreview}
                      alt="Preview hover"
                      className="w-full h-48 object-cover rounded-lg border-2 border-yellow-500"
                    />
                    <button
                      type="button"
                      onClick={removeNewHoverImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-green-600 mt-2">Nouvelle image sélectionnée</p>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-500 text-center px-4">
                        {currentHoverImage ? 'Changer l\'image hover' : 'Ajouter une image hover'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleHoverImageChange}
                    />
                  </label>
                )}
                {errors.hoverImage && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.hoverImage}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section Informations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du Produit</h3>

            <div className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du Produit *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Collier en Or 18 carats"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Décrivez le produit en détail..."
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                )}
              </div>

              {/* Prix et Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix (CAD) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="2"
                    max="30"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600 mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                      errors.stock ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && (
                    <p className="text-sm text-red-600 mt-1">{errors.stock}</p>
                  )}
                </div>
              </div>

              {/* Catégorie et Réduction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Réduction (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Badges
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Nouveau</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isBestSeller"
                      checked={formData.isBestSeller}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Best Seller</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/atelier/produits')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Enregistrer les Modifications
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AtelierProductEdit;
