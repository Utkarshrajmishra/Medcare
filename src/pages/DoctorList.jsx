import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import NavBar from "@/components/NavBar";
import { LoadingDialog } from "@/components/LoadingDialog";
import Doctor from "@/components/Doctor";
const DoctorList = () => {
  const [doctorInfo, setDoctorInfo] = useState();
  const [loading, setLoading] = useState(false);

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
        <section className="p-4 flex ">
          {doctorInfo
            ? doctorInfo.map((item, index) => <Doctor info={item} />)
            : ""}
        </section>
      </section>
    </section>
  );
};

export default DoctorList;
