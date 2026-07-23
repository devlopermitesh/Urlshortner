import { useEffect, useState } from "react"
import { useDebounce } from "../utils/useDebounce";
import { api } from "../utils/api";
import { NavLink } from "react-router";
import { ShoppingCart } from "lucide-react";
import type { Product } from '../features/ecommerce/types';
interface SubheaderProps{
    setProducts:React.Dispatch<React.SetStateAction<Product[]>>
}
export const Subheader=({setProducts}:SubheaderProps)=>{
    const [searchTerm, setSearchTerm] = useState('');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    (async()=>{
    if (debouncedSearchTerm) {
const response=await api.get('/items/search', {
      params: {
        q: debouncedSearchTerm
      }})
      setProducts(response.data.data)
    }
    })()
  }, [debouncedSearchTerm, setProducts])
    return (
      <div className="mx-auto mb-8 flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
      <span className="inline-block animate-wave origin-[70%_70%]">
        👋
      </span>
      Welcome to our Online Store
    </h1>

    <p className="mt-1 text-sm text-gray-500">
      Discover amazing products at the best prices.
    </p>
  </div>

  <div className="w-full md:max-w-sm">
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />
  </div>
<NavLink
  to="/cart"
  className={({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`
  }
>
  <ShoppingCart size={20} />
  <span>Carts</span>
</NavLink>
</div>
    )
}
