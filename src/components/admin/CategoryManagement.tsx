import React, { useState, useEffect } from 'react';
import { apiService } from '../../utils/api';
import { toast } from 'react-toastify';
import { Plus, Trash2, Loader2 } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);

  // Modal states
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = newCategoryName.trim();
    if (!trimmedName) {
      toast.error('Please enter a category name');
      return;
    }

    const exists = categories.some(
      (cat) => cat.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (exists) {
      toast.error('Category already exists');
      return;
    }

    try {
      setCreating(true);
      await apiService.createCategory({ name: trimmedName });
      toast.success('Category created successfully');
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category');
    } finally {
      setCreating(false);
    }
  };

  const confirmDelete = (category: Category) => {
    setSelectedCategory(category);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      setDeletingCategoryId(selectedCategory._id);
      await apiService.deleteCategory(selectedCategory._id);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    } finally {
      setDeletingCategoryId(null);
      setShowDialog(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-kartar-gold mb-6">
          Category Management
        </h2>

        {/* Add New Category Form */}
        <form onSubmit={handleCreate} className="flex gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kartar-gold focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="flex items-center space-x-2 px-6 py-2 bg-kartar-gold text-white rounded-lg hover:bg-kartar-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            <span>{creating ? 'Creating...' : 'Add Category'}</span>
          </button>
        </form>

        {/* Categories List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-kartar-gold" />
          </div>
        ) : (
          <div className="space-y-2">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No categories found. Create your first category above.
              </p>
            ) : (
              categories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-800">{category.name}</span>
                  <button
                    onClick={() => confirmDelete(category)}
                    className="flex items-center space-x-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDialog && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the category{' '}
              <span className="font-medium">{selectedCategory.name}</span>?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center"
                disabled={deletingCategoryId === selectedCategory._id}
              >
                {deletingCategoryId === selectedCategory._id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
