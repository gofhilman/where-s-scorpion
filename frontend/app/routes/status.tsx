import { getStatus } from "~/lib/api";
import type { Route } from "./+types/status";

export async function clientAction({ request }: Route.ClientActionArgs) {}

export async function clientLoader() {
  const { status } = await getStatus();
  return { status };
}
