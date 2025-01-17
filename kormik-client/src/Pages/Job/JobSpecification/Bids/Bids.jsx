/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../../../hooks/useAxios/useAxios";
import Heading from "../../../../Shared/Heading/Heading";
import Card from "../../../../Shared/Card/Card";
import Button from "../../../../Shared/Button/Button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const Bids = ({ bids, setBids }) => {
  const biddings = [...bids]
  const axiosSecure = useAxios();
  
  const [seeDetails, setSeeDetails] = useState("");
  const handleSeeDetails = (id) => {
    setSeeDetails(id);
  };
  const handleDelete = (id) => {
    console.log(id);
    axiosSecure.delete(`/bids/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Bid deleted successfully!",
          icon: "error",
        });
        const newBids = biddings.filter((bid) => bid._id !== id);
        setBids(newBids);
      }
    });
  };
  const handleBidWinner = (ids) => {
    console.log(ids[0]);
    console.log(ids[1]);
    console.log(ids);
    const bidId = { bidId: ids[0] };
    const winner = { status: "winner" };
    const winningBid = ids[2];
    winningBid.bidId = ids[0]
    axiosSecure.put(`/bids/${ids[0]}`, winner).then((res) => {
      if (res.data.modifiedCount > 0) {
        axiosSecure.put(`/jobs/${ids[1]}`, bidId).then((res) => {
          if (res.data.modifiedCount > 0) {
            axiosSecure.post("/winners", { winningBid }).then((res) => {
              if (res.data.acknowledged) {
                Swal.fire({
                  title: "congrats!, you chose your talent",
                  icon: "success",
                });
              }
            });
          }
        });
      }
    });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 overflow-y-auto bg-slate-800 rounded-lg shadow-lg"
    >
      <Heading>
        <span className="text-3xl font-bold text-rose-500">All Pitches</span>
      </Heading>
      <motion.div 
        className="flex flex-col gap-4 mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {biddings.length ? (
          biddings.map((bid) => (
            <Card key={bid._id} title={bid?.bidTitle}>
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg font-semibold text-rose-400">
                  @{bid?.bidder}
                </h1>
                <button
                  onClick={() => handleSeeDetails(seeDetails === bid._id ? "" : bid._id)}
                  className="text-slate-300 hover:text-rose-500 transition-colors duration-200"
                >
                  {seeDetails === bid._id ? (
                    <ChevronUpIcon className="h-6 w-6" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {seeDetails === bid._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <h2 className="text-rose-500 my-4 capitalize font-semibold">
                      Cover Letter
                    </h2>
                    <p className="text-sm w-full text-slate-300">{bid?.coverLetter}</p>
                    <h2 className="my-4 text-rose-500 capitalize font-semibold">
                      Asking Price:{" "}
                      <span className="text-white font-bold">
                        ${bid?.bidPrice}
                      </span>
                    </h2>
                    <h2 className="text-rose-500 my-4 font-semibold">Milestones</h2>
                    <ul className="list-disc ml-4 capitalize text-slate-300">
                      {bid?.milestones?.map((milestone) => (
                        <li key={milestone}>
                          {milestone}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button
                        handler={handleBidWinner}
                        params={[bid?._id, bid?.jobId, bid]}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                      >
                        Choose this bid
                      </Button>
                      <Button 
                        handler={handleDelete} 
                        params={bid?._id}
                        className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))
        ) : (
          <Heading>
            <span className="text-2xl font-semibold text-slate-400">No bids submitted yet</span>
          </Heading>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Bids;

