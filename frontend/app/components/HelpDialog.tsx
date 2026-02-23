import { Info } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function HelpDialog({ characters, tasks, className }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-lg" className={className}>
          <Info />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Where are them?</DialogTitle>
          <DialogDescription>Find them on the poster.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 justify-items-center">
          {tasks?.map(({ characterId }: any) => (
            <div key={characterId} className="flex flex-col items-center gap-1">
              <img
                src={
                  characters.find((char: any) => char.id === characterId).image
                }
                alt=""
                className="h-35"
              />
              <p className="text-xs">
                {characters.find((char: any) => char.id === characterId).name}
              </p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
