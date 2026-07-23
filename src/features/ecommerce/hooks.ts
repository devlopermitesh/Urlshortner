import { useCallback, useEffect, useState } from 'react';
import { apiErrorMessage, ecommerceApi } from './api';
import type { CartResponse, OrderDetails, OrderListEntry, ProductsPage } from './types';

type QueryState<T> = { data: T | null; loading: boolean; error: string | null };

export function useProducts(page: number, query: string) {
  const [state, setState] = useState<QueryState<ProductsPage>>({ data: null, loading: true, error: null });
  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));
    try { setState({ data: await ecommerceApi.getProducts(page, 10, query), loading: false, error: null }); }
    catch (error) { setState({ data: null, loading: false, error: apiErrorMessage(error) }); }
  }, [page, query]);
  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);
  return { ...state, refetch: load };
}

export function useCart() {
  const [state, setState] = useState<QueryState<CartResponse>>({ data: null, loading: true, error: null });
  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));
    try { setState({ data: (await ecommerceApi.getCart()).data, loading: false, error: null }); }
    catch (error) { setState({ data: null, loading: false, error: apiErrorMessage(error) }); }
  }, []);
  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);
  return { ...state, refetch: load };
}

export function useOrders() {
  const [state, setState] = useState<QueryState<OrderListEntry[]>>({ data: null, loading: true, error: null });
  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));
    try { setState({ data: await ecommerceApi.getOrders(), loading: false, error: null }); }
    catch (error) { setState({ data: null, loading: false, error: apiErrorMessage(error) }); }
  }, []);
  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);
  return { ...state, refetch: load };
}

export function useOrder(orderId: string | undefined) {
  const [state, setState] = useState<QueryState<OrderDetails>>({ data: null, loading: true, error: null });
  const load = useCallback(async () => {
    if (!orderId) { setState({ data: null, loading: false, error: 'Order not found.' }); return; }
    setState((current) => ({ ...current, loading: true, error: null }));
    try { setState({ data: await ecommerceApi.getOrder(orderId), loading: false, error: null }); }
    catch (error) { setState({ data: null, loading: false, error: apiErrorMessage(error) }); }
  }, [orderId]);
  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);
  return { ...state, refetch: load };
}
