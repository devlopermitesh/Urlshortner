import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { api } from '../utils/api';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [state, setState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const location = useLocation();
  useEffect(() => { let active = true; void api.get('/users/current-user').then(() => { if (active) setState('authenticated'); }).catch(() => { if (active) setState('unauthenticated'); }); return () => { active = false; }; }, []);
  if (state === 'loading') return <div className="p-10 text-center text-gray-600">Checking your session…</div>;
  return state === 'authenticated' ? <>{children}</> : <Navigate to="/login" replace state={{ from: location.pathname + location.search }}/>; 
}
