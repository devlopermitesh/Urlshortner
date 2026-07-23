import { Outlet } from 'react-router';
import Footer from './component/Footer';
import Header from './component/Header';
import ProtectedRoute from './component/ProtectedWrapper';

export default function Layout() {
  return <ProtectedRoute><section className="flex min-h-screen flex-col bg-gray-50"><Header/><div className="flex-1"><Outlet/></div><Footer/></section></ProtectedRoute>;
}
