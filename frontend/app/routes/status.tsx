import { getStatus, patchStatus } from "~/lib/api";
import type { Route } from "./+types/status";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const status: any = Object.fromEntries(formData);
  status.position = JSON.parse(status.position);
  const updatedStatus = await patchStatus(status);
  return { status: updatedStatus };
}

export async function clientLoader() {
  const { status } = await getStatus();
  return { status };
}
