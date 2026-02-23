import { jsonContentJwtHeaders, jwtHeaders } from "./httpHeaders";
import throwError from "./throwError";

const rootUrl = import.meta.env.VITE_API_ROOT_URL;

function checkJwt() {
  return localStorage.getItem("JWT") ? true : false;
}

async function getLeaderboard() {
  const response = await fetch(rootUrl + "leaderboard");
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getGame() {
  const headers = jwtHeaders(new Headers());
  const response = await fetch(rootUrl + "game", { headers });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function getStatus() {
  const headers = jwtHeaders(new Headers());
  const response = await fetch(rootUrl + "status", { headers });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function postGame() {
  const response = await fetch(rootUrl + "game", { method: "POST" });
  if (!response.ok) await throwError(response);
  const { token } = await response.json();
  localStorage.setItem("JWT", token);
}

async function patchGame(name: any) {
  const headers = jsonContentJwtHeaders(new Headers());
  const response = await fetch(rootUrl + "game", {
    method: "PATCH",
    headers,
    body: JSON.stringify({ name }),
  });
  if (!response.ok) await throwError(response);
  localStorage.removeItem("JWT");
  return await response.json();
}

async function patchStatus(status: any) {
  const headers = jsonContentJwtHeaders(new Headers());
  const response = await fetch(rootUrl + "status", {
    method: "PATCH",
    headers,
    body: JSON.stringify(status),
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

export {
  checkJwt,
  getLeaderboard,
  getGame,
  getStatus,
  postGame,
  patchGame,
  patchStatus,
};
