import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import AppNavbar from './components/layout/AppNavbar';
import PersistentBackground from './components/common/PersistentBackground';
import { Toaster, toast } from 'react-hot-toast';
import { AlertToast } from './components/ui/alert-toast';
import { Agentation } from 'agentation';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <PersistentBackground />
        <AppNavbar />
        <AppRoutes />
        <Toaster position="top-right" containerStyle={{ top: 75, right: 20 }}>
          {(t) => {
            let variant = 'info';
            if (t.type === 'error') variant = 'error';
            if (t.type === 'success') variant = 'success';

            const messageText = typeof t.message === 'function' ? t.message(t) : t.message;

            return (
              <AlertToast
                variant={variant}
                styleVariant="filled"
                title={t.title || (variant === 'error' ? 'Error Alert' : variant === 'success' ? 'Success' : 'Notice')}
                description={typeof messageText === 'string' ? messageText : ''}
                onClose={() => toast.dismiss(t.id)}
              />
            );
          }}
        </Toaster>
        {import.meta.env.DEV && <Agentation />}
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;

