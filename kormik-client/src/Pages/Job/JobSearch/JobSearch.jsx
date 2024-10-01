/* eslint-disable react/prop-types */

import Button from "../../../Shared/Button/Button";
import InputField from "../../../Shared/InputField/InputField";
import InputSubmitForForm from "../../../Shared/InputSubmitForForm/InputSubmitForForm";


const JobSearch = ({ categories, subCategories, handleSubCategories, isLoading }) => {
    const handleSearch = event =>{
        event.preventDefault()
        const form = event.target;
        const title = form.title.value;
        const category = form.category.value;
        const subCategory = form.subCategory.value;
        console.log(title, category, subCategory)
    }

  if (isLoading) {
    return (
      <h2 className="text-center text-2xl text-rose-500 font-sans font-semibold animate-ping">
        Loading...
      </h2>
    );
  }
  return (
    <form onSubmit={handleSearch} className="p-4 my-6">
      <div className="grid grid-col-1 md:grid-cols-3 gap-4">
      <InputField
        inputName={"title"}
        inputType={"text"}
        label={"job title"}
      ></InputField>
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
          {categories &&
            categories?.map((category) => (
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
                {
                subCategories?.subCategories?.map((subCategory, idx) => (
                  <option key={idx} className="capitalize" value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
          )
        }
      </div>
        <InputSubmitForForm type={"submit"} value={"search"}></InputSubmitForForm>
    </form>
  );
};

export default JobSearch;
