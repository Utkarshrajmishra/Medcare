import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import NavBar from "@/components/NavBar";
import { LoadingDialog } from "@/components/LoadingDialog";
import Doctor from "@/components/Doctor";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctorInfo, setDoctorInfo] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkout = (data) => {
    console.log(data);
    navigate("/checkout", { state: data });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "doctorInfo"));
        console.log(querySnapshot);
        const doctors = [];
        querySnapshot.forEach((doc) => {
          doctors.push({ id: doc.id, ...doc.data() });
        });
        setDoctorInfo(doctors);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <NavBar />
      <section>
        <LoadingDialog isOpen={doctorInfo} />
        <section className="p-8 flex ">
          {doctorInfo
            ? doctorInfo.map((item, index) => (
                <Doctor checkout={checkout} info={item} />
              ))
            : ""}
        </section>
      </section>
    </section>
  );
};

export default DoctorList;
