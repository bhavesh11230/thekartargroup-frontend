import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiService } from "../../utils/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  image: { url: string; public_id: string };
  category: {
    _id: string;
    name: string;
  };
}

const ServicesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const productsPerPage = 9;

  // Fetch categories on mount
useEffect(() => {
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await apiService.getCategories();
      const data = res.data?.data || res.data || [];

      // Add a virtual "All" category
      const allCategory = { _id: "all", name: "All" };

      setCategories([allCategory, ...data]);
      setSelectedCategory("all"); // default to "All"
    } catch (error) {
      toast.error("Failed to load categories");
      console.error(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  fetchCategories();
}, []);


  // Fetch products whenever category changes
useEffect(() => {
  if (!selectedCategory) return;

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      let data: any[] = [];

      if (selectedCategory === "all") {
        // Call your all products endpoint
        const res = await apiService.getAllCards(); 
        data = Array.isArray(res.data) ? res.data : res.data.cards || [];
      } else {
        // Category-specific endpoint
        const res = await apiService.getCardsByCategory(selectedCategory);
        data = Array.isArray(res.data) ? res.data : res.data.cards || [];
      }

      console.log("Fetched products:", data);
      setProducts(data);
      setCurrentPage(1);
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  fetchProducts();
}, [selectedCategory]);


  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Pagination
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = Array.isArray(products)
  ? products.slice(indexOfFirstProduct, indexOfLastProduct)
  : [];
const totalPages = Math.ceil(products.length / productsPerPage) || 1;


  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    const element = document.getElementById("products-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollCategories = (direction: "left" | "right") => {
    const container = document.getElementById("categories-container");
    if (container) {
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? Math.max(0, categoryScrollPosition - scrollAmount)
          : categoryScrollPosition + scrollAmount;

      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setCategoryScrollPosition(newPosition);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <section id="services" className="py-20 bg-kartar-cream w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-kartar-gold mb-6">
            Our Products & Services
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality products across
            multiple categories.
          </p>
        </div>

        {/* Category Navigator */}
        {/* Category Navigator */}
<div className="relative mb-12">
  <div className="flex items-center">
    <button
      onClick={() => scrollCategories("left")}
      className="flex-shrink-0 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 mr-4"
    >
      <ChevronLeft className="h-5 w-5 text-[rgb(212,175,55)]" />
    </button>

    <div
      id="categories-container"
      className="flex-1 overflow-x-auto scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex space-x-4 pb-2">
        {loadingCategories ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : (
          categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category._id)}
              className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category._id
                  ? "bg-[rgb(212,175,55)] text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-[rgb(212,175,55)/10] hover:text-[rgb(212,175,55)] shadow-md"
              }`}
            >
              {category.name}
            </button>
          ))
        )}
      </div>
    </div>

    <button
      onClick={() => scrollCategories("right")}
      className="flex-shrink-0 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ml-4"
    >
      <ChevronRight className="h-5 w-5 text-[rgb(212,175,55)]" />
    </button>
  </div>
</div>

{/* Products Grid */}
<div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-10 pr-1 mb-8">
  {loadingProducts ? (
    <p className="text-center text-gray-500 py-12">Loading products...</p>
  ) : currentProducts.length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {currentProducts.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
        >
          <div className="h-56 bg-gray-200 overflow-hidden rounded-t-xl">
            <img
              src={product.image.url}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
         <div className="p-6 flex flex-col min-h-[200px]">
  <div className="flex-grow">
    <h3 className="text-xl font-semibold text-kartar-secondary mb-3 truncate">
      {product.title}
    </h3>

    <div className="mb-4">
      <span className="inline-block px-4 py-1 bg-[rgb(212,175,55)/10] text-[rgb(212,175,55)] text-sm font-semibold rounded-full shadow-sm">
        {product.category?.name || "Unknown Category"}
      </span>
    </div>

    <p className="text-gray-600 leading-relaxed mb-4 text-sm line-clamp-2">
      {product.description}
    </p>
  </div>

  <Link
  to={`/product/${product._id}`}
  className="self-start inline-flex items-center gap-2 px-5 py-2.5 bg-[rgb(212,175,55)] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-[rgb(212,175,55)/80] transition-all duration-300 ease-in-out"
>
  View Details
  <ChevronRight className="w-4 h-4" />
</Link>
</div>

        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg">No products available in this category.</p>
    </div>
  )}
</div>


        {/* Pagination */}
        {!loadingProducts && totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            <div className="flex space-x-1">
              {getPaginationNumbers().map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof pageNumber === "number"
                      ? handlePageChange(pageNumber)
                      : null
                  }
                  disabled={pageNumber === "..."}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentPage === pageNumber
                      ? "bg-[rgb(212,175,55)] text-white shadow-md"
                      : pageNumber === "..."
                      ? "text-gray-400 cursor-default"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
