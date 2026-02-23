import { useEffect, useState } from "react";
import padTime from "~/lib/padTime";

export default function Time() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime((time) => time + 1), 10);
    return () => clearInterval(id);
  }, []);

  const { minutes, seconds, centiseconds } = padTime(time);

  return (
    <div className="grid grid-cols-[30px_max-content_30px_max-content_30px] justify-items-center">
      <p>{minutes}</p>
      <p>:</p>
      <p>{seconds}</p>
      <p>:</p>
      <p>{centiseconds}</p>
    </div>
  );
}
