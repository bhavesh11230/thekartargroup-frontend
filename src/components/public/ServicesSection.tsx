import React, { useState, useEffect } from "react";
import { apiService } from "../../utils/api";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  title: string;
  description: string;
  image: { url: string; public_id: string };
  category?: {
    _id: string;
    name: string;
  };
}

const ServicesSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<{ [key: string]: number }>({});

  // Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await apiService.getAllCards();
        const data = Array.isArray(res.data) ? res.data : res.data.cards || [];
        setProducts(data);
      } catch (error) {
        toast.error("Failed to load products");
        console.error(error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Group products by category
  const groupedByCategory: Record<string, Product[]> = products.reduce(
    (acc, product) => {
      const categoryName = product.category?.name || "Uncategorized";
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );

  // Handle hover to cycle images
  const handleMouseEnter = (category: string) => {
    const interval = setInterval(() => {
      setHoverIndex((prev) => {
        const total = groupedByCategory[category]?.length || 1;
        const currentIndex = prev[category] || 0;
        return { ...prev, [category]: (currentIndex + 1) % total };
      });
    }, 1500);

    (window as any)[`${category}-interval`] = interval;
  };

  const handleMouseLeave = (category: string) => {
    setHoverIndex((prev) => ({ ...prev, [category]: 0 }));
    clearInterval((window as any)[`${category}-interval`]);
  };

  return (
    <section id="services" className="py-20 bg-kartar-cream w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-kartar-gold mb-6">
            Our Products & Services
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our exclusive categories — hover to see more from each one.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          {loadingProducts ? (
            <p className="text-center text-gray-500 py-12">
              Loading products...
            </p>
          ) : Object.keys(groupedByCategory).length > 0 ? (
            <div
              id="products-grid"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Object.entries(groupedByCategory).map(([category, items]) => {
                const currentIndex = hoverIndex[category] || 0;
                const currentProduct = items[currentIndex];

                return (
                  <div
                    key={category}
                    onMouseEnter={() => handleMouseEnter(category)}
                    onMouseLeave={() => handleMouseLeave(category)}
                    className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="h-60 w-full overflow-hidden relative">
                      <img
                        src={currentProduct.image.url}
                        alt={currentProduct.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500"></div>
                    </div>

                    {/* Card content */}
                    <div className="p-6 text-center flex flex-col justify-between h-[180px]">
                      <div>
                        <h3 className="text-xl font-semibold text-kartar-secondary mb-2">
                          {category}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                          {currentProduct.description}
                        </p>
                      </div>

                      {/* Small indicators for extra products */}
                      {items.length > 1 && (
                        <div className="flex justify-center mt-4 space-x-1">
                          {items.map((_, i) => (
                            <span
                              key={i}
                              className={`h-2 w-2 rounded-full ${
                                i === currentIndex
                                  ? "bg-[rgb(212,175,55)]"
                                  : "bg-gray-300"
                              }`}
                            ></span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
