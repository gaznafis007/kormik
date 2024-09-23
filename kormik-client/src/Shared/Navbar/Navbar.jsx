import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Button from "../Button/Button";
import { useState } from "react";


const navItems = <>
    <li><Link to ="/" className="hover:pb-2 px-2 hover:border-b-2 hover:border-rose-600">Home</Link></li>
    <li><Link to ="/" className="hover:pb-2 px-2 hover:border-b-2 hover:border-rose-600">Find job</Link></li>
    <li><Link to ="/" className="hover:pb-2 px-2 hover:border-b-2 hover:border-rose-600">Find Talents</Link></li>
    <li><Link to ="/" className="hover:pb-2 px-2 hover:border-b-2 hover:border-rose-600">About us</Link></li>
    <li><Link to={"/signin"} className="hover:p-3 px-2 hover:bg-rose-600 text-rose-600 hover:text-white rounded-md">Join</Link></li>
</>
const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false)
    const handleIsVisible = () =>{
        setIsVisible(!isVisible)
    }
    return (
        <nav className="md:mx-4 p-4 flex flex-row items-center justify-between text-lg">
            <h2 className="text-6xl text-white font-semibold font-sans">Kormik</h2>
            <ul className="hidden md:flex md:flex-row gap-7 text-rose-600 font-sans font-thin">{navItems}</ul>
            <ul className="md:hidden z-10 overflow-auto">
                <li>
                        <Button handler={handleIsVisible}>
                            {
                                isVisible ? <XMarkIcon className="size-6"></XMarkIcon> : <Bars3Icon className="size-6"></Bars3Icon>
                            }
                        </Button>
                        {
                            isVisible && (
                                <ul className="flex flex-col gap-7 text-rose-600 font-sans font-thin">
                            {navItems}
                        </ul>
                            )
                        }
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;