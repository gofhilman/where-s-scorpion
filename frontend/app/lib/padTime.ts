export default function padTime(time: any) {
  const minutes = Math.floor(time / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const centiseconds = Math.floor(time % 100);

  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    minutes: pad(minutes),
    seconds: pad(seconds),
    centiseconds: pad(centiseconds),
  };
}
