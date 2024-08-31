import Table from "../components/Table";
import NavBar from "../components/NavBar";
const Prediction = () => {
  return (
    <>
      <NavBar />
      <section className="px-20 mt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-2xl text-gray-800 font-semibold">
            Disease Predicted: Your Health Insights Report
          </p>
          <p className="text-md text-center text-textColor text-">
            Below, you will find a list of diseases and conditions that our
            system has identified as potential risks for you. Each prediction
            includes an estimated likelihood, key factors contributing to the
            risk, and actionable recommendations to help you manage or reduce
            these risks.
          </p>
        </div>
        <Table />
      </section>
    </>
  );
};
export default Prediction;
