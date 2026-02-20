import { useState } from "react";
import boardImage from "~/assets/mk-game.jpg?url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Board({ characters }: any) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleClick = (event: any) => {
    const rect = event.target.getBoundingClientRect();
    setPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setOpen(true);
  };

  return (
    <div className="relative">
      <img
        onClick={handleClick}
        src={boardImage}
        alt=""
        className="w-full cursor-crosshair rounded-[30px]"
      />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <span style={{ position: "absolute", top: pos.y, left: pos.x }} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Who is this?</DropdownMenuLabel>
          {characters.map((character: any) => (
            <DropdownMenuItem>
              <img src={character.image} alt="" />
              <p>{character.name}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
