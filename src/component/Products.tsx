import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import type { Product } from '../features/ecommerce/types';

interface ProductsProps{
   products: Product[],
   totalItems:number,
   LIMIT:number,
   currentPage:number,
   setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
export default function Products({products,LIMIT=10,currentPage,setCurrentPage,totalItems}:ProductsProps) {
 

  return (
    <>
   <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {products.map((product) => (
    <ProductCard
      key={product._id}
      image={product.product_image}
      title={product.product_name}
      description={product.product_description}
      price={product.price}
    />
  ))}
</div>

<Pagination
  totalItems={totalItems}
  itemsPerPage={LIMIT}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>
    </>
  );
}
