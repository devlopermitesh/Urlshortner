import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { apiErrorMessage, ecommerceApi } from '../features/ecommerce/api';
import { useCart } from '../features/ecommerce/hooks';
import { inr } from '../features/ecommerce/format';
import { PageState } from '../features/ecommerce/ui';

export default function CartPage() {
  const { data:cart, loading, error, refetch } = useCart();
  console.log("data",cart)
  const [updating, setUpdating] = useState<string | null>(null);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'confirming' | 'creating'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  async function changeQuantity(itemId: string, direction: 'add' | 'remove') {
    setUpdating(itemId); setMessage(null);
    try { if (direction === 'add') await ecommerceApi.addToCart(itemId); else await ecommerceApi.removeFromCart(itemId); await refetch(); setMessage('Cart updated.'); }
    catch (requestError) { setMessage(apiErrorMessage(requestError)); }
    finally { setUpdating(null); }
  }
  async function checkout() {
    setCheckoutState('creating'); setMessage(null);
    try { const order = await ecommerceApi.createOrder(); await refetch(); navigate(`/orders/${encodeURIComponent(order.order._id)}`); }
    catch (requestError) { setMessage(apiErrorMessage(requestError)); setCheckoutState('idle'); }
  }
  if (loading) return <PageState>Loading cart…</PageState>;
  if (error) return <PageState><p>{error}</p><button onClick={() => void refetch()} className="mt-3 rounded bg-blue-600 px-4 py-2 text-white">Try again</button></PageState>;
  const items = cart?.data ?? [];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const invalidStock = items.some((item) => item.quantity > item.stock);
  return <main className="mx-auto w-full max-w-7xl px-4 py-8"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-3xl font-bold">Shopping cart</h1><p className="mt-1 text-gray-600">{cart?.totalCount ?? 0} item{(cart?.totalCount ?? 0) === 1 ? '' : 's'} in your cart</p></div><Link to="/products" className="rounded border px-4 py-2 font-semibold">Continue shopping</Link></div>{message && <p role="status" className="mb-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">{message}</p>}{items.length === 0 ? <PageState><p>Your cart is empty.</p><Link to="/products" className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white">Browse products</Link></PageState> : <div className="grid gap-6 lg:grid-cols-[1fr_320px]"><div className="overflow-x-auto rounded-xl border bg-white"><table className="min-w-[760px] w-full text-left"><thead className="bg-gray-50 text-sm text-gray-600"><tr><th className="p-4">Product</th><th className="p-4">Unit price</th><th className="p-4">Quantity</th><th className="p-4">Stock</th><th className="p-4">Line total</th><th className="p-4">Actions</th></tr></thead><tbody>{items.map((item) => <tr key={item.item_id} className="border-t"><td className="p-4"><div className="flex items-center gap-3"><img src={item.product_image} alt="" className="h-14 w-14 rounded object-cover"/><div><p className="font-semibold">{item.product_name}</p><p className="max-w-44 truncate text-sm text-gray-500">{item.product_description}</p></div></div></td><td className="p-4">{inr.format(item.price)}</td><td className="p-4"><div className="flex items-center gap-2"><button aria-label={`Remove one ${item.product_name}`} disabled={updating === item.item_id} onClick={() => void changeQuantity(item.item_id, 'remove')} className="rounded border p-1.5 disabled:opacity-50"><Minus size={16}/></button><span className="w-7 text-center font-semibold">{item.quantity}</span><button aria-label={`Add one ${item.product_name}`} disabled={updating === item.item_id || item.quantity >= item.stock} onClick={() => void changeQuantity(item.item_id, 'add')} className="rounded border p-1.5 disabled:opacity-50"><Plus size={16}/></button></div></td><td className={`p-4 ${item.quantity > item.stock ? 'font-semibold text-red-700' : ''}`}>{item.stock}{item.quantity > item.stock && ' — insufficient'}</td><td className="p-4 font-semibold">{inr.format(item.price * item.quantity)}</td><td className="p-4"><button aria-label={`Remove one ${item.product_name}`} disabled={updating === item.item_id} onClick={() => void changeQuantity(item.item_id, 'remove')} className="inline-flex items-center gap-1 text-sm font-semibold text-red-700 disabled:opacity-50"><Trash2 size={16}/> Remove one</button></td></tr>)}</tbody></table></div><aside className="h-fit rounded-xl border bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">Order summary</h2><dl className="mt-5 space-y-3"><div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold">{inr.format(subtotal)}</dd></div><div className="flex justify-between border-t pt-3 text-lg font-bold"><dt>Total</dt><dd>{inr.format(subtotal)}</dd></div></dl>{invalidStock && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-800">Update quantities to match available stock before checkout.</p>}{checkoutState === 'confirming' ? <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm"><p className="mb-3">Create an order from every item in this cart?</p><div className="flex gap-2"><button onClick={() => void checkout()} className="rounded bg-blue-600 px-3 py-2 font-semibold text-white">Confirm order</button><button onClick={() => setCheckoutState('idle')} className="rounded border px-3 py-2">Cancel</button></div></div> : <button disabled={invalidStock || checkoutState === 'creating'} onClick={() => setCheckoutState('confirming')} className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">{checkoutState === 'creating' ? 'Creating order…' : 'Checkout'}</button>}</aside></div>}</main>;
}
