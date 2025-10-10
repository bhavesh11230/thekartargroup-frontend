import React, { useState, useEffect, useRef } from "react";
import { apiService } from "../../utils/api";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  title: string;
  description: string;
  images: { url: string; public_id: string }[];
  category?: {
    _id: string;
    name: string;
  };
}

const ServicesSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<{ [key: string]: number }>({});
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

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

  const groupedByCategory: Record<string, Product[]> = products.reduce(
    (acc, product) => {
      const categoryName = product.category?.name || "Uncategorized";
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );

  const handleMouseEnter = (category: string) => {
    if (intervalRefs.current[category]) return;
    intervalRefs.current[category] = setInterval(() => {
      setHoverIndex((prev) => {
        const totalImages =
          groupedByCategory[category]?.flatMap((item) => item.images).length || 1;
        const currentIndex = prev[category] || 0;
        return { ...prev, [category]: (currentIndex + 1) % totalImages };
      });
    }, 1500);
  };

  const handleMouseLeave = (category: string) => {
    clearInterval(intervalRefs.current[category]);
    intervalRefs.current[category] = undefined!;
    setHoverIndex((prev) => ({ ...prev, [category]: 0 }));
  };

  return (
    <section id="services" className="pt-10 pb-20 bg-kartar-cream w-full scroll-mt-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-kartar-gold mb-6">
            Product Portfolio
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our exclusive categories — hover on any card to see more from that category.
          </p>
        </div>

        <div className="mb-8">
          {loadingProducts ? (
            <p className="text-center text-gray-500 py-12">Loading products...</p>
          ) : Object.keys(groupedByCategory).length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(groupedByCategory).map(([category, items]) => {
                const allImages = items.flatMap((item) => item.images || []);
                const currentIndex = hoverIndex[category] || 0;

                return (
                  <div
                    key={category}
                    className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(category)}
                    onMouseLeave={() => handleMouseLeave(category)}
                  >
                    <div className="h-60 w-full overflow-hidden relative">
                      {allImages.map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          alt={category}
                          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                            i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                          }`}
                        />
                      ))}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-500"></div>
                    </div>

                    <div className="p-6 text-center flex flex-col justify-between h-[120px]">
                      <h3 className="text-xl font-semibold text-kartar-secondary hover:text-kartar-gold transition-colors duration-300">
                        {category}
                      </h3>

                      {allImages.length > 1 && (
                        <div className="flex justify-center mt-4 space-x-1">
                          {allImages.map((_, i) => (
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
              <p className="text-gray-600 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
