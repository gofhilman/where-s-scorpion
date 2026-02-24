import { Link, redirect, useFetcher, useNavigation } from "react-router";
import loadingIcon from "/mk-logo.svg?url";
import Time from "~/components/Time";
import Board from "~/components/Board";
import { getGame, patchGame } from "~/lib/api";
import type { Route } from "./+types/game";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import HelpDialog from "~/components/HelpDialog";
import CharacterDisplay from "~/components/CharacterDisplay";
import GameOverDialog from "~/components/GameOverDialog";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  await patchGame(formData.get("name"));
  return redirect("/");
}

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
  const [finished, setFinished] = useState(false);
  let startedAt: any, finishedAt: any, duration: any, tasks: any, progress: any;
  if (statusFetcher.data) {
    ({ startedAt, finishedAt, duration, tasks, progress } =
      statusFetcher.data.status);
  }
  useEffect(() => {
    if (statusFetcher.state === "idle") {
      statusFetcher.load("status");
      if (finishedAt) setFinished(true);
    }
  }, [statusFetcher.state]);

  return (
    <div className="flex flex-col gap-5">
      {navigation.state === "loading" ? (
        <img
          src={loadingIcon}
          alt=""
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin"
        />
      ) : (
        <>
          <header className="bg-background/95 sticky top-0 z-10 pt-12 pb-3">
            <div className="mx-auto flex max-w-250 flex-col gap-3 lg:gap-5">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-amber-400 lg:text-3xl">
                  <Link to="/">Where's Scorpion?</Link>
                </h1>
                <Time startedAt={startedAt} duration={duration} />
                <restartFetcher.Form action="restart" method="post">
                  <Button variant="outline" type="submit">
                    Restart
                  </Button>
                </restartFetcher.Form>
              </div>
              <div className="grid grid-cols-[auto_max-content] items-start">
                <CharacterDisplay characters={characters} progress={progress} />
                <HelpDialog
                  characters={characters}
                  tasks={tasks}
                  className="justify-self-end"
                />
              </div>
            </div>
          </header>
          <main>
            <Board
              board={board}
              characters={characters}
              tasks={tasks}
              progress={progress}
              statusFetcher={statusFetcher}
            />
            <GameOverDialog
              finished={finished}
              setFinished={setFinished}
              duration={duration}
            />
          </main>
        </>
      )}
    </div>
  );
}
