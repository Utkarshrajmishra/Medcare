import Table from "../components/Table";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { LoadingDialog } from "@/components/LoadingDialog";
import { useLocation } from "react-router-dom";
const Prediction = () => {
  const { state } = useLocation();
  console.log(state.id);

  const [disease, setDisease] = useState(null);

  const apiUrl = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[${state.id}]&gender=${
    state.userInfo.gender
  }&year_of_birth=${state.userInfo.year}&token=${
    import.meta.env.VITE_API_MED_KEY
  }&format=json&language=en-gb`;

  console.log(apiUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setDisease((prev) => data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      setDisease(null);
    };
  }, [state]);

  return (
    <>
      <NavBar />
      <section className="md:px-20 px-5 mt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-2xl text-center text-gray-800 font-semibold">
            Disease Predicted: Your Health Insights Report
          </p>
          <p className="text-md text-center text-textColor">
            Below, you will find a list of diseases and conditions that our
            system has identified as potential risks for you. Each prediction
            includes an estimated likelihood, key factors contributing to the
            risk, and actionable recommendations to help you manage or reduce
            these risks.
          </p>
        </div>
        <Table disease={disease} />
      </section>
      <LoadingDialog isOpen={disease} />
    </>
  );
};

export default Prediction;
