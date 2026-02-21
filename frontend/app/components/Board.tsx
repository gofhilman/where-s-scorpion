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
  const [circle, setCircle] = useState(false);
  const [closing, setClosing] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleClick = (event: any) => {
    const rect = event.target.getBoundingClientRect();
    setPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    });
    setOpen(true);
    setCircle(true);
    setClosing(false);
  };

  const handleOpenChange = (isOpen: any) => {
    setOpen(isOpen);
    if (!isOpen) {
      setClosing(true);
      setTimeout(() => {
        setCircle(false);
      }, 150);
    }
  };

  return (
    <div className="relative">
      <img
        onClick={handleClick}
        src={boardImage}
        alt=""
        className="w-full cursor-crosshair rounded-[30px]"
      />
      <DropdownMenu open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          {circle && (
            <div
              style={{
                top: pos.y - 0.025 * pos.width,
                left: pos.x - 0.025 * pos.width,
                width: 0.05 * pos.width,
                height: 0.05 * pos.width,
                animation: `${closing ? "scale-out" : "scale-in"} 150ms forwards`,
              }}
              className="absolute rounded-full bg-zinc-950/60"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          style={{
            transform: `translate(${0.018 * pos.width}px, ${0.018 * pos.width}px)`,
          }}
        >
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
