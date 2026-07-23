export type Product = {
  _id: string;
  product_name: string;
  product_image: string;
  product_description: string;
  price: number;
  stock: number;
  category_id: string;
};

export type Pagination = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ProductsPage = { data: Product[]; pagination: Pagination };

export type CartItem = Pick<
  Product,
  'product_name' | 'product_image' | 'product_description' | 'price' | 'stock'
> & { item_id: string; quantity: number };

export type CartResponse = { totalCount: number; data: CartItem[] };

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';
export type PaymentProvider = 'Razorpay' | 'Stripe' | 'Test';

export type OrderItem = {
  _id: string;
  order_id: string;
  item_id: Product | string | null;
  quantity: number;
  price: number;
};

export type Payment = {
  _id?: string;
  order_id: string;
  payment_provider: PaymentProvider;
  payment_method: string;
  provider_payment_id?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paid_at?: string;
};

export type Order = {
  _id: string;
  user_id: string;
  order_date: string;
  status: OrderStatus;
  total_amount: number;
};

export type OrderDetails = { order: Order; items: OrderItem[]; payment: Payment | null };
export type OrderListEntry = OrderDetails;

export type ApiEnvelope<T> = { statusCode: number; data: T; message: string; success: boolean };
