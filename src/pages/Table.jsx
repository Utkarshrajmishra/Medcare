import { DataTable } from "@/components/DataTable";
import NavBar from "@/components/NavBar";
const Table = () => {
  return (
    <section>
        <NavBar/>
        <section className=" py-4 px-6">
            <DataTable/>
        </section>
    </section>
  );
};

export default Table;
