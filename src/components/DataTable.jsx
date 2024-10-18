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
    

export function DataTable({ data }) {
  console.log(data);
  return (
    <Table>
      <TableCaption>A list of your appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Serial No.</TableHead>
          <TableHead>Doctor Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="">Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>

            <TableCell className="font-medium">
              {item.doctorFirstName} {item.doctorLastName}
            </TableCell>
            <TableCell> d</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell>{item.doctorEmail}</TableCell>
            <TableCell>
              {" "}
              <span className="text-white bg-green-500 wfit h-fit py-1 px-2 rounded-xl">{item.status ? "Pending" : "Completed"} </span>
            </TableCell>
            <TableCell className="">
              {item.doctorStreetAddress}, {item.doctorState},{" "}
              {item.doctorCountry}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
