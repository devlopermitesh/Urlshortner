import {Outlet} from "react-router"
import Header from "./component/Header"
import Footer from "./component/Footer"
const Layout=()=>{

    return (
        <section className="flex flex-col w-full min-h-screen ">
        <Header/>
    <Outlet/>
    <Footer/>
    </section>
)
}
export default Layout