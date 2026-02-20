import { getLeaderboard } from "~/api/historyApi";
import type { Route } from "./+types/home";
import { Link, useNavigation } from "react-router";
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

export async function clientLoader() {
  const leaderboardPromise = getLeaderboard();
  return { leaderboardPromise };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { leaderboardPromise } = loaderData;
  const navigation = useNavigation();

  return (
    <div className="flex flex-col gap-10">
      <title>Where's Scorpion?</title>
      <meta property="og:title" content="Where's Scorpion?" />
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
            <h1 className="text-center lg:text-8xl">Where's Scorpion?</h1>
          </header>
          <main className="flex flex-col items-center lg:gap-20">
            <Link to="game">
              <Button variant="outline" size="adjustable">
                Play
              </Button>
            </Link>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle className="lg:text-6xl">Leaderboard</ItemTitle>
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
