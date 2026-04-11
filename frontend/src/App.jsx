import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import AppNavbar from './components/layout/AppNavbar';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppNavbar />
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;

