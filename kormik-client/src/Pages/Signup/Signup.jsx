import { useState } from "react";
import Heading from "../../Shared/Heading/Heading";

const Signup = () => {
  const [role, setRole] = useState("");
  const handleRole = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setRole(event.target.value);
  };
  const handleEmployerRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const user = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role,
    };
    console.log("employer", user);
  };
  const handleFreelancerRegister = event =>{
    event.preventDefault();
    const form = event.target;
    const user = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role,
    };
    console.log("freelaner", user);
  }
  return (
    <section>
      <Heading>welcome! land your first project with us</Heading>
      <form
        onSubmit={role === 'employer' ? handleEmployerRegister : handleFreelancerRegister}
        className="bg-gray-800 flex flex-col gap-4 md:w-1/2 mx-4 md:mx-auto rounded-md shadow-md shadow-slate-600 p-8"
      >
        <div className="flex flex-col gap-4">
          <label className="capitalize text-rose-500">your name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 rounded-md border border-rose-500"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="capitalize text-rose-500">your email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 rounded-md border border-rose-500"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="capitalize text-rose-500">your password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 rounded-md border border-rose-500"
          />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <label className="capitalize text-rose-500">who are you?</label>
          <select
            onChange={handleRole}
            name="role"
            className="w-1/3 p-2 rounded-md border border-rose-500"
          >
            <option value="" selected>
              Select your role
            </option>
            <option value="employer">Employer</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
        {role === "employer" ? (
          <>
            <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">company name</label>
            <input
              type="text"
              name="companyName"
              className="w-full p-2 rounded-md border border-rose-500"
            />
          </div>
            <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">company address</label>
            <input
              type="text"
              name="companyAddress"
              className="w-full p-2 rounded-md border border-rose-500"
            />
          </div>
            <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">company website</label>
            <input
              type="url"
              name="companyWebsite"
              className="w-full p-2 rounded-md border border-rose-500"
            />
          </div>
            <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">Industry</label>
            <input
              type="text"
              name="industry"
              className="w-full p-2 rounded-md border border-rose-500"
            />
          </div>
            <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">Business size</label>
            <select name="companySize" className="w-full p-2 rounded-md border border-rose-500">
                <option selected>Select your company size</option>
                <option value={"small"}>{"Small (<10 employee)"}</option>
                <option value={"medium"}>{"Medium (100+ employee)"}</option>
                <option value={"large"}>{"Large (1001+ employee)"}</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">Country</label>
            <input
              type="text"
              name="country"
              className="w-full p-2 rounded-md border border-rose-500"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">description on your company</label>
            <textarea
              type="text"
              name="companyBio"
              className="w-full p-6 rounded-md border border-rose-500"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">tell us about yourself</label>
            <textarea
              type="text"
              name="employerBio"
              className="w-full p-6 rounded-md border border-rose-500"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">preferred payment method</label>
            <select name="paymentMethod" className="w-full p-2 rounded-md border border-rose-500">
                <option selected>Select your preferred method</option>
                <option value={"paypal"}>Paypal</option>
                <option value={"stripe"}>Stripe</option>
                <option value={"payoneer"}>Payoneer</option>
                <option value={"bankTransfer"}>Bank transfer</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">profile picture</label>
            <input
              type="file"
              name="profileImage"
              className="w-full p-2 rounded-md bg-white border border-rose-500"
            />
          </div>
          </>
        ) : (
          ""
        )}
        {role && (
          <input
            type="submit"
            value="Register"
            className="my-2 bg-rose-500 p-3 block w-full text-white font-sans font-semibold rounded-md mx-auto hover:bg-rose-600"
          />
        )}
      </form>
    </section>
  );
};

export default Signup;
