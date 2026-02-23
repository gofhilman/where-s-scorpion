import { Link, useFetcher, useNavigation } from "react-router";
import loadingIcon from "/mk-logo.svg?url";
import Time from "~/components/Time";
import Board from "~/components/Board";
import { getGame } from "~/lib/api";
import type { Route } from "./+types/game";
import { Button } from "~/components/ui/button";
import { useEffect } from "react";

export async function clientLoader() {
  const {
    game: { board, characters },
  } = await getGame();
  return { board, characters };
}

export default function Game({ loaderData }: Route.ComponentProps) {
  const { board, characters } = loaderData;
  const navigation = useNavigation();
  const restartFetcher = useFetcher();
  const statusFetcher = useFetcher();
  let startedAt, finishedAt, duration, tasks, progress;
  if (statusFetcher.data) {
    ({ startedAt, finishedAt, duration, tasks, progress } = statusFetcher.data.status);
  }
  useEffect(() => {
    statusFetcher.load("status");
  }, []);

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
            <div className="flex items-center">
              <h1 className="text-amber-400">
                <Link to="/">Where's Scorpion?</Link>
              </h1>
              <Time startedAt={startedAt} />
              <restartFetcher.Form action="restart" method="post">
                <Button variant="outline" type="submit">
                  Restart
                </Button>
              </restartFetcher.Form>
            </div>
            <div className="flex items-center">
              <p>Find:</p>
              <div className="flex items-center">
                {characters.map((character: any) => (
                  <div key={character.id} className="flex items-center">
                    <img src={character.image} alt="" />
                    <p>{character.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </header>
          <main>
            <Board board={board} characters={characters} />
          </main>
        </>
      )}
    </div>
  );
}
