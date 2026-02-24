import { differenceInMilliseconds } from "date-fns";
import { useEffect, useState } from "react";
import padTime from "~/lib/padTime";

export default function Time({ startedAt, duration }: any) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (duration) return setTime(duration / 10);
    if (startedAt) {
      setTime(differenceInMilliseconds(new Date(), startedAt) / 10);
      const id = setInterval(() => setTime((time) => time + 1), 10);
      return () => clearInterval(id);
    }
  }, [startedAt, duration]);

  const { minutes, seconds, centiseconds } = padTime(time);

  return (
    <div className="grid grid-cols-[30px_max-content_30px_max-content_30px] justify-items-center font-semibold lg:grid-cols-[50px_max-content_50px_max-content_50px] lg:text-3xl">
      <p>{minutes}</p>
      <p>:</p>
      <p>{seconds}</p>
      <p>:</p>
      <p>{centiseconds}</p>
    </div>
  );
}
