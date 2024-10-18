import { DataTable } from "@/components/DataTable";
import Navigation from "@/components/Navigation";
import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "@/context/IsDoctor";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Data } from "@/components/Data";
export const PatientList = () => {
  const { isDoctor, setIsDoctor } = useContext(DoctorContext);
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);

  console.log(isDoctor);
  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(
          collection(db, `${isDoctor.doctorEmail}booking`)
        );
        const doctors = [];
        querySnapshot.forEach((doc) => {
          doctors.push({ id: doc.id, ...doc.data() });
        });
        console.log(doctors);
        setData(doctors);

        // Call fetchDetail for each doctor to retrieve their details
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, []);

  return (
    <section>
      <Navigation />
      <section className="bg-neutral-50 h-[100vh] p-8">
        <p className="text-center text-xl font-semibold text-neutral-600">
          List of all appointements
        </p>
        <section className="p-6">
          <Data data={data} />
        </section>
      </section>
    </section>
  );
};
