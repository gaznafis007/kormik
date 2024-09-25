import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import Heading from "../../Shared/Heading/Heading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const {logIn} = useAuth()
  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = {
      email,
      password,
    };
    logIn(user.email, user.password)
    .then(res=>{
      console.log(res.user)
      Swal.fire({
        title: `Welcome Back! ${res.user.displayName}`,
        icon: 'success'
      })
      navigate(from)
    })
    .catch(err =>{
      const errorMessage = err.message.split(' ')[2].split('/')[1].split(')')[0]
      toast.error(errorMessage)
    })
  };
  return (
    <section>
      <Heading>login here to get over with your projects</Heading>
      <form
        onSubmit={handleSignIn}
        className="bg-gray-800 mx-12 flex flex-col gap-4 p-12 rounded-md shadow-md shadow-slate-600 md:w-1/3 md:mx-auto"
      >
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="w-full p-2 border rounded-md border-rose-500"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="w-full p-2 border rounded-md border-rose-500"
          />
        </div>
        <Link to="/register" className="capitalize text-rose-500 my-2 hover:underline hover:underline-offset-1">new to kormik? register here</Link>
        <input
          type="submit"
          value="Log in"
          className="my-2 bg-rose-500 p-3 block w-full text-white font-sans font-semibold rounded-md mx-auto hover:bg-rose-600 "
        />
      </form>
    </section>
  );
};

export default Signin;
