import { Link } from "react-router-dom";
import { GifIcon } from "@heroicons/react/24/solid";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosForData from "../../hooks/useAxiosForData/useAxiosForData";
import Button from "../../Shared/Button/Button";
import Banner from "./Banner/Banner";

const Home = () => {
  //   const [contents, setContents] = useState([]);
  //   const axiosSecure = useAxios();
  // test-purpose
  const { myInitials } = useContext(AuthContext);
  const [contents] = useAxiosForData("/test");

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
  const handleWithParams = (id) => {
    Swal.fire({
      title: id,
      icon: "info",
    });
  };
  //   useEffect(() => {
  //     axiosSecure.get("/test").then((res) => setContents(res.data));
  //   }, []);
  return (
    <section>
     <Banner/>
    </section>
  );
};

export default Home;
