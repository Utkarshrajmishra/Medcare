import geminiService from "@/geminiService/Gemini";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useState,useEffect } from "react";
import { LoadingDialog } from "@/components/LoadingDialog";

const AudioPrediction = () => {
  const { state } = useLocation();
  const [result, setResult] = useState();
  

  useEffect(() => {
    const fetchResult =async () => {
      const prompt = `${state.transcript}. analyze this tell what problems can I have and what are precation, I can tak`;
      geminiService
        .run(prompt)
        .then((res) => {
          if (res) {
            setResult(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchResult();

    return () => {
      setResult(null);
    };
  }, [state]);



  console.log(state);
  return (
    <>
      <NavBar />
      <section>
        {
            result? 
            <p>{result}</p>: " "
        }
      </section>
      <LoadingDialog isOpen={result}/>
    </>
  );
};

export default AudioPrediction;
