import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios/useAxios";
import { GifIcon } from "@heroicons/react/24/solid";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
  const [contents, setContents] = useState([]);
  const axiosSecure = useAxios();
  const { myInitials } = useContext(AuthContext);
  
  const handleToast = () => {
    console.log("test");
    toast.success(`Congrats react-hot-toast implemented`);
  };
  const handleALert = () => {
    Swal.fire({
      title: "Congrats, Sweet alert implemented",
      icon: "success",
    });
  };
  useEffect(() => {
    axiosSecure.get("/test").then((res) => setContents(res.data));
  }, []);
  return (
    <section>
      <h2 className="text-center text-6xl text-blue-500">
        This is kormik home full site landing soon....
      </h2>
      <div className="text-center bg-slate-100 w-1/3 rounded-md mx-auto  my-8 p-4">
        <Link className="text-blue-400 mr-2" to="/register">
          Sign up
        </Link>
        <Link className="text-orange-400 ml-2" to="/signin">
          Sign in
        </Link>
      </div>
      <div className="my-6 grid grid-cols-3 gap-4 w-2/3 mx-auto">
        {contents.map((content, idx) => (
          <p
            key={idx}
            className="text-lg p-4 text-center shadow-md rounded-md bg-slate-200"
          >
            {content.content}
          </p>
        ))}
      </div>
      <div className="flex flex-row">
        <button
          onClick={handleToast}
          className="flex flex-row items-center gap-2 bg-sky-600 p-4 text-white rounded-md mx-auto"
        >
          <span>Click me for toast</span> <GifIcon className="size-5"></GifIcon>
        </button>
        <button
          onClick={handleALert}
          className="flex flex-row items-center gap-2 bg-orange-600 p-4 text-white rounded-md mx-auto"
        >
          <span>Click me for alert</span>{" "}
          <BellAlertIcon className="size-5"></BellAlertIcon>
        </button>
      </div>
      <div className="my-6 w-1/5 mx-auto p-4 bg-slate-300">
        <h2 className="text-2xl font-bold text-center text-violet-400">Name: {myInitials?.name}</h2>
        <p className="text-blue-600">email: {myInitials?.email}</p>
      </div>
    </section>
  );
};

export default Home;
