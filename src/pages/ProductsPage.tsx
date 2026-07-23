import { Search, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { apiErrorMessage, ecommerceApi } from '../features/ecommerce/api';
import { useProducts } from '../features/ecommerce/hooks';
import { inr } from '../features/ecommerce/format';
import { PageState } from '../features/ecommerce/ui';

export default function ProductsPage() {
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState<string | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const { data, loading, error, refetch } = useProducts(page, query);

  useEffect(() => {
    const timer = window.setTimeout(() => { setPage(1); setQuery(searchInput); }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  async function add(itemId: string) {
    setAdding(itemId); setMessage(null);
    try { await ecommerceApi.addToCart(itemId); setMessage('Added to cart.'); }
    catch (requestError) { setMessage(apiErrorMessage(requestError)); }
    finally { setAdding(null); }
  }

  if (loading && !data) return <PageState>Loading products…</PageState>;
  if (error) return <PageState><p>{error}</p><button onClick={() => void refetch()} className="mt-3 rounded bg-blue-600 px-4 py-2 text-white">Try again</button></PageState>;
  const products = data?.data ?? [];
  const pagination = data?.pagination;
  return <main className="mx-auto w-full max-w-7xl px-4 py-8">
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><h1 className="text-3xl font-bold text-gray-900">Products</h1><p className="mt-1 text-gray-600">Browse and add items to your cart.</p></div>
      <div className="relative w-full sm:max-w-sm"><Search className="absolute left-3 top-3 text-gray-400" size={19}/><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} aria-label="Search products" placeholder="Search products" className="w-full rounded-lg border py-2.5 pl-10 pr-3"/></div>
    </div>
    {message && <p role="status" className="mb-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">{message}</p>}
    {products.length === 0 ? <PageState>No products found.</PageState> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => <article key={product._id} className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
        <img src={product.product_image} alt={product.product_name} className="h-48 w-full bg-gray-100 object-cover" onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}/>
        <div className="flex flex-1 flex-col p-4"><h2 className="text-lg font-semibold text-gray-900">{product.product_name}</h2><p className="mt-1 line-clamp-2 flex-1 text-sm text-gray-600">{product.product_description}</p><div className="mt-4 flex items-center justify-between"><strong className="text-lg">{inr.format(product.price)}</strong><span className={`text-sm font-medium ${product.stock > 0 ? 'text-emerald-700' : 'text-red-700'}`}>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span></div><button onClick={() => void add(product._id)} disabled={product.stock <= 0 || adding === product._id} className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"><ShoppingCart size={17}/>{adding === product._id ? 'Adding…' : 'Add to cart'}</button></div>
      </article>)}
    </div>}
    {pagination && pagination.totalPages > 1 && <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Product pages"><button disabled={!pagination.hasPrevPage} onClick={() => setPage((value) => value - 1)} className="rounded border px-4 py-2 disabled:opacity-40">Previous</button><span>Page {pagination.currentPage} of {pagination.totalPages}</span><button disabled={!pagination.hasNextPage} onClick={() => setPage((value) => value + 1)} className="rounded border px-4 py-2 disabled:opacity-40">Next</button></nav>}
    <Link to="/cart" className="fixed bottom-5 right-5 rounded-full bg-gray-900 px-5 py-3 font-semibold text-white shadow-lg">View cart</Link>
  </main>;
}
