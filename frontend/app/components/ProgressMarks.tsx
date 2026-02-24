import circleCheck from "app/assets/circle-check.svg?url";

export default function ProgressMarks({ progress, imgSize }: any) {
  return (
    <>
      {progress?.map(({ id, position: { x, y } }: any) => (
        <img
          key={id}
          src={circleCheck}
          alt=""
          style={{
            top: (y / 100) * imgSize.height,
            left: (x / 100) * imgSize.width,
            width: 0.03 * imgSize.width,
          }}
          className="absolute z-5 -translate-x-1/2 -translate-y-1/2"
        />
      ))}
    </>
  );
}
