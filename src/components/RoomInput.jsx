import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Room from "./Room";
import { useState } from "react";
import { db } from "@/firebase";
import { useNavigate } from "react-router-dom";

export function RoomInput({ dialogOpen, setDialogOpen }) {
  const [id,setID]=useState('')
  const navigate=useNavigate()

  const handleSubmit=async()=>{
          navigate("/chat",{state:id})
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader></DialogHeader>
        <Room setID={setID} id={id}/>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
