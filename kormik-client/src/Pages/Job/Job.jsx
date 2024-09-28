/* eslint-disable react/no-unescaped-entities */
import { useLoaderData } from "react-router-dom";
import JobSpecification from "./JobSpecification/JobSpecification";
import useAuth from "../../hooks/useAuth/useAuth";
import { useState } from "react";
import InputField from "../../Shared/InputField/InputField";
import TextArea from "../../Shared/TextArea/TextArea";
import InputSubmitForForm from "../../Shared/InputSubmitForForm/InputSubmitForForm";
import ButtonBlock from "../../Shared/ButtonBlock/ButtonBlock";
import Swal from "sweetalert2";
const Job = () => {
  const {
    _id,
    title,
    jobPoster,
    jobPosterMail,
    jobDescription,
    skill,
    projectRate,
    deadline,
    postDate,
    category,
    jobType,
  } = useLoaderData();
  const [bidForm, setBidForm] = useState(false);
  const posted = postDate.split("T")[0];
  const { user, loading } = useAuth();
  const handleStartBiding = () => {
    setBidForm(!bidForm);
  };
  const handlePlaceBid = event =>{
    event.preventDefault();
    const form = event.target;
    const bidTitle = form.bidTitle.value;
    const bidPrice = form.bidPrice.value;
    const coverLetter = form.coverLetter.value;
    const proposeDate = form.proposeDate.value;
    const bid = {
        bidTitle,
        bidPrice,
        coverLetter,
        proposeDate,
        jobPoster,
        jobPosterMail,
        bidder: user?.displayName,
        bidderEmail: user?.email,
        jobId: _id,
    }
    console.log(bid)
    Swal.fire({
        title: "Your bid is placed",
        icon: "success"
    })
  }
  if (loading) {
    return (
      <h2 className="text-rose-500 text-center text-3xl animate-pulse">
        Loading..
      </h2>
    );
  }
  return (
    <section className="mx-8 my-4">
      <h1 className="text-4xl font-bold text-rose-500 capitalize">{title}</h1>
      <h3 className="text-lg font-semibold font-sans text-white">{`@${jobPoster}`}</h3>
      <h3 className="text-lg font-semibold font-sans my-6 text-gray-200">
        Job posted on: {posted}
      </h3>
      <h3 className="text-lg font-semibold font-sans my-6 text-gray-200 capitalize">
        Category: {category}
      </h3>
      <h3 className="text-lg font-semibold font-sans my-6 text-gray-200 capitalize">
        job type: {jobType}
      </h3>
      <JobSpecification title={"description"}>
        {jobDescription}
      </JobSpecification>
      <JobSpecification title={"required skills"}>
        <ul className="text-white capitalize list-disc mx-4">
          {skill.map((oneSkill, idx) => (
            <li key={idx}>{oneSkill}</li>
          ))}
        </ul>
      </JobSpecification>
      <JobSpecification title={"Salary / Compensation / Rate"}>
        {`${projectRate} $`}
      </JobSpecification>
      <JobSpecification title={"deadline"}>{deadline}</JobSpecification>
      {user.role === "freelancer" &&
        (bidForm ? (
          <ButtonBlock handler={handleStartBiding}>cancel bid</ButtonBlock>
        ) : (
          <ButtonBlock handler={handleStartBiding}>submit your bid</ButtonBlock>
        ))}
      {bidForm && (
        <>
          <form onSubmit={handlePlaceBid} className="bg-gray-800 flex flex-col gap-4 md:w-1/2 mx-4 md:mx-auto rounded-md shadow-md shadow-slate-600 p-8">
          <InputField label={"Bid title"} inputName={"bidTitle"} inputType={"text"}></InputField>
          <InputField label={"your bid (price)"} inputName={"bidPrice"} inputType={"text"}></InputField>
          <InputField label={"propose your approximate when you can submit"} inputName={"proposeDate"} inputType={"date"}></InputField>
          <TextArea label={"cover letter"} type={"text"} name={"coverLetter"} placeholder={"Throw your best pitch to grab this project"}></TextArea>
          <InputSubmitForForm type={"submit"} value={"place your bid"}/>
          </form>
        </>
      )}
    </section>
  );
};

export default Job;
