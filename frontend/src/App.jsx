import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import AppNavbar from './components/layout/AppNavbar';
import PersistentBackground from './components/common/PersistentBackground';
import { Toaster } from 'react-hot-toast';
import { Agentation } from 'agentation';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <PersistentBackground />
        <AppNavbar />
        <AppRoutes />
        <Toaster />
        {import.meta.env.DEV && <Agentation />}
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;

