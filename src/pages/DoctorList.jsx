import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";

const DoctorList = () => {
  const [doctorInfo, setDoctorInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doctorInfo"));
        console.log(querySnapshot);
        const doctors = [];
        querySnapshot.forEach((doc) => {
          doctors.push({ id: doc.id, ...doc.data() });
        });
        setDoctorInfo(doctors); // Save the fetched data to state
        console.log(doctorInfo);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h1>Book Doctor</h1>
      <ul>
        {doctorInfo.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.specialization}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DoctorList;
