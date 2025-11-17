import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { createProduct } from '../../services/firebase/productService';
import {
  Upload,
  X,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

const AtelierProductNew = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    isNew: false,
    isBestSeller: false,
    discount: 0,
  });

  const [image1, setImage1] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image3Preview, setImage3Preview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Catégories disponibles
  const categories = [
    'Colliers',
    'Bagues',
    'Bracelets',
    'Boucles d\'oreilles',
    'Ensembles',
    'Bijoux Africains'
  ];

  // Gérer les changements de formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Nettoyer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Fonction générique pour gérer l'upload d'image
  const handleImageChange = (e, imageNumber) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier le type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [`image${imageNumber}`]: 'Le fichier doit être une image' }));
        return;
      }
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [`image${imageNumber}`]: 'L\'image ne doit pas dépasser 5MB' }));
        return;
      }

      const preview = URL.createObjectURL(file);

      if (imageNumber === 1) {
        setImage1(file);
        setImage1Preview(preview);
      } else if (imageNumber === 2) {
        setImage2(file);
        setImage2Preview(preview);
      } else if (imageNumber === 3) {
        setImage3(file);
        setImage3Preview(preview);
      }

      setErrors(prev => ({ ...prev, [`image${imageNumber}`]: null }));
    }
  };

  // Fonction générique pour supprimer une image
  const removeImage = (imageNumber) => {
    if (imageNumber === 1) {
      setImage1(null);
      setImage1Preview(null);
    } else if (imageNumber === 2) {
      setImage2(null);
      setImage2Preview(null);
    } else if (imageNumber === 3) {
      setImage3(null);
      setImage3Preview(null);
    }
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Le prix doit être supérieur à 0';
    if (formData.price > 30) newErrors.price = 'Le prix ne doit pas dépasser 30$';
    if (!formData.category) newErrors.category = 'La catégorie est requise';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Le stock doit être supérieur ou égal à 0';
    if (!image1) newErrors.image1 = 'L\'image principale est requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Préparer les données du produit
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

      // Créer le produit avec upload d'images
      await createProduct(productData, image1, image2, image3);

      alert('Produit créé avec succès!');
      navigate('/atelier/produits');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      alert('Erreur lors de la création du produit: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Composant réutilisable pour l'upload d'image
  const ImageUploadBox = ({ imageNumber, preview, required = false }) => {
    const label = imageNumber === 1 ? 'Image Principale' : `Image ${imageNumber}`;

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
          {!required && <span className="text-gray-400">(Optionnel)</span>}
        </label>
        {!preview ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {imageNumber === 1 ? (
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
              ) : (
                <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
              )}
              <p className="mb-2 text-sm text-gray-500 font-medium">
                Cliquer pour uploader
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, WEBP (max. 5MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(e, imageNumber)}
            />
          </label>
        ) : (
          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-300">
            <img
              src={preview}
              alt={`Preview ${imageNumber}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(imageNumber)}
              className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {errors[`image${imageNumber}`] && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors[`image${imageNumber}`]}
          </p>
        )}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/atelier/produits')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Ajouter un Nouveau Produit</h2>
          <p className="text-sm text-gray-500 mt-1">Remplissez tous les champs pour créer un nouveau bijou</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Images du Produit</h3>
            <p className="text-sm text-gray-500 mb-4">
              Ajoutez jusqu'à 3 images pour montrer différents angles de votre bijou
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ImageUploadBox imageNumber={1} preview={image1Preview} required={true} />
              <ImageUploadBox imageNumber={2} preview={image2Preview} />
              <ImageUploadBox imageNumber={3} preview={image3Preview} />
            </div>
          </div>

          {/* Informations du Produit */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du Produit</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du Produit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Collier Étoile Dorée"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Décrivez le bijou en détail..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Prix */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Prix ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="30"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="24.99"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Maximum 30$</p>
              </div>

              {/* Catégorie */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    errors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="15"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                )}
              </div>

              {/* Réduction */}
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
                  Réduction (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="mt-6 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="text-sm font-medium text-gray-700">Marquer comme "Nouveau"</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={handleChange}
                  className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="text-sm font-medium text-gray-700">Marquer comme "Best Seller"</span>
              </label>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Créer le Produit
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/atelier/produits')}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AtelierProductNew;
