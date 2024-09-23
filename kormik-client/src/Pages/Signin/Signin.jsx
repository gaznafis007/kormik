import Heading from "../../Shared/Heading/Heading";

const Signin = () => {
  return (
    <section>
      <Heading>login here to get over with your projects</Heading>
      <form className="bg-gray-800 mx-12 p-12 rounded-md shadow-md shadow-slate-600">
        <div>
          <input type="email" name="email" placeholder="Your email" id="" />
        </div>
        <div>
          <input type="password" name="password" placeholder="password" id="" />
        </div>
        <input type="submit" value="Log in" className="my-2 bg-rose-500 p-3 text-white font-sans font-semibold rounded-md mx-auto hover:bg-rose-600 " />
      </form>
    </section>
  );
};

export default Signin;
