import { Button } from "./ui/button";
import {
  Dialog as UIDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Dialog({ isOpen, onClose }) {
  return (
    <UIDialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-headingColor">Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year-of-birth" className="text-right">
              Birth Year
            </Label>
            <Input
              id="year-of-birth"
              type="number"
              placeholder="1990"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <div className="col-span-3 flex gap-4">
              <label>
                <input type="radio" name="gender" value="male" /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" /> Female
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onClose} className="bg-blue-500">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </UIDialog>
  );
}
