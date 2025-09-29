import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../../utils/api";
import { toast } from "react-toastify";
import { ChevronLeft } from "lucide-react"; // or your icon library

interface Product {
  _id: string;
  title: string;
  description: string;
  image: { url: string; public_id: string };
  category: { _id: string; name: string };
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await apiService.getCardById(id);
        setProduct(res.data);
      } catch (error) {
        toast.error("Failed to load product details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (!product) return <p className="text-center py-12">Product not found</p>;

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-[rgb(212,175,55)] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-[rgb(212,175,55)/80] transition-all duration-300 ease-in-out"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      {/* Product Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-kartar-secondary mb-6">
          {product.title}
        </h1>

        <div className="w-full h-56 bg-gray-100 rounded-t-xl overflow-hidden flex items-center justify-center">
  <img
    src={product.image.url}
    alt={product.title}
    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
  />
</div>



        <div className="mb-4">
          <span className="inline-block px-4 py-1 bg-[rgb(212,175,55)/10] text-[rgb(212,175,55)] text-sm font-semibold rounded-full shadow-sm">
            {product.category?.name}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed text-sm">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
