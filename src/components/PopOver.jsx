import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react"; 


export function PopoverComp({ setDialogOpen }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {" "}
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 bg-zinc-50">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-center leading-none text-neutral-600">
              Your Options
            </h4>
          </div>
          <div className="flex flex-col gap-2">
            <button className="text-sm text-white  hover:bg-blue-600 bg-blue-500 p-2 rounded-md ">
              Mark Complete
            </button>
            <button className="text-sm text-white hover:bg-blue-600 bg-blue-500 p-2 rounded-md ">
              Start Video Chat
            </button>
            <button onClick={()=>setDialogOpen(true)} className="text-sm text-white  hover:bg-blue-600 bg-blue-500 p-2 rounded-md ">
              Start Chat
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
