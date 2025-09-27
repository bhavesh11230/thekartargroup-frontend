import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';

// Dummy data for demonstration
const dummyCategories = [
  { _id: '1', name: 'Electronics' },
  { _id: '2', name: 'Fashion' },
  { _id: '3', name: 'Home & Garden' },
  { _id: '4', name: 'Sports & Fitness' },
  { _id: '5', name: 'Books & Media' },
  { _id: '6', name: 'Automotive' },
  { _id: '7', name: 'Health & Beauty' },
  { _id: '8', name: 'Toys & Games' },
];

const dummyProducts = {
  '1': [
    { _id: '1', title: 'Smartphone Pro Max', description: 'Latest flagship smartphone with advanced camera system and 5G connectivity for seamless communication and entertainment', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400', category: '1' },
    { _id: '2', title: 'Wireless Headphones', description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400', category: '1' },
    { _id: '3', title: 'Smart Watch', description: 'Advanced fitness tracking smartwatch with heart rate monitor and GPS functionality', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400', category: '1' },
    { _id: '4', title: 'Laptop Ultra', description: 'High-performance laptop designed for professionals and creators with cutting-edge specifications', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400', category: '1' },
    { _id: '5', title: 'Tablet Pro', description: 'Versatile tablet perfect for work and entertainment with stunning display and long battery life', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400', category: '1' },
    { _id: '6', title: 'Gaming Console', description: 'Next-generation gaming console with 4K graphics and immersive gaming experience', image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400', category: '1' },
    { _id: '7', title: 'Smart TV 65"', description: 'Ultra HD Smart TV with streaming capabilities and crystal-clear picture quality', image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=400', category: '1' },
    { _id: '8', title: 'Bluetooth Speaker', description: 'Portable waterproof speaker with rich sound quality and wireless connectivity', image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400', category: '1' },
  ],
  '2': [
    { _id: '9', title: 'Designer Jacket', description: 'Premium leather jacket with modern styling and exceptional craftsmanship for fashion-forward individuals', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400', category: '2' },
    { _id: '10', title: 'Running Shoes', description: 'Comfortable athletic shoes designed for daily running with superior cushioning and support', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400', category: '2' },
    { _id: '11', title: 'Casual Dress', description: 'Elegant summer dress perfect for casual occasions with comfortable fabric and stylish design', image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400', category: '2' },
    { _id: '12', title: 'Denim Jeans', description: 'Classic fit denim jeans with premium quality material and timeless style for everyday wear', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400', category: '2' },
  ],
  '3': [
    { _id: '13', title: 'Garden Tool Set', description: 'Complete gardening tool set for home gardeners with durable tools for all your gardening needs', image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400', category: '3' },
    { _id: '14', title: 'Outdoor Furniture', description: 'Weather-resistant patio furniture set designed for comfort and durability in outdoor spaces', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400', category: '3' },
    { _id: '15', title: 'Kitchen Appliance', description: 'Multi-function kitchen appliance for modern homes with advanced features and sleek design', image: 'https://images.pexels.com/photos/4686822/pexels-photo-4686822.jpeg?auto=compress&cs=tinysrgb&w=400', category: '3' },
  ],
};

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const ServicesSection: React.FC = () => {
  const [categories] = useState<Category[]>(dummyCategories);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);
  const productsPerPage = 6;

  useEffect(() => {
    // Load products for the selected category
    const categoryProducts = dummyProducts[selectedCategory as keyof typeof dummyProducts] || [];
    setProducts(categoryProducts);
    setCurrentPage(1);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById('products-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('categories-container');
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === 'left' 
        ? Math.max(0, categoryScrollPosition - scrollAmount)
        : categoryScrollPosition + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setCategoryScrollPosition(newPosition);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
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
            Discover our comprehensive range of high-quality products across multiple categories.
          </p>
        </div>

        {/* Category Navigator */}
        <div className="relative mb-12">
          <div className="flex items-center">
            <button
              onClick={() => scrollCategories('left')}
              className="flex-shrink-0 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 mr-4"
            >
              <ChevronLeft className="h-5 w-5 text-kartar-gold" />
            </button>
            
            <div
              id="categories-container"
              className="flex-1 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex space-x-4 pb-2">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category._id)}
                    className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category._id
                        ? 'bg-kartar-gold text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => scrollCategories('right')}
              className="flex-shrink-0 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ml-4"
            >
              <ChevronRight className="h-5 w-5 text-kartar-gold" />
            </button>
          </div>
        </div>

        {/* Products Grid with Scrollbar */}
        <div 
          id="products-grid" 
          className="max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-kartar-gold scrollbar-track-gray-100 pr-2 mb-8"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-kartar-secondary mb-3">
                    {product.title}
                  </h3>
                  
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-kartar-light text-kartar-dark text-sm font-medium rounded-full">
                      {getCategoryName(product.category)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {product.description}
                  </p>
                  
                
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
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
                  onClick={() => typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null}
                  disabled={pageNumber === '...'}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentPage === pageNumber
                      ? 'bg-kartar-gold text-white shadow-md'
                      : pageNumber === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'
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

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No products available in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;