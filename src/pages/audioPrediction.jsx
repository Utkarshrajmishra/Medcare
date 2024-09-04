import geminiService from "@/geminiService/Gemini";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useState,useEffect } from "react";
import { LoadingDialog } from "@/components/LoadingDialog";
import "../styles/mdxStyle.css"

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
            console.log(res)
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
      <section className="md:px-20 px-5 py-8">
        <h1></h1>
        {result ? (
          <div>
            {" "}
            <h1></h1>
            <ReactMarkdown className="markdown-content">{result}</ReactMarkdown>
          </div>
        ) : (
          " "
        )}
      </section>
      <LoadingDialog isOpen={result} />
    </>
  );
};
export default AudioPrediction;
