import { Link } from 'react-router';
import { useOrders } from '../features/ecommerce/hooks';
import { dateTime, inr } from '../features/ecommerce/format';
import { PageState, StatusBadge } from '../features/ecommerce/ui';

export default function OrdersPage() {
  const { data, loading, error, refetch } = useOrders();
  if (loading) return <PageState>Loading orders…</PageState>;
  if (error) return <PageState><p>{error}</p><button onClick={() => void refetch()} className="mt-3 rounded bg-blue-600 px-4 py-2 text-white">Try again</button></PageState>;
  if (!data?.length) return <PageState><h1 className="text-2xl font-bold text-gray-900">No orders yet</h1><p className="mt-2">When you check out, your orders will appear here.</p><Link to="/products" className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white">Browse products</Link></PageState>;
  return <main className="mx-auto w-full max-w-7xl px-4 py-8"><h1 className="mb-6 text-3xl font-bold">Orders</h1><div className="overflow-x-auto rounded-xl border bg-white"><table className="min-w-[780px] w-full text-left text-sm"><thead className="bg-gray-50 text-gray-600"><tr><th className="p-4">Order ID</th><th className="p-4">Date</th><th className="p-4">Items</th><th className="p-4">Total</th><th className="p-4">Order status</th><th className="p-4">Payment status</th><th className="p-4">Action</th></tr></thead><tbody>{data.map(({ order, items, payment }) => <tr key={order._id} className="border-t"><td className="p-4 font-mono text-xs">#{order._id.slice(-8)}</td><td className="p-4">{dateTime.format(new Date(order.order_date))}</td><td className="p-4">{items.reduce((sum, item) => sum + item.quantity, 0)}</td><td className="p-4 font-semibold">{inr.format(order.total_amount)}</td><td className="p-4"><StatusBadge status={order.status}/></td><td className="p-4"><StatusBadge status={payment?.status ?? 'Pending'}/></td><td className="p-4"><Link className="font-semibold text-blue-700 underline" to={`/orders/${encodeURIComponent(order._id)}`}>View details</Link></td></tr>)}</tbody></table></div></main>;
}
