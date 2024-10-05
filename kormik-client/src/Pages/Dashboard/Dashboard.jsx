import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxios from "../../hooks/useAxios/useAxios";
import useAxiosForData from "../../hooks/useAxiosForData/useAxiosForData";
import { ArrowLongRightIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import Card from "../../Shared/Card/Card";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { user, setLoading } = useAuth();
  const axiosSecure = useAxios();
  const [profile, setProfile] = useState();
  const [projects] = useAxiosForData(`/jobs?jobPosterMail=${user?.email}`);
  const [bids] = useAxiosForData(`/bids?bidderEmail=${user?.email}`)
  useEffect(() => {
    axiosSecure.get(`/users?email=${user?.email}`).then((res) => {
      setProfile(res.data);
      setLoading(false);
      toast.success(`welcome ${res.data?.name}`);
    });
  }, []);
  return (
    <section className="p-6 mx-2 flex flex-col md:flex-row justify-between">
      <div>
        <div className="flex flex-col gap-4">
          <UserCircleIcon className="size-32 p-2 border-2 border-white text-white" />
          <h2 className="text-3xl font-bold text-white">{profile?.name}</h2>
          <p className="text-white font-sans font-semibold">{profile?.email}</p>
        </div>
        <h2 className="font-semibold my-6 text-xl text-white capitalize">
          other information
        </h2>
        <div className="flex flex-col md:flex-row gap-4 text-white my-4">
          <p>Country: {profile?.country}</p>
          <p>
            {profile?.employerCompanyName
              ? profile?.employerCompanyName
              : profile?.title}
          </p>
        </div>
      </div>
      {profile?.role === "employer" && (
        <div className="p-4 bg-slate-800 rounded-md">
          <h2 className="text-2xl text-rose-500 font-semibold">
            Total Projects: {projects.length}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            {projects.map((project) => (
              <Card key={project._id} title={project?.title}>
                <Link
                  to={`/jobs/${project._id}`}
                  className="flex flex-row gap-3 justify-between items-center text-rose-500 my-4"
                >
                  Checkout{" "}
                  <ArrowLongRightIcon className="size-6 text-rose-500 hover:size-7"></ArrowLongRightIcon>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
      {
        profile?.role === 'freelancer' && (
            <div className="p-4 bg-slate-800 rounded-md">
                    <h2 className="text-2xl text-rose-500 font-semibold capitalize">
                Bids you won: {bids.length}
          </h2>
            </div>
        )
      }
    </section>
  );
};

export default Dashboard;
