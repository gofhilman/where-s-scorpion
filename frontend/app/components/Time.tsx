import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime((time) => time + 1), 10);
    return () => clearInterval(id);
  }, []);

  const minutes = Math.floor(time / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const centiseconds = time % 100;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="grid grid-cols-[30px_max-content_30px_max-content_30px] justify-items-center">
      <p>{pad(minutes)}</p>
      <p>:</p>
      <p>{pad(seconds)}</p>
      <p>:</p>
      <p>{pad(centiseconds)}</p> 
    </div>
  );
}
