import { useNavigation } from "react-router";
import loadingIcon from "/mk-logo.svg?url";
import Time from "~/components/Time";
import Board from "~/components/Board";
import { getGame } from "~/lib/api";
import type { Route } from "./+types/game";

export async function clientLoader() {
  const {
    game: { board, characters },
  } = await getGame();
  return { board, characters };
}

export default function Game({ loaderData }: Route.ComponentProps) {
  const { board, characters } = loaderData;
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
                  <div key={character.id}>
                    <img src={character.image} alt="" />
                    <p>{character.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <Time />
          </header>
          <main>
            <Board board={board} characters={characters} />
          </main>
        </>
      )}
    </div>
  );
}
