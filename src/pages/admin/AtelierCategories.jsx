import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../services/firebase/categoryService';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Tag,
  Loader
} from 'lucide-react';

const AtelierCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [adding, setAdding] = useState(false);

  // Charger les catégories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await getAllCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des catégories');
    } finally {
      setLoading(false);
    }
  };

  // Ajouter une nouvelle catégorie
  const handleAdd = async () => {
    if (!newCategoryName.trim()) {
      alert('Le nom de la catégorie est requis');
      return;
    }

    setAdding(true);
    try {
      const newCategory = {
        name: newCategoryName.trim(),
        order: categories.length
      };
      await createCategory(newCategory);
      setNewCategoryName('');
      await loadCategories();
      alert('Catégorie ajoutée avec succès!');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout de la catégorie');
    } finally {
      setAdding(false);
    }
  };

  // Modifier une catégorie
  const handleEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const handleSaveEdit = async (categoryId) => {
    if (!editingName.trim()) {
      alert('Le nom de la catégorie est requis');
      return;
    }

    try {
      await updateCategory(categoryId, { name: editingName.trim() });
      setEditingId(null);
      setEditingName('');
      await loadCategories();
      alert('Catégorie modifiée avec succès!');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la modification');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  // Supprimer une catégorie
  const handleDelete = async (categoryId, categoryName) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryName}" ?`)) {
      try {
        await deleteCategory(categoryId);
        await loadCategories();
        alert('Catégorie supprimée avec succès!');
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h2>
          <p className="text-sm text-gray-500 mt-1">
            Gérez les catégories de produits de votre boutique
          </p>
        </div>

        {/* Formulaire d'ajout */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ajouter une Nouvelle Catégorie
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Nom de la catégorie"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={handleAdd}
              disabled={adding || !newCategoryName.trim()}
              className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adding ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              Ajouter
            </button>
          </div>
        </div>

        {/* Liste des catégories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-yellow-600 animate-spin" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Aucune catégorie pour le moment</p>
              <p className="text-sm text-gray-400 mt-1">Ajoutez votre première catégorie ci-dessus</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  {editingId === category.id ? (
                    // Mode édition
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(category.id)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(category.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Sauvegarder"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Annuler"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    // Mode affichage
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Tag className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{category.name}</p>
                          <p className="text-xs text-gray-500">ID: {category.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id, category.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note :</strong> Les catégories sont utilisées pour organiser vos produits. Vous pouvez les modifier ou les supprimer à tout moment.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AtelierCategories;
