import { error, ok, parseBody, requirePermission } from "@/lib/api";
import { addResponseNote, getAlertById } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const auth = await requirePermission("add_response_note");
  if (!auth.allowed) return auth.response;

  const alert = await getAlertById(params.id);
  if (!alert) return error("Alert not found", 404);

  const body = await parseBody<{ note?: string }>(request);
  if (!body.note) return error("Missing response note");

  const note = await addResponseNote(alert.id, auth.user.id, body.note);
  return ok({ note }, { status: 201 });
}
