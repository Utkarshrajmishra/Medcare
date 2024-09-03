import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  
} from "@/components/ui/alert-dialog";
import { Vortex } from "react-loader-spinner";

export function LoadingDialog({ isOpen }) {
  return (
    <AlertDialog open={isOpen == null ? true : false}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center">
            Our AI Model is working for your
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center">
            AI is analyzing your data, it may take a few seconds, please be patient!
            <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={[
                "#3b82f6",
                "#60a5fa",
                "#93c5fd",
                "#3b82f6",
                "#60a5fa",
                "#93c5fd",
              ]}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
