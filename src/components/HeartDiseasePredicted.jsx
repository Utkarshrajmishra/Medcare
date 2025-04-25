import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaHeart } from "react-icons/fa6";

export function DialogDemo({
  open,
  setOpen,
  prediction,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Heart Disease Prediction</DialogTitle>
          <DialogDescription>
            This result is not a guaranteed diagnosis. Please consult a doctor
            or a healthcare professional for an accurate evaluation and proper
            medical advice.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <FaHeart color="red" fontSize={50} />
          <p className="text-xl font-bold">No Heart Disease Predicted</p>
          {/* <p>Your heart is in a good condition</p> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
