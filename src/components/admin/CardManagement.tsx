import React, { useState, useEffect } from "react";
import { apiService } from "../../utils/api";
import { toast } from "react-toastify";
import {
  Plus,
  CreditCard as Edit2,
  Trash2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

// --- Helper Component for the Confirmation Toast ---
const ConfirmToast = ({ closeToast, onConfirm, message }: any) => (
  <div>
    <p className="font-semibold">{message}</p>
    <div className="flex justify-end space-x-2 mt-3">
      <button
        onClick={() => {
          onConfirm();
          closeToast();
        }}
        className="px-4 py-1.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
      <button
        onClick={closeToast}
        className="px-4 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Cancel
      </button>
    </div>
  </div>
);

// --- Interface Definitions ---
interface Card {
  _id: string;
  title: string;
  description: string;
  images: { public_id: string; url: string }[];
  category: {
    _id: string;
    name: string;
  };
}

interface Category {
  _id: string;
  name: string;
}

// --- Main Component ---
const CardManagement: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [] as File[],
  });
  const [oldImageName, setOldImageName] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    cardId?: string;
    title?: string;
  }>({ open: false });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cardsResponse, categoriesResponse] = await Promise.all([
        apiService.getAllCards(),
        apiService.getCategories(),
      ]);
      setCards(cardsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
      setOldImageName(files.map((f) => f.name).join(", "));
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "", images: [] });
    setOldImageName("");
    setEditingCard(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!editingCard && formData.images.length === 0) {
      toast.error("Please upload at least one image for a new card.");
      return;
    }

    try {
      setSubmitting(true);
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("category", formData.category);
      formData.images.forEach((file) => formDataObj.append("images", file));

      if (editingCard) {
        await apiService.updateCard(editingCard._id, formDataObj);
        toast.success("Card updated successfully");
      } else {
        await apiService.createCard(formDataObj);
        toast.success("Card created successfully");
      }

      resetForm();
      fetchData();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(
        editingCard
          ? `Update failed: ${errorMessage}`
          : `Creation failed: ${errorMessage}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (card: Card) => {
    setEditingCard(card);
    setFormData({
      title: card.title,
      description: card.description,
      category: card.category._id,
      images: [],
    });
    setOldImageName("");
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingCardId(id);
      await apiService.deleteCard(id);
      toast.success("Card deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card");
    } finally {
      setDeletingCardId(null);
    }
  };

  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

  const handleDeleteImage = (cardId: string, imagePublicId: string) => {
    if (!cardId || !imagePublicId) return;

    // This function contains the logic to run after confirmation
    const performDelete = async () => {
      try {
        setDeletingImageId(imagePublicId);
        await apiService.deleteCardImages(cardId, [imagePublicId]);
        toast.success("Image deleted successfully");

        // Update both states for real-time update
        setCards((prev) =>
          prev.map((card) =>
            card._id === cardId
              ? {
                  ...card,
                  images: card.images.filter(
                    (img) => img.public_id !== imagePublicId
                  ),
                }
              : card
          )
        );

        if (editingCard && editingCard._id === cardId) {
          setEditingCard((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              images: prev.images.filter(
                (img) => img.public_id !== imagePublicId
              ),
            };
          });
        }
      } catch (error: any) {
        console.error("Error deleting image:", error);
        toast.error(
          `Failed to delete image: ${
            error.response?.data?.message || "Server error"
          }`
        );
      } finally {
        setDeletingImageId(null);
      }
    };

    // Show the confirmation toast
    toast.warning(
      ({ closeToast }) => (
        <ConfirmToast
          closeToast={closeToast}
          onConfirm={performDelete}
          message="Are you sure you want to delete this image?"
        />
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-kartar-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-kartar-gold">
            Product/Service Management
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-kartar-gold text-white rounded-lg hover:bg-kartar-dark transition-colors duration-300"
          >
            <Plus className="h-4 w-4" />
            <span>Add New</span>
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-kartar-gold mb-4">
                {editingCard
                  ? "Edit Product/Service"
                  : "Add New Product/Service"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields remain the same */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kartar-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Minimum 10 characters required..."
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kartar-gold focus:border-transparent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kartar-gold focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images {editingCard ? "(Add more)" : "*"}
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingCard}
                    className="w-full"
                  />
                  {oldImageName && (
                    <p className="text-gray-500 text-sm mt-1">
                      {oldImageName}
                    </p>
                  )}
                  {!editingCard && (
                    <p className="text-gray-400 text-xs mt-1">
                      At least one image is required
                    </p>
                  )}
                </div>

                {editingCard && editingCard.images.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing Images
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {editingCard.images.map((img) => (
                        <div key={img.public_id} className="relative">
                          <img
                            src={img.url}
                            alt={editingCard.title}
                            className={`w-24 h-24 object-cover rounded-lg border ${
                              deletingImageId === img.public_id
                                ? "opacity-50"
                                : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteImage(editingCard._id, img.public_id)
                            }
                            disabled={deletingImageId === img.public_id}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingImageId === img.public_id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              "×"
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={submitting}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-lg bg-kartar-gold text-white hover:bg-kartar-dark transition disabled:opacity-50 flex items-center space-x-2"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>{submitting ? "Saving..." : "Save"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cards Grid remains the same */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-white rounded-lg shadow-md p-4 relative"
            >
              <div
  className={`grid ${
    card.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
  } gap-1 h-48 overflow-hidden rounded-lg`}
>
  {card.images && card.images.length > 0 ? (
    card.images.slice(0, 4).map((img) => (
      <img
        key={img.public_id}
        src={img.url}
        alt={card.title}
        className="w-full h-full object-cover"
      />
    ))
  ) : (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 col-span-2">
      <ImageIcon className="h-12 w-12 text-gray-400" />
    </div>
  )}
</div>

              <h3 className="text-lg font-semibold mt-3">{card.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {card.description}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Category: {card.category?.name || "N/A"}
              </p>
              <div className="flex space-x-2 mt-3">
  <button
    onClick={() => handleEdit(card)}
    className="flex-1 flex items-center justify-center space-x-1 px-2 py-1  text-blue-600  "
  >
    <Edit2 className="h-4 w-4" />
    <span>Edit</span>
  </button>
  <button
    onClick={() =>
      setDeleteConfirm({
        open: true,
        cardId: card._id,
        title: card.title,
      })
    }
    disabled={deletingCardId === card._id}
    className="flex-1 flex items-center justify-center space-x-1 px-2 py-1  text-red-600"
  >
    {deletingCardId === card._id ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : (
      <>
        <Trash2 className="h-4 w-4" />
        <span>Delete</span>
      </>
    )}
  </button>
</div>

            </div>
          ))}
        </div>

        {cards.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p>No products/services found. Add your first one!</p>
          </div>
        )}

        {/* Delete Confirmation remains the same */}
        {deleteConfirm.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
              <p className="text-lg font-medium mb-4">
                Are you sure you want to delete{" "}
                <strong>{deleteConfirm.title}</strong>?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setDeleteConfirm({ open: false })}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (deleteConfirm.cardId) handleDelete(deleteConfirm.cardId);
                    setDeleteConfirm({ open: false });
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardManagement;