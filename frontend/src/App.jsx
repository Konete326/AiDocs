import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import AppNavbar from './components/layout/AppNavbar';
import PersistentBackground from './components/common/PersistentBackground';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      {/* Video loads ONCE — persists across all route changes, zero reloads */}
      <PersistentBackground />
      <AppNavbar />
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
