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
    <div className="flex flex-col gap-10">
      {navigation.state === "loading" ? (
        <img
          src={loadingIcon}
          alt=""
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin"
        />
      ) : (
        <>
          <header className="flex flex-col lg:gap-10">
            <img src={headerImage} alt="Mortal Kombat characters" />
            <h1 className="text-center text-amber-400 lg:text-8xl">
              Where's Scorpion?
            </h1>
          </header>
          <main className="flex flex-col items-center lg:gap-20">
            <Form method="post">
              <Button variant="outline" size="adjustable" type="submit">
                Start
              </Button>
            </Form>
            {jwtCheck && (
              <Link to="game">
                <Button variant="outline" size="adjustable">
                  Resume
                </Button>
              </Link>
            )}
            <Item variant="outline">
              <ItemContent>
                <ItemTitle className="self-center font-medium text-amber-400 lg:text-6xl">
                  Top 50
                </ItemTitle>
                <ItemDescription>
                  <Suspense
                    fallback={
                      <img src={loadingIcon} alt="" className="animate-spin" />
                    }
                  >
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
