//url-visitor?q=url
import {useSearchParams} from "react-router"
const Analysis=()=>{
    const [searchParams,setSearchParams]=useSearchParams()
    const url=searchParams.get('q')
return (
    <div>{url}</div>
)
}
export default Analysis