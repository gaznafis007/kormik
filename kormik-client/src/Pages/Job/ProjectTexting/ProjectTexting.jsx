/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import Button from "../../../Shared/Button/Button";
import Heading from "../../../Shared/Heading/Heading";
import DragAndDrop from "../../../Shared/DragAndDrop/DragAndDrop";
import { getDownloadURL } from "firebase/storage";
import { TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import TextArea from "../../../Shared/TextArea/TextArea";
import useAxios from "../../../hooks/useAxios/useAxios";
import Chat from "../Chat/Chat";

const ProjectTexting = ({ winner }) => {
  const { _id } = winner;
  const axiosSecure = useAxios();
  const { user, uploadFile } = useAuth();
  const [winningBid, setWinningBid] = useState({});
  const [submissionLetter, setSubmissionLetter] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false)
  const [attachment, setAttachment] = useState(null);
  const fileTypes = ["PDF", "JPEG", "PNG", "XLSX", "JPG"];
  const [conversations, setConversations] = useState(winningBid?.conversations);
  // console.log(winner)
  const handleDescription = (event) => {
    setSubmissionLetter(event.target.value);
    // console.log(event.target.value)
  };
  const handleChange = (file) => {
    if (!file) {
      return;
    }
    setAttachment(file);
    setPreviewURL(URL.createObjectURL(file));
  };
  const handleWithoutFile = () =>{
    const conversation = {
        sender: user?.role,
        description: submissionLetter,
      };
      axiosSecure.patch(`/winners/${_id}`, conversation)
      .then(res=>{
        if(res.data.modifiedCount > 0){
          const newConversations = [...conversations, conversation];
          setConversations(newConversations);
            toast.success('Sent successfully!')
        }
      })
  }
  const handleProjectFileUpload = async () => {
    if (!attachment) {
      toast.error("Attachment is not available");
      return;
    }
    setLoading(true);
    uploadFile(attachment).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrl(url);
        setLoading(false);
        // console.log(url);
        const conversation = {
          sender: user?.role,
          description: submissionLetter,
          fileUrl: url,
        };
        axiosSecure.patch(`/winners/${_id}`, conversation).then((res) => {
          // console.log(res.data);
          if (res.data.modifiedCount > 0) {
            setSubmissionLetter('')
            toast.success("Sent successfully!");
          }
        });
      });
    });
    // console.log(submissionLetter)
  };
  const removeFile = () => {
    setAttachment(null);
    setPreviewURL("");
    setFileUrl("");
  };
  const handleAcceptProject = () =>{
    setProjectLoading(true)
    axiosSecure.patch(`/winners/complete/${_id}`)
    .then(res =>{
      console.log(res.data)
      setProjectLoading(false)
    })
  }
  // for refactoring test
  // console.log(user, 'project texting user info')
  useEffect(() =>{
    axiosSecure.get(`/winners?bidderEmail${winner?.bidderEmail}`)
    .then(res =>{
      // console.log(res.data);
      setWinningBid(res.data[0])
    })
  },[handleProjectFileUpload])
  return (
    <div className="p-6 w-full md:w-1/3 overflow-y-auto border-2 rounded-md border-slate-900 shadow-md shadow-slate-300">
      <Heading>project corresponding</Heading>
      {user?.role === "employer" ? (
        <>
        {
          winningBid?.conversations && (
            <Chat winner={winningBid}></Chat>
          )
        }
        <TextArea
          handler={handleDescription}
          label={"describe your submission"}
          type={"text"}
          name={"description"}
          placeholder={"Write submission description"}
        ></TextArea>
        <DragAndDrop
          name={"attachment"}
          fileTypes={fileTypes}
          label={"upload your file here"}
          placeholder={"Drag or drop your file here"}
          handler={handleChange}
          file={attachment}
        >
          {attachment && !loading && (
            <p className="text-rose-500 text-center w-full cursor-pointer p-4 bg-transparent rounded-md border border-dashed border-rose-500">
              {attachment.name}
            </p>
          )}
          {loading && (
            <p className="text-rose-500 text-center w-full cursor-pointer p-4 bg-transparent rounded-md border border-dashed border-rose-500 animate-ping">
              Loading....
            </p>
          )}
        </DragAndDrop>

        {/* File Preview */}
        {previewURL && (
          <div className="mt-4">
            <h3 className="text-center text-rose-500">File Preview:</h3>
            <Button handler={removeFile}>
              <TrashIcon className="size-7 text-white"></TrashIcon> Remove
              File
            </Button>
            {/* Preview for Images */}
            {attachment?.type.startsWith("image/") && (
              <img
                src={previewURL}
                alt="Preview"
                className="w-full h-auto rounded-md border border-rose-500 mt-2"
              />
            )}

            {/* Preview for PDF */}
            {attachment?.type === "application/pdf" && (
              <iframe
                src={previewURL}
                className="w-full h-64 rounded-md border border-rose-500 mt-2"
                title="PDF Preview"
              ></iframe>
            )}

            {/* Fallback for Other Files */}
            {!attachment?.type.startsWith("image/") &&
              attachment?.type !== "application/pdf" && (
                <p className="text-center text-gray-600 mt-2">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {attachment.name}
                  </a>
                </p>
              )}
          </div>
        )}
        <div className="flex flex-col justify-between md:flex-row">
        <Button handler={attachment ? handleProjectFileUpload : handleWithoutFile}>
          {loading ? "sending..." : "Send Instructions"}
        </Button>
        <Button handler={handleAcceptProject}>
          {projectLoading ? 'loading...........':'Accept the project and pay'}
        </Button>
        </div>
      </>
      ) : (
        <>
        {
          winningBid?.conversations && (
            <Chat winner={winningBid}></Chat>
          )
        }
          <TextArea
            handler={handleDescription}
            label={"describe your submission"}
            type={"text"}
            name={"description"}
            placeholder={"Write submission description"}
            defaultValue={submissionLetter}
          ></TextArea>
          <DragAndDrop
            name={"attachment"}
            fileTypes={fileTypes}
            label={"upload your file here"}
            placeholder={"Drag or drop your file here"}
            handler={handleChange}
            file={attachment}
          >
            {attachment && !loading && (
              <p className="text-rose-500 text-center w-full cursor-pointer p-4 bg-transparent rounded-md border border-dashed border-rose-500">
                {attachment.name}
              </p>
            )}
            {loading && (
              <p className="text-rose-500 text-center w-full cursor-pointer p-4 bg-transparent rounded-md border border-dashed border-rose-500 animate-ping">
                Loading....
              </p>
            )}
          </DragAndDrop>

          {/* File Preview */}
          {previewURL && (
            <div className="mt-4">
              <h3 className="text-center text-rose-500">File Preview:</h3>
              <Button handler={removeFile}>
                <TrashIcon className="size-7 text-white"></TrashIcon> Remove
                File
              </Button>
              {/* Preview for Images */}
              {attachment?.type.startsWith("image/") && (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-full h-auto rounded-md border border-rose-500 mt-2"
                />
              )}

              {/* Preview for PDF */}
              {attachment?.type === "application/pdf" && (
                <iframe
                  src={previewURL}
                  className="w-full h-64 rounded-md border border-rose-500 mt-2"
                  title="PDF Preview"
                ></iframe>
              )}

              {/* Fallback for Other Files */}
              {!attachment?.type.startsWith("image/") &&
                attachment?.type !== "application/pdf" && (
                  <p className="text-center text-gray-600 mt-2">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {attachment.name}
                    </a>
                  </p>
                )}
            </div>
          )}
          <Button handler={handleProjectFileUpload}>
            {loading ? "submitting..." : "submit project file"}
          </Button>
        </>
      )}
    </div>
  );
};

export default ProjectTexting;
