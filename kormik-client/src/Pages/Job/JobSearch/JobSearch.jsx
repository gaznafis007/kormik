/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import InputField from "../../../Shared/InputField/InputField";
import InputSubmitForForm from "../../../Shared/InputSubmitForForm/InputSubmitForForm";
import Loading from "../../../Shared/Loading/Loading";

const JobSearch = ({
  categories,
  subCategories,
  handleSubCategories,
  isLoading,
  handleSearch,
  handleTitleSearch,
  handleJobTypeSearch,
}) => {
  if (isLoading) {
    return (
      <Loading type="spinner" size="md" text="Loading jobs..."/>
    );
  }
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSearch}
      className="bg-slate-800 p-6 rounded-lg shadow-lg my-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InputField
          handler={handleTitleSearch}
          inputName="title"
          inputType="text"
          label="Job Title"
        />
        <div className="flex flex-col gap-2">
          <label className="text-rose-400 font-semibold">Project Category</label>
          <select
            name="category"
            className="w-full p-2 rounded-md bg-slate-700 text-white border border-slate-600 focus:border-rose-400 focus:ring focus:ring-rose-300 focus:ring-opacity-50"
            onChange={handleSubCategories}
          >
            <option value="">Choose project category</option>
            {categories &&
              categories.map((category) => (
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
          <div className="flex flex-col gap-2">
            <label className="text-rose-400 font-semibold">Sub Category</label>
            <select
              name="subCategory"
              className="w-full p-2 rounded-md bg-slate-700 text-white border border-slate-600 focus:border-rose-400 focus:ring focus:ring-rose-300 focus:ring-opacity-50"
            >
              <option value="">Choose project sub-category</option>
              {subCategories.subCategories.map((subCategory, idx) => (
                <option key={idx} value={subCategory} className="capitalize">
                  {subCategory}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-rose-400 font-semibold">Job Type</label>
          <select
            name="jobType"
            className="w-full p-2 rounded-md bg-slate-700 text-white border border-slate-600 focus:border-rose-400 focus:ring focus:ring-rose-300 focus:ring-opacity-50"
            onChange={handleJobTypeSearch}
          >
            <option value="">Choose job type</option>
            <option value="fullTime">Full time</option>
            <option value="project">Project base</option>
            <option value="partTime">Part time</option>
          </select>
        </div>
      </div>
      <InputSubmitForForm type="submit" value="Search Jobs" />
    </motion.form>
  );
};

export default JobSearch;
