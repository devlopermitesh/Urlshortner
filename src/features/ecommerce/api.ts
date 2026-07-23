import { isAxiosError } from 'axios';
import { api } from '../../utils/api';
import type { ApiEnvelope, CartResponse, OrderDetails, OrderListEntry, Product, ProductsPage } from './types';

export const endpoints = {
  products: '/items',
  productSearch: '/items/search',
  cart: '/carts',
  orders: '/orders',
  order: (orderId: string) => `/orders/${encodeURIComponent(orderId)}`,
  payment: (orderId: string) => `/orders/${encodeURIComponent(orderId)}/payment`,
} as const;

function unwrap<T>(response: { data: ApiEnvelope<T> }): T {
  return response.data.data;
}

export function apiErrorMessage(error: unknown): string {
  if (isAxiosError<{ message?: string; errors?: unknown }>(error)) {
    const data = error.response?.data;
    if (data?.message) return data.message;
    if (data?.errors) return 'Please check the submitted details and try again.';
  }
  return 'Something went wrong. Please try again.';
}

export const ecommerceApi = {
  async getProducts(page: number, limit: number, query?: string): Promise<ProductsPage> {
    if (query?.trim()) {
      const data = unwrap(await api.get<ApiEnvelope<Product[]>>(endpoints.productSearch, { params: { q: query.trim() } }));
      return {
        data,
        pagination: { totalItems: data.length, totalPages: 1, currentPage: 1, itemsPerPage: limit, hasNextPage: false, hasPrevPage: false },
      };
    }
    return unwrap(await api.get<ApiEnvelope<ProductsPage>>(endpoints.products, { params: { page, limit } }));
  },
  async getCart(): Promise<CartResponse> {
    return unwrap(await api.get<ApiEnvelope<CartResponse>>(endpoints.cart));
  },
  async addToCart(itemId: string): Promise<void> {
    await api.post(endpoints.cart + '/items/' + encodeURIComponent(itemId));
  },
  async removeFromCart(itemId: string): Promise<void> {
    await api.delete(endpoints.cart + '/items/' + encodeURIComponent(itemId));
  },
  async createOrder(): Promise<OrderDetails> {
    return unwrap(await api.post<ApiEnvelope<OrderDetails>>(endpoints.orders, {}));
  },
  async getOrders(): Promise<OrderListEntry[]> {
    return unwrap(await api.get<ApiEnvelope<{ orders: OrderListEntry[] }>>(endpoints.orders)).orders;
  },
  async getOrder(orderId: string): Promise<OrderDetails> {
    return unwrap(await api.get<ApiEnvelope<OrderDetails>>(endpoints.order(orderId)));
  },
  async completePayment(orderId: string): Promise<Pick<OrderDetails, 'order' | 'payment'>> {
    return unwrap(await api.post<ApiEnvelope<Pick<OrderDetails, 'order' | 'payment'>>>(endpoints.payment(orderId), {}));
  },
};
