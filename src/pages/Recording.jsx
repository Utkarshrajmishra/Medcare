import NavBar from "@/components/NavBar";
import { Recorder } from "@/components/Recorder";
import { useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Recording = () => {
  const navigation=useNavigate()
  const [dialogStatus, setDialogStatus] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startToast = () => {
    toast.success("Recording Started!");
  };

  const redirect=()=>{
    if(!transcript) return toast.error("No recording found!")
    toast.success("Recording Saved!");
    setDialogStatus(false);
    navigation("/audio-prediction",{state:{transcript:transcript}});
  }

  const stopToast = () => {
    toast.error("Recording Stopped");
  };

  

  const openDialog = () => {
    setDialogStatus(true);
    setTranscript(""); 
  };

  const closeDialog = () => {
    setDialogStatus(false);
  };

  return (
    <>
      <section>
        <NavBar />
        <section className="md:px-20 flex-col md:flex-row px-10 py-8 flex h-[85vh] items-center justify-center gap-10">
          <div className="w-full md:w-[50%] h-[300px] bg-blue-50 outline-1 outline outline-irisBlueColor flex items-center justify-center rounded-md">
            <FaMicrophoneAlt fontSize={100} className="text-neutral-800 " />
          </div>
          <div className="md:w-[50%] w-full flex flex-col gap-3">
            <div>
              <p className="text-3xl font-semibold">
                Voice-Based Symptom Analysis
              </p>
              <p className="text-gray-600 mt-1">
                Speak your symptoms, and let our AI assist you in identifying
                potential health concerns.
              </p>
            </div>
            <p className="text-gray-600">
              Our Voice-Based Symptom Analysis feature is intended to provide
              general information and is not a substitute for professional
              medical advice, diagnosis, or treatment.
            </p>
            <p className="text-red-600">
              <sup>*</sup>Always consult with a qualified healthcare provider
              for accurate medical guidance.
            </p>
            <button
              onClick={openDialog}
              className="bg-irisBlueColor mt-4 py-2 rounded text-white font-semibold"
            >
              Start Recording
            </button>
          </div>
        </section>
      </section>
      <Recorder
        isOpen={dialogStatus}
        onClose={closeDialog}
        startToast={startToast}
        stopToast={stopToast}
        setTranscript={setTranscript}
        savedToast={redirect}
        
      />    
    </>
  );
};

export default Recording;
