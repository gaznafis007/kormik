import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios/useAxios";
import { useEffect, useState } from "react";



const Home = () => {
    const [contents, setContents] = useState([])
    const axiosSecure = useAxios()

    useEffect(()=>{
        axiosSecure.get('/test')
        .then(res => setContents(res.data))
    },[])
    return (
        <section>
            <h2 className="text-center text-6xl text-blue-500">This is kormik home full site landing soon....</h2>
            <div className="text-center bg-slate-100 w-1/3 rounded-md mx-auto  my-8 p-4">
            <Link className="text-blue-400 mr-2" to="/register">Sign up</Link>
            <Link className="text-orange-400 ml-2" to ="/signin">Sign in</Link>
            </div>
            <div className="my-6 grid grid-cols-3 gap-4 w-2/3 mx-auto">
                {
                    contents.map((content, idx) =>(
                        <p key={idx} className="text-lg p-4 text-center shadow-md rounded-md bg-slate-200">{content.content}</p>
                    ))
                }
            </div>
        </section>
    );
};

export default Home;