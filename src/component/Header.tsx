import { ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router';
import { useCart } from '../features/ecommerce/hooks';

export default function Header() {
  const { data: cart } = useCart();
  const linkClass = ({ isActive }: { isActive: boolean }) => `rounded-lg px-3 py-2 text-sm font-semibold ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`;
  return <header className="border-b bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4"><NavLink to="/products" className="text-2xl font-bold text-blue-700">SaleShop</NavLink><nav className="flex items-center gap-1" aria-label="Main navigation"><NavLink to="/products" className={linkClass}>Products</NavLink><NavLink to="/orders" className={linkClass}>Orders</NavLink><NavLink to="/cart" className={linkClass}><span className="inline-flex items-center gap-1"><ShoppingCart size={17}/> Cart <span aria-label={`${cart?.totalCount ?? 0} cart items`} className="rounded-full bg-gray-200 px-1.5 text-xs text-gray-900">{cart?.totalCount ?? 0}</span></span></NavLink></nav></div></header>;
}
