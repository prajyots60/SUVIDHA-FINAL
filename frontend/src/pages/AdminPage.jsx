import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import UserList from "../components/UserList";
import MyProfile from "../components/MyProfile";
import AnalyticsTab from "../components/AnalyticsTab";
import { useUserStore } from "../stores/useUserStore"; // Import the user store

const tabs = [
  { id: "profile", label: "My Profile", icon: PlusCircle },
  { id: "products", label: "User Requests", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { user } = useUserStore(); // Retrieve the current user

  if (!user) {
    return <div>Loading user data...</div>; // Handle loading state
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-emerald-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "profile" && <MyProfile id={user._id} />}
        {activeTab === "products" && <UserList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;
