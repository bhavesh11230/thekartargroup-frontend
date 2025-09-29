import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, FolderOpen, Package, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

import CategoryManagement from "./CategoryManagement";
import CardManagement from "./CardManagement";
import ContactManagement from "./ContactManagement";

type ActiveTab = "categories" | "cards" | "contacts";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("categories");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const tabs = [
    { id: "categories" as ActiveTab, label: "Categories", icon: FolderOpen },
    { id: "cards" as ActiveTab, label: "Products/Services", icon: Package },
    { id: "contacts" as ActiveTab, label: "Contact Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-kartar-cream">
      {/* Header */}
     <header className="bg-white shadow-sm border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 space-y-3 sm:space-y-0">
      {/* Logo & Title */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo-no-background copy.png"
          alt="Kartar Group Logo"
          className="h-12 w-12 sm:h-10 sm:w-10"
        />
        <h1 className="text-lg sm:text-2xl font-bold text-kartar-gold text-center sm:text-left">
          Kartar Group Admin
        </h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 text-sm sm:text-base"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  </div>
</header>


      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto sm:overflow-visible space-x-4 sm:space-x-8 no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center flex-shrink-0 space-x-2 py-3 sm:py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "border-kartar-gold text-kartar-gold"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "categories" && <CategoryManagement />}
        {activeTab === "cards" && <CardManagement />}
        {activeTab === "contacts" && <ContactManagement />}
      </main>
    </div>
  );
};

export default AdminDashboard;
