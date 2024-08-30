import NavBar from "../components/NavBar";

const Prediction = () => {
  return (
    <section>
      <NavBar />
      <section className="md:px-20 px-10 mt-8">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-2xl font-[500]">Disease Prediction</p>
          <p className="text-[0.9rem] text-textColor text-center">
            Welcome to our Disease Prediction page! Our cutting-edge tool
            leverages the power of Generative AI to provide accurate and timely
            predictions of potential health risks based on your symptoms,
            medical history, and other relevant factors.
          </p>
        </div>
        
      </section>
    </section>
  );
};

export default Prediction;
