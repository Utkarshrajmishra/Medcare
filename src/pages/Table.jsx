import { DataTable } from "@/components/DataTable";
import NavBar from "@/components/NavBar";
import { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { DoctorContext } from "@/context/IsDoctor";
import { collection, getDocs, } from "firebase/firestore";
import { db } from "@/firebase";

const Table = () => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [userData, setUserData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const { isDoctor, setIsDoctor } = useContext(DoctorContext);
  const auth = getAuth();
  const user = auth.currentUser.email;

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, `${user}booking`));
        const doctors = [];
        querySnapshot.forEach((doc) => {
          doctors.push({ id: doc.id, ...doc.data() });
        });
        
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
      <NavBar />
      <section className="py-4 px-6">
        {/* Pass the fetched data to DataTable as props */}
        <DataTable data={data}  />
      </section>
    </section>
  );
};

export default Table;
