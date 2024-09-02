import NavBar from "@/components/NavBar";
import { FaMicrophoneAlt } from "react-icons/fa";
const Recording = () => {
  return (
    <section>
      <NavBar />
      <section className="md:px-20 px-10 py-8 flex h-[85vh] items-center justify-center gap-10">
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
            general information and is not a substitute for professional medical
            advice, diagnosis, or treatment.
          </p>
          <p className="text-red-600">
            <sup>*</sup>Always consult with a qualified healthcare provider for
            accurate medical guidance.
          </p>
          <button className="bg-irisBlueColor mt-4 py-2 rounded text-white font-semibold">Start Recording</button>
        </div>
      </section>
    </section>
  );
};
export default Recording;
