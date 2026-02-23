import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Board({ board, characters }: any) {
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

    // For data collection
    // console.log(
    //   `x: ${(((event.clientX - rect.left) / rect.width) * 100).toFixed(3)}, y: ${(((event.clientY - rect.top) / rect.height) * 100).toFixed(3)}`,
    //   `(width: ${rect.width.toFixed(3)}, height: ${rect.height.toFixed(3)})`,
    // );
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
        src={board.image}
        alt=""
        className="w-full cursor-crosshair rounded-4xl"
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
              className="absolute rounded-full bg-zinc-950/50"
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
            <DropdownMenuItem key={character.id}>
              <img src={character.image} alt="" />
              <p>{character.name}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
