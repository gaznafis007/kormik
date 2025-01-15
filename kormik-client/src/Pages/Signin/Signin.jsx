import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import Heading from "../../Shared/Heading/Heading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const { logIn } = useAuth();

  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password };

    logIn(user.email, user.password)
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          title: `Welcome Back! ${res.user.displayName}`,
          icon: "success",
        });
        navigate(from);
      })
      .catch((err) => {
        const errorMessage = err.message
          .split(" ")[2]
          .split("/")[1]
          .split(")")[0];
        toast.error(errorMessage);
      });
  };

  return (
    <section className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-slate-800 rounded-lg shadow-lg p-8 md:p-10">
        {/* Heading */}
        <Heading>
          <h1 className="text-center text-3xl font-bold text-rose-500 mb-6">
            Login to Kormik
          </h1>
          <p className="text-center text-slate-300 text-sm">
            Access your account and stay on top of your projects effortlessly.
          </p>
        </Heading>

        {/* Form */}
        <form onSubmit={handleSignIn} className="mt-6 space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              className="mt-2 w-full p-3 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              className="mt-2 w-full p-3 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link
              to="/register"
              className="text-rose-500 text-sm hover:underline hover:underline-offset-2"
            >
              New to Kormik? Register here
            </Link>
          </div>

          {/* Submit Button */}
          <div>
            <input
              type="submit"
              value="Log In"
              className="w-full bg-rose-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-rose-600 cursor-pointer transition duration-300"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signin;
