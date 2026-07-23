//
import './App.css';
import FeatureCard from './component/FeatureCard';
import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  CreditCard,
  PackageCheck,
  Headphones,
} from "lucide-react";
import { useEffect, useState } from 'react';
import { api } from './utils/api';
import Products from './component/Products';
import { useOutletContext } from 'react-router';
import type { Product } from './features/ecommerce/types';
type OutletContext = {
  products: Product[];
 setProducts:React.Dispatch<React.SetStateAction<Product[]>>
};

const Features = [
  {
    icon: ShoppingCart,
    title: "Easy Shopping",
    description:
      "Browse thousands of products and add your favorite items to cart effortlessly.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your orders delivered quickly with reliable and trackable shipping.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Shop safely with secure payment options and protected transactions.",
  },
  {
    icon: PackageCheck,
    title: "Quality Products",
    description:
      "Discover verified products with great quality and trusted sellers.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    description:
      "Pay your way with flexible payment methods including cards and online payments.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Get quick assistance from our support team whenever you need help.",
  },
];
function App() {

  const { products, setProducts  } = useOutletContext<OutletContext>();
 const LIMIT = 10;

const [currentPage, setCurrentPage] = useState(1);
const [totalItems, setTotalItems] = useState(0);

useEffect(() => {
  async function fetchProducts() {
    try {
      const { data } = await api.get("/items", {
        params: {
          page: currentPage,
          limit: LIMIT,
        },
      });
      setProducts(data.data.data); // current page products
      setTotalItems(data.data.pagination.totalItems);  // total number of products
    } catch (err) {
      console.error(err);
    }
  }

  fetchProducts();
}, [currentPage, setProducts]);

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center">

        {/* Products Card */}
    <Products totalItems={totalItems}  products={products} LIMIT={LIMIT} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        {/* Features Card */}
        <div className="grid  grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 mt-4  max-w-5xl">
          {Features.map((feature) => (
            <FeatureCard key={feature.title} Icon={feature.icon} {...feature} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
