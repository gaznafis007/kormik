import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "../../Shared/Heading/Heading";
import InputField from "../../Shared/InputField/InputField";
import useAxiosForData from "../../hooks/useAxiosForData/useAxiosForData";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios/useAxios";
import toast from "react-hot-toast";
import InputSubmitForForm from "../../Shared/InputSubmitForForm/InputSubmitForForm";
import { getDownloadURL } from "firebase/storage";
import DragAndDrop from "../../Shared/DragAndDrop/DragAndDrop";
import Loading from "../../Shared/Loading/Loading";
import Button from "../../Shared/Button/Button";
import { TrashIcon, UserIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Signup = () => {
  const [role, setRole] = useState("");
  const [categories] = useAxiosForData("/categories");
  const { register, getProfile, uploadFile } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [fileUrl, setFileUrl] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const fileTypes = ["JPEG", "PNG", "JPG"];
  const handleChange = (file) => {
    if (!file) {
      return;
    }
    setAttachment(file);
    setPreviewURL(URL.createObjectURL(file));
  };
  const handleProjectFileUpload = async () => {
    if (!attachment) {
      toast.error("Attachment is not available");
      return;
    }
    setLoading(true);
    uploadFile(attachment).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl(url);
        setLoading(false);
        toast.success('image uploaded!')
        // console.log(url);
      });
    });
    // console.log(submissionLetter)
  };
  const removeFile = () => {
    setAttachment(null);
    setPreviewURL("");
    setFileUrl("");
  };
  // const handleRole = (event) => {
  //   event.preventDefault();
  //   console.log(event.target.value);
  //   setRole(event.target.value);
  // };
  const storeUser = (user) => {
    try {
      axiosSecure.post("/users", user).then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          Swal.fire({
            title: `Congrats you ar registered as a ${user?.role}`,
            icon: "success",
          });
          navigate(from);
        }
      });
    } catch {
      (err) => {
        toast.error(err.message);
      };
    }
  };
  const handleEmployerRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const employer = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role,
      employerCompanyName: form.companyName.value,
      employerCompanyAddress: form.companyAddress.value,
      userURL: form.companyWebsite.value,
      employerIndustry: form.industry.value,
      employerCompanySize: form.companySize.value,
      country: form.country.value,
      companyBio: form.companyBio.value,
      bio: form.employerBio.value,
      paymentMethod: form.paymentMethod.value,
      userProfileImage: fileUrl,
    };
    register(employer.email, employer.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        getProfile(employer.name);
        storeUser(employer);
      })
      .catch((err) => {
        const errorMessage = err.message
          .split(" ")[2]
          .split("/")[1]
          .split(")")[0];
        toast.error(errorMessage);
      });
    console.log(employer);
  };
  const handleFreelancerRegister = (event) => {
    event.preventDefault();
    const form = event.target;

    const freelancer = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role,
      title: form.title.value,
      category: form.category.value,
      skills: form.skills.value,
      bio: form.bio.value,
      userURL: form.userURL.value,
      paymentMethod: form.paymentMethod.value,
      country: form.country.value,
      rate: form.rate.value,
      availability: form.availability.value,
      userProfileImage: fileUrl,
    };
    // console.log("freelancer", freelancer);
    register(freelancer?.email, freelancer?.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        getProfile(freelancer?.name);
        storeUser(freelancer);
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
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <Heading>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome! Land Your First Project With Us
        </span>
      </Heading>
      <form
        onSubmit={
          role === "employer"
            ? handleEmployerRegister
            : handleFreelancerRegister
        }
        className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            label="Your Name"
            inputType="text"
            inputName="name"
          />
          <InputField
            label="Your Email"
            inputType="email"
            inputName="email"
          />
        </div>
        <InputField
          label="Your Password"
          inputType="password"
          inputName="password"
          className="mt-6"
        />
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-200">Who are you?</label>
          <div className="mt-2 flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRole("freelancer")}
              type="button"
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center ${
                role === "freelancer"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              <UserIcon className="h-5 w-5 mr-2" />
              Freelancer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRole("employer")}
              type="button"
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center ${
                role === "employer"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              <BriefcaseIcon className="h-5 w-5 mr-2" />
              Employer
            </motion.button>
          </div>
        </div>

        {role === "employer" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                label="Company Name"
                inputType="text"
                inputName="companyName"
              />
              <InputField
                label="Company Address"
                inputType="text"
                inputName="companyAddress"
              />
              <InputField
                label="Company Website"
                inputType="url"
                inputName="companyWebsite"
              />
              <InputField
                label="Industry"
                inputType="text"
                inputName="industry"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">Business Size</label>
                <select
                  name="companySize"
                  className=" block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
                >
                  <option selected>Select your company size</option>
                  <option value="small">Small (&lt;10 employee)</option>
                  <option value="medium">Medium (100+ employee)</option>
                  <option value="large">Large (1001+ employee)</option>
                </select>
              </div>
              <InputField
                label="Country"
                inputType="text"
                inputName="country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Description of your company</label>
              <textarea
                name="companyBio"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Tell us about yourself</label>
              <textarea
                name="employerBio"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                rows="4"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-200">Preferred Payment Method</label>
              <select
                name="paymentMethod"
                className="p-2 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option selected>Select your preferred method</option>
                <option value="paypal">Paypal</option>
                <option value="stripe">Stripe</option>
                <option value="payoneer">Payoneer</option>
                <option value="bankTransfer">Bank transfer</option>
              </select>
            </div>
          </motion.div>
        )}

        {role === "freelancer" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                label="Your Title (Work Specific)"
                inputType="text"
                inputName="title"
              />
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">Category</label>
                <select
                  name="category"
                  className="block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
                >
                  <option selected>Select your category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Skills</label>
              <textarea
                name="skills"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Tell us about yourself</label>
              <textarea
                name="bio"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                rows="4"
              />
            </div>
            <InputField
              label="Website/Portfolios/URLs"
              inputType="url"
              inputName="userURL"
            />
            <div>
              <label className="block text-sm font-medium text-gray-200">Preferred Payment Method</label>
              <select
                name="paymentMethod"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option selected>Select your preferred method</option>
                <option value="paypal">Paypal</option>
                <option value="stripe">Stripe</option>
                <option value="payoneer">Payoneer</option>
                <option value="bankTransfer">Bank transfer</option>
              </select>
            </div>
            <InputField
              label="Country"
              inputType="text"
              inputName="country"
            />
            <InputField
              label="Hourly Rate"
              inputType="text"
              inputName="rate"
            />
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-200">Availability</label>
              <select
                name="availability"
                className="p-2 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option selected>Select your availability</option>
                <option value="full-time">Full time</option>
                <option value="part-time">Part time</option>
              </select>
            </div>
          </motion.div>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-200">Profile Picture</label>
          <DragAndDrop
            name="attachment"
            fileTypes={fileTypes}
            label="Upload your file here"
            placeholder="Drag or drop your file here"
            handler={handleChange}
            file={attachment}
          >
            {attachment && !loading && (
              <p className="text-sm text-gray-300 text-center w-full cursor-pointer p-4 bg-gray-800 rounded-md border border-dashed border-gray-600">
                {attachment.name}
              </p>
            )}
            {loading && (
              <Loading type="spinner" size="md" text="Loading..." />
            )}
          </DragAndDrop>
          {previewURL && (
            <div className="mt-4">
              <h3 className="text-center text-gray-200">File Preview:</h3>
              <div className="flex justify-between items-center mt-2">
                <img
                  src={previewURL || "/placeholder.svg"}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
                />
                <Button handler={removeFile} className="bg-red-600 hover:bg-red-700">
                  <TrashIcon className="h-5 w-5 mr-2" /> Remove File
                </Button>
              </div>
            </div>
          )}
          <Button
            handler={handleProjectFileUpload}
            className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-center"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {role && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-8"
          >
            <InputSubmitForForm
              type="submit"
              value="Register"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            />
          </motion.div>
        )}
      </form>
    </motion.div>
  </section>
  );
};

export default Signup;
