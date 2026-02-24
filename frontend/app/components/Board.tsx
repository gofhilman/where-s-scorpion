import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ProgressMarks from "./ProgressMarks";

export default function Board({
  board,
  characters,
  tasks,
  progress,
  statusFetcher,
}: any) {
  const [open, setOpen] = useState(false);
  const [circle, setCircle] = useState(false);
  const [closing, setClosing] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const observer = new ResizeObserver(([entry]) => {
      setImgSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(img);
    return () => observer.disconnect();
  }, []);

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

  const handleDropdown = (characterId: any) => {
    statusFetcher.submit(
      {
        position: JSON.stringify({
          x: (pos.x / pos.width) * 100,
          y: (pos.y / pos.height) * 100,
        }),
        characterId,
      },
      { action: "status", method: "post" },
    );
  };

  return (
    <div className="relative">
      <img
        ref={imgRef}
        onClick={handleClick}
        src={board.image}
        alt=""
        className="w-full cursor-crosshair rounded-4xl"
      />
      <ProgressMarks progress={progress} imgSize={imgSize} />
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
              className="absolute flex items-center justify-center rounded-full border-2 border-dotted border-amber-400 bg-zinc-950/50"
            >
              <div className="h-1 w-1 rounded-full bg-amber-400" />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          style={{
            transform: `translate(${0.018 * pos.width}px, ${0.018 * pos.width}px)`,
          }}
        >
          <DropdownMenuLabel>Who is this?</DropdownMenuLabel>
          {tasks?.map(({ characterId }: any) => (
            <DropdownMenuItem
              key={characterId}
              onSelect={() => handleDropdown(characterId)}
            >
              <img
                src={
                  characters.find((char: any) => char.id === characterId).image
                }
                alt=""
                className="h-20"
              />
              <p>
                {characters.find((char: any) => char.id === characterId).name}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
