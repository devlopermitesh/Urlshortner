import { useParams } from "react-router"

const ProductSpecific=()=>{
    const {productId}=useParams()
return (
    <div>
        Product specific  {productId}
    </div>
)
}
export default ProductSpecific