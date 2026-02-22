export default function checkPosition(characters: any, position: any) {
  return characters.find(
    ({ location: { x1, y1, x2, y2 } }: any) =>
      position.x > x1 && position.x < x2 && position.y > y1 && position.y < y2,
  );
}
