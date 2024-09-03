import NavBar from "../components/NavBar";
import Doctor1 from "../assets/images/hero-img01.png";
import Doctor2 from "../assets/images/hero-img02.png";
import Doctor3 from "../assets/images/hero-img03.png";
const Home = () => {
  return (
    <>
      {/* Apply the background image to a parent wrapper */}
      <div className=" w-full bg-[url('./src/assets/images/Blur.png')] bg-cover bg-center">
        <NavBar />
        <main className="h-full">
          <section className="md:px-20 px-10 h-[90vh] flex items-center justify-between gap-10">
            <div className="w-[55%] flex flex-col gap-5 items-start">
              <p className="text-7xl font-[500] leading-20">
                We help patients live a healthy, longer life
              </p>
              <p className="text-textColor text-md ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
                totam recusandae,
                <br /> unde voluptas rem exercitationem facere magni debitis
                ipsam itaque dolorum <br />
                repellendus, ut at quibusdam nesciunt illo dolor, expedita
                veritatis.
              </p>
              <button className="text-white bg-primaryColor py-3 font-semibold  px-6 text-sm rounded-3xl">
                Let's Get Started
              </button>
              <div className="flex gap-10 mt-5">
                <div>
                  <p className="text-2xl underline d  decoration-4 font-[500] decoration-yellowColor">
                    100%
                  </p>
                  <p className="text-sm mt-2 text-textColor">
                    Customer Satification
                  </p>
                </div>
                <div>
                  <p className="text-2xl underline d  decoration-4 font-[500] decoration-irisBlueColor">
                    200+
                  </p>
                  <p className="text-sm mt-2 text-textColor">Customer Served</p>
                </div>
                <div>
                  <p className="text-2xl underline d  decoration-4 font-[500] decoration-purpleColor">
                    10+
                  </p>
                  <p className="text-sm mt-2 text-textColor">
                    Years of Experience
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-4">
                <img src={Doctor1} alt="Doctor Image" width={280} />
                <div className="flex flex-col gap-4">
                  <img src={Doctor2} alt="Doctor Image" width={210} />
                  <img src={Doctor3} alt="Doctor Image" width={210} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
