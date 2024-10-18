import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PopoverComp } from "./PopOver";

export function DataTable({ data }) {
  return (
    <Table>
      <TableCaption>A list of your appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Serial No.</TableHead>
          <TableHead>Doctor Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            className={`${index % 2 === 0 ? "bg-zinc-50" : ""}`}
            key={index}
          >
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium ">
              {item.doctorFirstName} {item.doctorLastName}
            </TableCell>
            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell>{item.doctorEmail}</TableCell>
            <TableCell>
              <span
                className={`text-white text-[0.8rem] ${
                  item.status ?  "bg-green-500" :"bg-yellow-500" 
                } w-fit h-fit py-1 px-2 rounded-xl`}
              >
                {item.status ? "Completed": "Pending" }
              </span>
            </TableCell>
            <TableCell>
              {item.doctorStreetAddress}, {item.doctorState},{" "}
              {item.doctorCountry}
            </TableCell>
            {/* <TableCell>
              <PopoverComp />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
