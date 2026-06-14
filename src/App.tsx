import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Components
import PublicWebsite from './components/public/PublicWebsite';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Route */}

          <h1 className="text-4xl font-bold text-blue-700 mb-4">
  Website Under Maintenance
</h1>

<p className="text-gray-700 text-lg">
  The website is currently under development and maintenance.
  We are working to provide an improved experience.
</p>

<p className="text-gray-600 mt-3">
  Please check back again shortly.
</p>
        </Routes>
        
        {/* <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="toast-container"
        /> */}
      </div>
    </Router>
  );
}

export default App;
