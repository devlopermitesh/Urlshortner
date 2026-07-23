import { useParams } from "react-router";

const CategoryProductsPage=()=>{
    
const { categoryId } = useParams();

  return <div>Category: {categoryId}</div>;
};
export default CategoryProductsPage
