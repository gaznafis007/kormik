import  { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { TrashIcon, CalendarIcon, BriefcaseIcon, TagIcon, UserIcon, ClockIcon, CurrencyDollarIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import JobSpecification from "./JobSpecification/JobSpecification";
import useAuth from "../../hooks/useAuth/useAuth";
import InputField from "../../Shared/InputField/InputField";
import TextArea from "../../Shared/TextArea/TextArea";
import InputSubmitForForm from "../../Shared/InputSubmitForForm/InputSubmitForForm";
import ButtonBlock from "../../Shared/ButtonBlock/ButtonBlock";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios/useAxios";
import Bids from "./JobSpecification/Bids/Bids";
import Button from "../../Shared/Button/Button";
import ProjectTexting from "./ProjectTexting/ProjectTexting";
import Loading from "../../Shared/Loading/Loading";

const Job = () => {
  const navigate = useNavigate();
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
    attachment,
    winnerId,
    status
  } = useLoaderData();
  const [bidForm, setBidForm] = useState(false);
  const [winner, setWinner] = useState({});
  const posted = postDate.split("T")[0];
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();
  const [bidLoading, setBidLoading] = useState(false);
  const [isBidSubmitted, setIsBidSubmitted] = useState(false);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/bids?jobId=${_id}`).then((res) => setBids(res.data));
    if (winnerId) {
      axiosSecure.get(`/bids/${winnerId}`).then((res) => setWinner(res.data));
    }
  }, [axiosSecure, _id, winnerId]);

  const handleStartBiding = () => {
    setBidForm(!bidForm);
  };

  const handlePlaceBid = (event) => {
    event.preventDefault();
    const form = event.target;
    const bidTitle = form.bidTitle.value;
    const bidPrice = form.bidPrice.value;
    const coverLetter = form.coverLetter.value;
    const proposeDate = form.proposeDate.value;
    const milestones = form.milestone.value.split(";");
    const bid = {
      bidTitle,
      bidPrice,
      coverLetter,
      proposeDate,
      jobPoster,
      jobPosterMail,
      milestones,
      bidder: user?.displayName,
      bidderEmail: user?.email,
      jobId: _id,
    };

    setBidLoading(true);
    axiosSecure.post("bids", bid).then((res) => {
      if (res.data.acknowledged) {
        setBidLoading(false);
        setIsBidSubmitted(true);
        setBidForm(false);
        Swal.fire({
          title: "Your bid is placed successfully",
          icon: "success",
        });
      }
    });
  };

  const handleJobDelete = (id) => {
    axiosSecure.delete(`/jobs/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "You have deleted this job post",
          icon: "warning",
        });
        navigate("/jobs");
      }
    });
  };

  if (loading) {
    return <Loading type="spinner" size="md" text="Loading job..." />;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full lg:w-2/3"
        >
          <h1 className="text-4xl font-bold text-rose-500 capitalize mb-4">{title}</h1>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
            <div className="flex items-center mb-4">
              <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">{`@${jobPoster}`}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span>Posted on: {posted}</span>
              </div>
              <div className="flex items-center">
                <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="capitalize">Category: {category}</span>
              </div>
              <div className="flex items-center">
                <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="capitalize">Job Type: {jobType}</span>
              </div>
              {status && (
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="capitalize">Status: {status}</span>
                </div>
              )}
            </div>
          </div>

          <JobSpecification title="Description">{jobDescription}</JobSpecification>
          <JobSpecification title="Required Skills">
            <ul className="text-white capitalize list-disc ml-6">
              {skill.map((oneSkill, idx) => (
                <li key={idx}>{oneSkill}</li>
              ))}
            </ul>
          </JobSpecification>
          <JobSpecification title="Salary / Compensation / Rate">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span>{`${projectRate} $`}</span>
            </div>
          </JobSpecification>
          <JobSpecification title="Deadline">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span>{deadline}</span>
            </div>
          </JobSpecification>
          <JobSpecification title="Attachment">
            <div className="flex items-center mb-2">
              <PaperClipIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span>Document Preview</span>
            </div>
            <iframe
              src={attachment}
              className="w-full h-[300px] rounded-lg border border-gray-700"
              title="document preview"
            ></iframe>
          </JobSpecification>
          {user?.email === jobPosterMail && (
            <Button handler={handleJobDelete} params={_id} className="mt-4">
              <TrashIcon className="h-5 w-5 mr-2" /> Delete this job
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full lg:w-1/3"
        >
          {!status && !winner?.bidderEmail && user?.email === jobPosterMail && (
            <Bids bids={bids} setBids={setBids} />
          )}
          {!status && winner?.bidderEmail && (user?.email === jobPosterMail || user?.email === winner?.bidderEmail) && (
            <ProjectTexting winner={winner} />
          )}
        </motion.div>
      </div>

      {user.role === "freelancer" && !isBidSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          {bidForm ? (
            <ButtonBlock handler={handleStartBiding}>Cancel Bid</ButtonBlock>
          ) : (
            <ButtonBlock handler={handleStartBiding}>Submit Your Bid</ButtonBlock>
          )}
        </motion.div>
      )}

      {isBidSubmitted && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-2xl text-rose-500 text-center capitalize font-sans font-semibold mt-8"
        >
          Your bid is submitted!
        </motion.h2>
      )}

      {bidForm && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onSubmit={handlePlaceBid}
          className="bg-gray-800 flex flex-col gap-4 md:w-2/3 mx-auto rounded-lg shadow-lg p-8 mt-8"
        >
          <InputField label="Bid title" inputName="bidTitle" inputType="text" />
          <InputField label="Your bid (price)" inputName="bidPrice" inputType="text" />
          <InputField label="Propose your approximate submission date" inputName="proposeDate" inputType="date" />
          <TextArea
            label="Cover letter"
            type="text"
            name="coverLetter"
            placeholder="Throw your best pitch to grab this project"
          />
          <TextArea
            label="Describe your milestone of this project"
            type="text"
            name="milestone"
            placeholder="Please use ; to separate milestones"
          />
          <InputSubmitForForm type="submit" value={bidLoading ? "Loading..." : "Place your bid"} />
        </motion.form>
      )}
    </motion.section>
  );
};

export default Job;

