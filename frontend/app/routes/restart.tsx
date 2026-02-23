import { postGame } from "~/lib/api";

export async function clientAction() {
  await postGame();
}
