/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxios from "../../hooks/useAxios/useAxios";
import useAxiosForData from "../../hooks/useAxiosForData/useAxiosForData";
import { ArrowLongRightIcon, UserCircleIcon, BriefcaseIcon, TrophyIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, setLoading } = useAuth();
  const axiosSecure = useAxios();
  const [profile, setProfile] = useState();
  const [projects] = useAxiosForData(`/jobs?jobPosterMail=${user?.email}`);
  const [bids] = useAxiosForData(`/winners?bidderEmail=${user?.email}`);

  // console.log(profile)
  useEffect(() => {
    axiosSecure.get(`/users?email=${user?.email}`).then((res) => {
      setProfile(res.data);
      setLoading(false);
      toast.success(`Welcome back, ${res.data?.name}!`);
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
              <div className="flex flex-col items-center space-y-4">
                {profile?.userProfileImage &&(
                  <img src={user?.userProfileImage} alt={profile?.name} className="w-32 h-32 rounded-full border-4 border-rose-500" />
                ) 
               }
               {!profile?.userProfileImage && (
                  <UserCircleIcon className="w-32 h-32 text-rose-500" />
                )}
                <h2 className="text-2xl font-bold text-white">{profile?.name}</h2>
                <span className="px-3 py-1 bg-rose-500 text-white text-sm font-semibold rounded-full">
                  {profile?.role}
                </span>
                <p className="text-slate-300">{profile?.email}</p>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-slate-300">
                  <span className="font-semibold text-rose-400">Country:</span> {profile?.country}
                </p>
                <p className="text-slate-300">
                  <span className="font-semibold text-rose-400">
                    {profile?.employerCompanyName ? "Company:" : "Title:"}
                  </span>{" "}
                  {profile?.employerCompanyName || profile?.title}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Projects/Bids Section */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-rose-400 mb-6">
                {profile?.role === "employer" ? "Your Projects" : "Won Bids"}
              </h2>
              {profile?.role === "employer" ? (
                <EmployerProjects projects={projects} />
              ) : (
                <FreelancerBids bids={bids} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const EmployerProjects = ({ projects }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-white">Total Projects: {projects.length}</h3>
      <Link to="/post-job" className="text-rose-400 hover:text-rose-300 transition-colors duration-200">
        Post New Project
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  </div>
);

const FreelancerBids = ({ bids }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-white">Bids Won: {bids.length}</h3>
      <Link to="/jobs" className="text-rose-400 hover:text-rose-300 transition-colors duration-200">
        Find More Jobs
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {bids.map((bid) => (
        <BidCard key={bid._id} bid={bid} />
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-rose-500 transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div>
        <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">{project.jobDescription}</p>
      </div>
      <BriefcaseIcon className="w-6 h-6 text-rose-400" />
    </div>
    <Link
      to={`/jobs/${project._id}`}
      className="inline-flex items-center text-rose-400 hover:text-rose-300 transition-colors duration-200"
    >
      View Details <ArrowLongRightIcon className="w-5 h-5 ml-2" />
    </Link>
  </motion.div>
);

const BidCard = ({ bid }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-rose-500 transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div>
        <h4 className="text-lg font-semibold text-white mb-2">{bid.bidTitle}</h4>
        <p className="text-slate-300 text-sm mb-4">Bid Amount: ${bid.bidAmount}</p>
      </div>
      <TrophyIcon className="w-6 h-6 text-rose-400" />
    </div>
    <Link
      to={`/jobs/${bid.jobId}`}
      className="inline-flex items-center text-rose-400 hover:text-rose-300 transition-colors duration-200"
    >
      View Project <ArrowLongRightIcon className="w-5 h-5 ml-2" />
    </Link>
  </motion.div>
);

export default Dashboard;

