export default function CharacterDisplay({ characters, progress }: any) {
  const collectedIds = new Set(progress?.map((item: any) => item.characterId));

  return (
    <div className="grid grid-cols-3 justify-items-center">
      {characters.map((character: any) => (
        <div
          key={character.id}
          className={`flex flex-col items-center gap-1 ${
            collectedIds.has(character.id) ? "opacity-30" : "opacity-100"
          }`}
        >
          <img src={character.image} alt="" className="h-20" />
          <p className="text-xs">{character.name}</p>
        </div>
      ))}
    </div>
  );
}
