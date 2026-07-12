import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import AppNavbar from './components/layout/AppNavbar';
import PersistentBackground from './components/common/PersistentBackground';
import { Agentation } from 'agentation';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        {/* Video loads ONCE — persists across all route changes, zero reloads */}
        <PersistentBackground />
        <AppNavbar />
        <AppRoutes />
        {import.meta.env.DEV && (
          <Agentation 
            endpoint="http://localhost:4747" 
            onSessionCreated={(sessionId) => console.log('Session started:', sessionId)}
          />
        )}
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
