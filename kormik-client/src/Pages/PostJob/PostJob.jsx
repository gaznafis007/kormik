import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BriefcaseIcon, CalendarIcon, CurrencyDollarIcon, DocumentTextIcon, TagIcon } from "@heroicons/react/24/outline";
import useAxiosForData from "../../hooks/useAxiosForData/useAxiosForData";
import useAxios from "../../hooks/useAxios/useAxios";
import useAuth from "../../hooks/useAuth/useAuth";
import { getDownloadURL } from "firebase/storage";
import Heading from "../../Shared/Heading/Heading";
import InputField from "../../Shared/InputField/InputField";
import TextArea from "../../Shared/TextArea/TextArea";
import InputSubmitForForm from "../../Shared/InputSubmitForForm/InputSubmitForForm";
import DragAndDrop from "../../Shared/DragAndDrop/DragAndDrop";

const PostJob = () => {
  const [attachment, setAttachment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const { user, uploadFile } = useAuth();
  const fileTypes = ["PDF", "JPEG", "PNG", "XLSX", "JPG"];
  const [categories] = useAxiosForData("/categories");
  const [subCategories, setSubCategories] = useState("");
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const handleChange = async (file) => {
    if (!file) return;
    setIsLoading(true);
    setAttachment(file);
    uploadFile(file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl(url);
        setIsLoading(false);
      });
    });
  };

  const handleSubCategories = (event) => {
    event.preventDefault();
    const category = event.target.value;
    axiosSecure.get(`/subCategories/${category}`).then((res) => {
      setSubCategories(res.data);
    });
  };

  const handlePostJob = (event) => {
    event.preventDefault();
    const form = event.target;
    const postDate = new Date();
    const job = {
      title: form.title.value,
      jobPoster: user?.displayName,
      jobPosterMail: user?.email,
      jobDescription: form.jobDescription.value,
      projectRate: form.projectRate.value,
      keyword: form.keyword.value.split("; "),
      skill: form.skill.value.split("; "),
      postDate,
      category: form.category.value,
      subCategory: form.subCategory.value,
      deadline: form.deadline.value,
      jobType: form.jobType.value,
      attachment: fileUrl,
    };
    axiosSecure.post("/jobs", job).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          title: `Congrats, your job / project for ${form.title.value} is posted`,
          icon: "success",
        });
        form.reset();
        navigate(`/jobs/${res.data.insertedId}`);
      }
    });
  };

  if (user?.role === "freelancer") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Heading>
          This is to hire people for your project, not to find a job / project
        </Heading>
      </div>
    );
  }

  return (
    <section className="bg-slate-900 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading>Post Your Next Project</Heading>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg shadow-xl p-8 mt-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
              Describe Your Project
            </span>
          </h2>
          <form className="space-y-6" onSubmit={handlePostJob}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Job Title"
                inputName="title"
                inputType="text"
                icon={<BriefcaseIcon className="h-5 w-5 text-rose-400" />}
              />
              <InputField
                label="Salary / Compensation"
                inputName="projectRate"
                inputType="text"
                icon={<CurrencyDollarIcon className="h-5 w-5 text-rose-400" />}
              />
            </div>
            <TextArea
              label="Job Description"
              type="text"
              name="jobDescription"
              icon={<DocumentTextIcon className="h-5 w-5 text-rose-400" />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextArea
                label="Keywords"
                type="text"
                name="keyword"
                placeholder="Use ; after each keyword, e.g., web; it; tech"
                icon={<TagIcon className="h-5 w-5 text-rose-400" />}
              />
              <TextArea
                label="Required Skills"
                type="text"
                name="skill"
                placeholder="Use ; after each skill, e.g., figma; html; css"
                icon={<TagIcon className="h-5 w-5 text-rose-400" />}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-rose-400">
                  Project Category
                </label>
                <select
                  name="category"
                  className="w-full p-3 rounded-md bg-slate-600 text-white border border-slate-500 focus:border-rose-400 focus:ring focus:ring-rose-300 focus:ring-opacity-50"
                  onChange={handleSubCategories}
                >
                  <option value="">Choose your project category</option>
                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category.category}
                      className="capitalize"
                    >
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
              {subCategories && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-rose-400">
                    Sub Category
                  </label>
                  <select
                    name="subCategory"
                    className="w-full p-3 rounded-md bg-slate-600 text-white border border-slate-500 focus:border-rose-400 focus:ring focus:ring-rose-300 focus:ring-opacity-50"
                  >
                    <option value="">Choose your project sub-category</option>
                    {subCategories.subCategories.map((subCategory, idx) => (
                      <option key={idx} value={subCategory} className="capitalize">
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Deadline"
                inputName="deadline"
                inputType="date"
                icon={<CalendarIcon className="h-5 w-5 text-rose-400" />}
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-rose-400">
                  Job Type
                </label>
                <select
                  name="jobType"
                  className="w-full p-3 rounded-md bg-slate-600 text-white border border-slate-500 focus:border-rose-400 focus:ring focus:ring-rose-300 focus:ring-opacity-50"
                >
                  <option value="">Choose job type</option>
                  <option value="fullTime">Full time</option>
                  <option value="project">Project base</option>
                  <option value="partTime">Part time</option>
                </select>
              </div>
            </div>
            <DragAndDrop
              name="attachment"
              fileTypes={fileTypes}
              label="Upload your file here"
              placeholder="Drag or drop your file here"
              handler={handleChange}
              file={attachment}
            >
              {attachment && !isLoading && (
                <p className="text-rose-400 text-center w-full p-4 bg-slate-600 rounded-md border border-dashed border-rose-400">
                  {attachment.name}
                </p>
              )}
              {isLoading && (
                <p className="text-rose-400 text-center w-full p-4 bg-slate-600 rounded-md border border-dashed border-rose-400 animate-pulse">
                  Uploading...
                </p>
              )}
            </DragAndDrop>
            <InputSubmitForForm
              type="submit"
              value="Post Your Job / Project"
            />
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default PostJob;

