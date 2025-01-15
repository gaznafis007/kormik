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
import { TrashIcon } from "@heroicons/react/24/solid";

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
  const handleRole = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setRole(event.target.value);
  };
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
    const formData = new FormData();
    const profileImage = form.profileImage.files[0];
    formData.append("employerProfileImage", profileImage);
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
    <section className="my-4">
      <Heading>welcome! land your first project with us</Heading>
      <form
        onSubmit={
          role === "employer"
            ? handleEmployerRegister
            : handleFreelancerRegister
        }
        className="bg-gray-800 flex flex-col gap-4 md:w-1/2 mx-4 md:mx-auto rounded-md shadow-md shadow-slate-600 p-8"
      >
        <InputField
          label={"your name"}
          inputType={"text"}
          inputName={"name"}
        ></InputField>
        <InputField
          label={"your email"}
          inputType={"email"}
          inputName={"email"}
        ></InputField>
        <InputField
          label={"your password"}
          inputType={"password"}
          inputName={"password"}
        ></InputField>
        <div className="flex flex-row gap-4 items-center">
          <label className="capitalize text-rose-500">who are you?</label>
          <select
            onChange={handleRole}
            name="role"
            className="w-1/3 p-2 rounded-md border border-rose-500"
          >
            <option value={""} selected>
              Select your role
            </option>
            <option value="employer">Employer</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
        {role === "employer" && (
          <>
            <InputField
              label={"company name"}
              inputType={"text"}
              inputName={"companyName"}
            ></InputField>
            <InputField
              label={"company address"}
              inputType={"text"}
              inputName={"companyAddress"}
            ></InputField>
            <InputField
              label={"company website"}
              inputType={"url"}
              inputName={"companyWebsite"}
            ></InputField>
            <InputField
              label={"industry"}
              inputType={"text"}
              inputName={"industry"}
            ></InputField>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">Business size</label>
              <select
                name="companySize"
                className="w-full p-2 rounded-md border border-rose-500"
              >
                <option selected>Select your company size</option>
                <option value={"small"}>{"Small (<10 employee)"}</option>
                <option value={"medium"}>{"Medium (100+ employee)"}</option>
                <option value={"large"}>{"Large (1001+ employee)"}</option>
              </select>
            </div>
            <InputField
              label={"country"}
              inputType={"text"}
              inputName={"country"}
            ></InputField>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">
                description on your company
              </label>
              <textarea
                type="text"
                name="companyBio"
                className="w-full p-6 rounded-md border border-rose-500"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">
                tell us about yourself
              </label>
              <textarea
                type="text"
                name="employerBio"
                className="w-full p-6 rounded-md border border-rose-500"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">
                preferred payment method
              </label>
              <select
                name="paymentMethod"
                className="w-full p-2 rounded-md border border-rose-500"
              >
                <option selected>Select your preferred method</option>
                <option value={"paypal"}>Paypal</option>
                <option value={"stripe"}>Stripe</option>
                <option value={"payoneer"}>Payoneer</option>
                <option value={"bankTransfer"}>Bank transfer</option>
              </select>
            </div>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">
                profile picture
              </label>
              <DragAndDrop
                name={"attachment"}
                fileTypes={fileTypes}
                label={"upload your file here"}
                placeholder={"Drag or drop your file here"}
                handler={handleChange}
                file={attachment}
              >
                {attachment && !loading && (
                  <p className="text-rose-500 text-center w-full cursor-pointer p-4 bg-transparent rounded-md border border-dashed border-rose-500">
                    {attachment.name}
                  </p>
                )}
                {loading && (
                  <Loading type="spinner" size="md" text="Loading..." />
                )}
              </DragAndDrop>
              {
                previewURL && (
                  <div className="mt-4">
                    <h3 className="text-center text-rose-500">File Preview:</h3>
              <Button handler={removeFile}>
                <TrashIcon className="size-7 text-white"></TrashIcon> Remove
                File
              </Button>
              {/* Preview for Images */}
              {attachment?.type.startsWith("image/") && (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-full h-auto rounded-md border border-rose-500 mt-2"
                />
              )}
                  </div>
                )
              }
            </div>
            <Button handler={handleProjectFileUpload}>
            {loading ? "uploading..." : "upload image"}
          </Button>
          </>
        )}
        {role === "freelancer" && (
          <>
            <InputField
              label={"your title (work specific)"}
              inputType={"text"}
              inputName={"title"}
            ></InputField>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">category</label>
              <select
                name="category"
                className="w-full p-2 rounded-md border border-rose-500"
              >
                <option selected>Select your category</option>
                {categories.map((category) => (
                  <option className="capitalize" key={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">Skills</label>
              <textarea
                type="text"
                name="skills"
                className="w-full p-6 rounded-md border border-rose-500"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">
                tell us about yourself
              </label>
              <textarea
                type="text"
                name="bio"
                className="w-full p-6 rounded-md border border-rose-500"
              />
            </div>
            <InputField
              label={"Website/Portfolios/URLs"}
              inputType={"url"}
              inputName={"userURL"}
            ></InputField>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">
                preferred payment method
              </label>
              <select
                name="paymentMethod"
                className="w-full p-2 rounded-md border border-rose-500"
              >
                <option selected>Select your preferred method</option>
                <option value={"paypal"}>Paypal</option>
                <option value={"stripe"}>Stripe</option>
                <option value={"payoneer"}>Payoneer</option>
                <option value={"bankTransfer"}>Bank transfer</option>
              </select>
            </div>
            <InputField
              label={"country"}
              inputType={"text"}
              inputName={"country"}
            ></InputField>
            <InputField
              label={"hourly rate"}
              inputType={"text"}
              inputName={"rate"}
            ></InputField>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">availability</label>
              <select
                name="availability"
                className="w-full p-2 rounded-md border border-rose-500"
              >
                <option selected>Select your preferred method</option>
                <option value={"full-time"}>Full time</option>
                <option value={"part-time"}>Part time</option>
              </select>
            </div>
            <div className="flex flex-col gap-4">
              <label className="capitalize text-rose-500">
                profile picture
              </label>
              <DragAndDrop
                name={"attachment"}
                fileTypes={fileTypes}
                label={"upload your file here"}
                placeholder={"Drag or drop your file here"}
                handler={handleChange}
                file={attachment}
              >
                {attachment && !loading && (
                  <p className="text-rose-500 text-center w-full cursor-pointer p-4 bg-transparent rounded-md border border-dashed border-rose-500">
                    {attachment.name}
                  </p>
                )}
                {loading && (
                  <Loading type="spinner" size="md" text="Loading..." />
                )}
              </DragAndDrop>
              {
                previewURL && (
                  <div className="mt-4">
                    <h3 className="text-center text-rose-500">File Preview:</h3>
              <Button handler={removeFile}>
                <TrashIcon className="size-7 text-white"></TrashIcon> Remove
                File
              </Button>
              {/* Preview for Images */}
              {attachment?.type.startsWith("image/") && (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-full h-auto rounded-md border border-rose-500 mt-2"
                />
              )}
                  </div>
                )
              }
              <Button handler={handleProjectFileUpload}>
            {loading ? "uploading..." : "upload image"}
          </Button>
            </div>
          </>
        )}
        {role && (
          <InputSubmitForForm
            type={"submit"}
            value={"Register"}
          ></InputSubmitForForm>
        )}
      </form>
    </section>
  );
};

export default Signup;
