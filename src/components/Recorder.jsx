import { Button } from "./ui/button";
import {
  Dialog as UIDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaMicrophone } from "react-icons/fa"; // Correct import
import { FaRegCirclePlay,FaStop } from "react-icons/fa6";

export function Recorder({ isOpen, onClose }) {
  return (
    <UIDialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-headingColor">Recorder</DialogTitle>
          <DialogDescription>
            Please make sure that you have turned the mic on and your browser
            have permission to access it.
          </DialogDescription>
        </DialogHeader>
        <section>
          <section className="w-full h-[100px] bg-blue-50 outline outline-1 outline-blue-500 flex-col rounded flex items-center justify-center p-2">
            <FaMicrophone className="text-4xl text-neutral-800" />
            <p className="mt-2 text-sm text-neutral-800 font-bold">
              Click start
            </p>
          </section>
          <section className="flex gap-2 justify-center mt-4">
            <div>
              <button className="flex w-full items-center gap-2 bg-blue-500 py-1 px-3 rounded-full text-white font-bold">
                Start <FaRegCirclePlay />
              </button>
            </div>
            <div>
              <button className="flex items-center w-full gap-2 bg-red-500 py-1 px-3 rounded-full text-white font-bold">
                Stop <FaStop />
              </button>
            </div>
          </section>
        </section>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onClose}
            className="bg-blue-500 w-full"
          >
            Process Audio
          </Button>
        </DialogFooter>
      </DialogContent>
    </UIDialog>
  );
}
