import { checkJwt, getLeaderboard, postGame } from "~/lib/api";
import type { Route } from "./+types/home";
import { Form, Link, redirect, useNavigation } from "react-router";
import loadingIcon from "/mk-logo.svg?url";
import headerImage from "/mk-chars.webp?url";
import { Button } from "~/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "~/components/ui/item";
import { Suspense } from "react";
import Leaderboard from "~/components/Leaderboard";
import SpinnerEmpty from "~/components/SpinnerEmpty";

export async function clientAction() {
  await postGame();
  return redirect("game");
}

export async function clientLoader() {
  const jwtCheck = checkJwt();
  const leaderboardPromise = getLeaderboard();
  return { jwtCheck, leaderboardPromise };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { jwtCheck, leaderboardPromise } = loaderData;
  const navigation = useNavigation();

  return (
    <div className="flex flex-col gap-10 pt-12 lg:gap-15">
      {navigation.state !== "idle" ? (
        <img
          src={loadingIcon}
          alt=""
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_2s_linear_infinite]"
        />
      ) : (
        <>
          <header className="mt-10 flex flex-col gap-10 lg:mt-0">
            <img src={headerImage} alt="Mortal Kombat characters" />
            <h1 className="text-center text-4xl font-medium text-amber-400 lg:text-8xl">
              Where's Scorpion?
            </h1>
          </header>
          <main className="flex flex-col items-center gap-15 lg:gap-20">
            <div className="flex items-center justify-center gap-10">
              <Form method="post">
                <Button
                  variant="outline"
                  size="adjustable"
                  type="submit"
                  className="font-semibold"
                >
                  Start
                </Button>
              </Form>
              {jwtCheck && (
                <Link to="game">
                  <Button
                    variant="outline"
                    size="adjustable"
                    className="font-semibold"
                  >
                    Resume
                  </Button>
                </Link>
              )}
            </div>
            <Item variant="outline" className="w-full max-w-150">
              <ItemContent className="lg:gap-5">
                <ItemTitle className="self-center text-2xl text-amber-400 lg:text-6xl">
                  Top 50
                </ItemTitle>
                <ItemDescription>
                  <Suspense fallback={<SpinnerEmpty />}>
                    <Leaderboard leaderboardPromise={leaderboardPromise} />
                  </Suspense>
                </ItemDescription>
              </ItemContent>
            </Item>
          </main>
        </>
      )}
    </div>
  );
}
