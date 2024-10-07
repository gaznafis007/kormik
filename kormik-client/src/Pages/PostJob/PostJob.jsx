import { useState } from "react";
import useAxiosForData from "../../hooks/useAxiosForData/useAxiosForData";
import Heading from "../../Shared/Heading/Heading";
import InputField from "../../Shared/InputField/InputField";
import TextArea from "../../Shared/TextArea/TextArea";
import useAxios from "../../hooks/useAxios/useAxios";
import InputSubmitForForm from "../../Shared/InputSubmitForForm/InputSubmitForForm";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import { FileUploader } from "react-drag-drop-files";
import DragAndDrop from "../../Shared/DragAndDrop/DragAndDrop";

const PostJob = () => {
  const fileTypes = ["PDF", "JPEG", "PNG", "XLSX"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    console.log(file)
  };
  const [categories] = useAxiosForData("/categories");
  const [subCategories, setSubCategories] = useState("");
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const handleSubCategories = (event) => {
    event.preventDefault();
    const category = event.target.value;
    // for test purpose
    // console.log(category);
    axiosSecure.get(`/subCategories/${category}`).then((res) => {
      setSubCategories(res.data);
    });
  };
  const handlePostJob = (event) => {
    event.preventDefault();
    const form = event.target;
    // const formData = new FormData();
    // formData.append("attachment", form.attachment.files[0]);
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
      attachment: form.attachment,
    };
    console.log(job)
    // axiosSecure.post("/jobs", job).then((res) => {
    //   if (res.data.acknowledged) {
    //     Swal.fire({
    //       title: `Congrats, your job / project for ${form.title.value} is posted`,
    //       icon: "success",
    //     });
    //   }
    // });
  };

  if (user?.role === "freelancer") {
    return (
      <>
        <Heading>
          this is to hire people for your project not to find job / project
        </Heading>
      </>
    );
  }
  return (
    <section>
      <Heading>Solve your next project from here</Heading>
      <div className="w-full mx-4 bg-slate-600 rounded-md shadow-gray-700 p-4 md:w-2/3 md:mx-auto">
        <h2 className="text-rose-500 text-2xl font-sans font-thin text-center">
          Write down your project / job details below and get your work done by
          amazing talents
        </h2>
        <form className="my-6 mx-4" onSubmit={handlePostJob}>
          <InputField
            label={"job title"}
            inputName={"title"}
            inputType={"text"}
          ></InputField>
          <TextArea
            label={"job description"}
            type={"text"}
            name={"jobDescription"}
          ></TextArea>
          <InputField
            label={"salary / compensation"}
            inputName={"projectRate"}
            inputType={"text"}
          ></InputField>
          <TextArea
            label={"keyword"}
            type={"text"}
            name={"keyword"}
            placeholder={"use ; after one keyword ex: web; it; tech"}
          ></TextArea>
          <TextArea
            label={"skill"}
            type={"text"}
            name={"skill"}
            placeholder={"use ; after one keyword ex: figma, html; css"}
          ></TextArea>
          <div className="flex flex-col my-2 gap-4">
            <label className="capitalize text-rose-500">
              Choose project category
            </label>
            <select
              name="category"
              className="w-full p-2 rounded-md border border-rose-500"
              onChange={handleSubCategories}
            >
              <option selected>Chose your project category</option>
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
            <div className="flex flex-col my-2 gap-4">
              <label className="capitalize text-rose-500">Sub category</label>
              <select
                name="subCategory"
                className="w-full p-2 rounded-md border border-rose-500"
              >
                <option selected>Chose your project sub-category</option>
                {subCategories.subCategories.map((subCategory, idx) => (
                  <option key={idx} className="capitalize" value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
          )}
          <InputField
            label={"deadline"}
            inputName={"deadline"}
            inputType={"date"}
          ></InputField>
          <div className="flex flex-col my-2 gap-4">
            <label className="capitalize text-rose-500">job type</label>
            <select
              name="jobType"
              className="w-full p-2 rounded-md border border-rose-500"
            >
              <option selected>Chose job type</option>
              <option value={"fullTime"}>Full time</option>
              <option value={"project"}>Project base</option>
              <option value={"partTime"}>Part time</option>
            </select>
          </div>
          {/* <InputField
            className={"bg-white"}
            label={"attach guidance or necessary file if you have any"}
            inputName={"attachment"}
            inputType={"file"}
          ></InputField> */}
          <DragAndDrop
            name={"attachment"}
            fileTypes={fileTypes}
            label={"upload your file here"}
            placeholder={"Drag or drop your file here"}
            handler={handleChange}
            file={file}
          >
            {
              file && (
                <p className="text-rose-500 text-center w-full cursor-pointer p-4 bg-transparent rounded-md border border-dashed border-rose-500">{file.name}</p>
              )
            }
          </DragAndDrop>
          <InputSubmitForForm
            type={"submit"}
            value={"post yor job / project"}
          ></InputSubmitForForm>
        </form>
      </div>
    </section>
  );
};

export default PostJob;
