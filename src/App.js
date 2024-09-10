import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: "/",             // Parent route
    element: <Layout />,    // Layout contains the Navbar and Outlet
    children: [            // Nested child routes
      { path: "/", element: <Homepage /> }, 
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <Settings /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
