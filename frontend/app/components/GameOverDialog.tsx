import { Form } from "react-router";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import padTime from "~/lib/padTime";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function GameOverDialog({
  finished,
  setFinished,
  duration,
}: any) {
  return (
    <Dialog open={finished} onOpenChange={setFinished}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Congratulations!</DialogTitle>
          <DialogDescription>
            {`You completed the game in ${(({
              minutes,
              seconds,
              centiseconds,
            }) => `${minutes}:${seconds}:${centiseconds}`)(
              padTime(duration / 10),
            )}. Please enter your name here.`}
          </DialogDescription>
        </DialogHeader>
        <Form id="game-over" method="post">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
        </Form>
        <DialogFooter>
          <Button type="submit" form="game-over">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
