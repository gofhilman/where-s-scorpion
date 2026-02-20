import { useNavigation } from "react-router";
import loadingIcon from "/mk-logo.svg?url";
import Time from "~/components/Time";
import Board from "~/components/Board";

export async function clientLoader() {
  // const characters = getCharacters();
}

export default function Game() {
  // Test
  const characters: any = [];

  const navigation = useNavigation();

  return (
    <div className="flex flex-col gap-10">
      {navigation.state === "loading" ? (
        <img
          src={loadingIcon}
          alt=""
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin"
        />
      ) : (
        <>
          <header className="sticky top-0 z-10">
            <div>
              <p>Find:</p>
              <div>
                {characters.map((character: any) => (
                  <div>
                    <img src={character.image} alt="" />
                    <p>{character.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <Time />
          </header>
          <main>
            <Board characters={characters} />
          </main>
        </>
      )}
    </div>
  );
}
