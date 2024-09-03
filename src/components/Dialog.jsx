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

export function Dialog({ isOpen, onClose, userInfo, setUserInfo }) {


  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...userInfo,[name]:value};
    setUserInfo(newInfo);
  };

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
              name="year"
              value={userInfo.year}
              onChange={handleChange}
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
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={userInfo.gender === "male"}
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={userInfo.gender === "female"}
                  onChange={handleChange}
                />{" "}
                Female
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={() => console.log(userInfo)}
            disabled={!userInfo.year || !userInfo.gender} // Disable if year or gender is not filled
            className={`p-2 text-sm rounded text-white font-bold ${
              !userInfo.year || !userInfo.gender ? "bg-gray-300" : "bg-blue-500"
            }`} 
          >
            Save changes
          </button>
        </DialogFooter>
      </DialogContent>
    </UIDialog>
  );
}
