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
    
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    try {
      setCreating(true);
      await apiService.createCategory({ name: newCategoryName.trim() });
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

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      return;
    }

    try {
      await apiService.deleteCategory(id);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-kartar-gold mb-6">Category Management</h2>

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
            {creating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
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
              <p className="text-gray-500 text-center py-8">No categories found. Create your first category above.</p>
            ) : (
              categories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-800">{category.name}</span>
                  <button
                    onClick={() => handleDelete(category._id, category.name)}
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
    </div>
  );
};

export default CategoryManagement;