import { useEffect, useState } from "react";
import useAxiosForData from "../../hooks/useAxiosForData/useAxiosForData";
import Heading from "../../Shared/Heading/Heading";
import InputField from "../../Shared/InputField/InputField";
import TextArea from "../../Shared/TextArea/TextArea";
import useAxios from "../../hooks/useAxios/useAxios";

const PostJob = () => {
  const [categories] = useAxiosForData("/categories");
  const [subCategories, setSubCategories] = useState("")
  const axiosSecure = useAxios()
  const handleSubCategories = event =>{
    event.preventDefault()
    const category = event.target.value
    console.log(category)
    axiosSecure.get(`/subCategories/${category}`)
    .then(res =>{
        setSubCategories(res.data)
    })
}
console.log(subCategories)
  return (
    <section>
      <Heading>Solve your next project from here</Heading>
      <div className="w-full mx-4 bg-slate-600 rounded-md shadow-gray-700 p-4 md:w-2/3 md:mx-auto">
        <h2 className="text-rose-500 text-2xl font-sans font-thin text-center">
          Write down your project / job details below and get your work done by
          amazing talents
        </h2>
        <form className="my-6 mx-4">
          <InputField
            label={"job title"}
            inputName={"jobTitle"}
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
            placeholder={"user ; after one keyword"}
          ></TextArea>
          <div className="flex flex-col gap-4">
            <label className="capitalize text-rose-500">
              Choose project category
            </label>
            <select
              name="companySize"
              className="w-full p-2 rounded-md border border-rose-500"
              onChange={handleSubCategories}
            >
              <option selected>Chose your project category</option>
              {
                categories.map(category => <option key={category._id} className="capitalize">{category.category}</option>)
              }
            </select>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostJob;
