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
import { useState } from "react";
import { RoomInput } from "./RoomInput";

    export function Data({ data }) {
        const [dialogOpen, setDialogOpen] = useState(false)
      return (
        <Table>
          <TableCaption>A list of your appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Serial No.</TableHead>
              <TableHead>Patient Name</TableHead>
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
                  {item.userfirstName} {item.userLastName}
                </TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.useremail}</TableCell>
                <TableCell>
                  <span
                    className={`text-white text-[0.8rem] ${
                      item.status ? "bg-green-500" : "bg-yellow-500"
                    } w-fit h-fit py-1 px-2 rounded-xl`}
                  >
                    {item.status ? "Completed" : "Pending"}
                  </span>
                </TableCell>
                <TableCell>
                  {item.userStreet}, {item.userCity}, {item.userCountry}
                </TableCell>
                <TableCell>
                  <PopoverComp setDialogOpen={setDialogOpen}/>
                  <RoomInput dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

