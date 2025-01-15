import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";


const Main = () => {
    return (
        <section className="bg-gradient-to-br from-slate-800 to-slate-700">
                <Navbar/>
                <Outlet/>
                <Footer/>
        </section>
    );
};

export default Main;