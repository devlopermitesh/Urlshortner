import type { ReactNode } from 'react';
import type { OrderStatus, PaymentStatus } from './types';

export function StatusBadge({ status }: { status: OrderStatus | PaymentStatus }) {
  const style = status === 'Paid' || status === 'Delivered'
    ? 'bg-emerald-100 text-emerald-800'
    : status === 'Cancelled' || status === 'Failed' ? 'bg-red-100 text-red-800'
      : status === 'Processing' || status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800';
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>{status}</span>;
}

export function PageState({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-10 text-center text-gray-600">{children}</div>;
}
