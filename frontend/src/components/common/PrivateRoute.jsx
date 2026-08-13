import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export default function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E0E5EC] flex items-center justify-center relative z-50">
        <LoadingSpinner size="lg" label="Authenticating Account..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (shouldRedirect) {
      return <Navigate to="/login" replace />;
    }
    return (
      <div className="min-h-screen bg-[#E0E5EC] pt-24 px-8 max-w-6xl mx-auto space-y-6 animate-pulse select-none">
        <div className="h-10 bg-[#3D4852]/10 rounded-2xl w-1/3 neumorphic-inset" />
        <div className="h-64 bg-[#3D4852]/10 rounded-3xl neumorphic-card" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-32 bg-[#3D4852]/10 rounded-2xl neumorphic-inset" />
          <div className="h-32 bg-[#3D4852]/10 rounded-2xl neumorphic-inset" />
          <div className="h-32 bg-[#3D4852]/10 rounded-2xl neumorphic-inset" />
        </div>
      </div>
    );
  }

  return <Outlet />;
}
