import { ArrowLeft, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { apiErrorMessage, ecommerceApi } from '../features/ecommerce/api';
import { useOrder } from '../features/ecommerce/hooks';
import { dateTime, inr } from '../features/ecommerce/format';
import { PageState, StatusBadge } from '../features/ecommerce/ui';
import type { Product } from '../features/ecommerce/types';

function productFor(item: { item_id: Product | string | null }): Product | null { return item.item_id && typeof item.item_id !== 'string' ? item.item_id : null; }
export default function OrderDetailsPage() {
  const { orderId } = useParams(); const { data, loading, error, refetch } = useOrder(orderId); const [paying, setPaying] = useState(false); const [message, setMessage] = useState<string | null>(null);
  async function pay() { if (!orderId) return; setPaying(true); setMessage(null); try { await ecommerceApi.completePayment(orderId); await refetch(); setMessage('Test payment completed successfully.'); } catch (requestError) { setMessage(apiErrorMessage(requestError)); } finally { setPaying(false); } }
  if (loading) return <PageState>Loading order…</PageState>;
  if (error || !data) return <PageState><h1 className="text-2xl font-bold text-gray-900">Order not found</h1><p className="mt-2">This order may not exist or may not belong to your account.</p><Link to="/orders" className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white">Back to orders</Link></PageState>;
  const { order, items, payment } = data; const isPaid = payment?.status === 'Paid'; const canPay = order.status !== 'Cancelled' && !isPaid;

  function formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '—';
      return dateTime.format(d);
    } catch {
      return '—';
    }
  }
  return <main className="mx-auto w-full max-w-6xl px-4 py-8"><Link to="/orders" className="mb-5 inline-flex items-center gap-1 font-semibold text-blue-700"><ArrowLeft size={17}/> Back to orders</Link><div className="flex flex-col gap-4 rounded-xl border bg-white p-5 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="text-2xl font-bold">Order #{order._id.slice(-8)}</h1><p className="mt-1 text-gray-600">Placed {formatDate(order.order_date)}</p></div><div className="flex gap-2"><StatusBadge status={order.status}/><StatusBadge status={payment?.status ?? 'Pending'}/></div></div>{message && <p role="status" className="mt-4 rounded bg-emerald-50 px-4 py-3 text-emerald-800">{message}</p>}<section className="mt-6 overflow-x-auto rounded-xl border bg-white"><table className="min-w-[640px] w-full text-left"><thead className="bg-gray-50 text-sm text-gray-600"><tr><th className="p-4">Product</th><th className="p-4">Unit price</th><th className="p-4">Quantity</th><th className="p-4">Line total</th></tr></thead><tbody>{items.map((item) => { const product = productFor(item); return <tr key={item._id} className="border-t"><td className="p-4"><div className="flex items-center gap-3">{product?.product_image && <img src={product.product_image} alt={product.product_name} className="h-12 w-12 rounded object-cover"/>}<span className="font-semibold">{product?.product_name ?? 'Product no longer available'}</span></div></td><td className="p-4">{inr.format(item.price)}</td><td className="p-4">{item.quantity}</td><td className="p-4 font-semibold">{inr.format(item.price * item.quantity)}</td></tr>; })}</tbody></table></section><div className="mt-6 grid gap-6 md:grid-cols-2"><section className="rounded-xl border bg-white p-5"><h2 className="text-xl font-bold">Summary</h2><div className="mt-5 flex justify-between border-t pt-4 text-lg font-bold"><span>Total</span><span>{inr.format(order.total_amount)}</span></div></section><section className="rounded-xl border bg-white p-5"><h2 className="text-xl font-bold">Payment</h2>{isPaid && payment ? <div className="mt-4 space-y-1 text-sm"><p><b>Status:</b> Paid</p><p><b>Provider:</b> {payment.payment_provider}</p><p><b>Method:</b> {payment.payment_method}</p>{payment.provider_payment_id && <p><b>Reference:</b> {payment.provider_payment_id}</p>}{payment.paid_at && <p><b>Paid:</b> {dateTime.format(new Date(payment.paid_at))}</p>}<p><b>Amount:</b> {inr.format(payment.amount)}</p></div> : canPay ? <><p className="mt-2 text-sm text-gray-600">Use the backend test flow to complete this payment.</p><button onClick={() => void pay()} disabled={paying} className="mt-4 inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2.5 font-semibold text-white disabled:bg-gray-400"><CreditCard size={17}/>{paying ? 'Completing payment…' : 'Complete test payment'}</button></> : <p className="mt-3 text-sm text-gray-600">Payment is unavailable for this cancelled order.</p>}</section></div></main>;
}
