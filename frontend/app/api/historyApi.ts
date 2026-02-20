import throwError from "./throwError";

async function getLeaderboard() {
  const response = await fetch("something");
  if (!response.ok) await throwError(response);
  return await response.json();
}

export { getLeaderboard };
