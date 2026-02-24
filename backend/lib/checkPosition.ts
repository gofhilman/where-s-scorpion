export default function checkPosition(
  characters: any,
  position: any,
  characterId: any,
) {
  const character = characters.find(({ id }: any) => id === characterId);
  if (!character) return;
  const {
    location: { x1, y1, x2, y2 },
  } = character;
  return (
    position.x > x1 &&
    position.x < x2 &&
    position.y > y1 &&
    position.y < y2 &&
    character
  );
}
