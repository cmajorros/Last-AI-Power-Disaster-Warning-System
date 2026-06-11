import { currentUser, permissionsByRole } from "@/lib/auth";
import { ok } from "@/lib/api";
import { databaseMode, listUsers } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  const [user, users] = await Promise.all([currentUser(), listUsers()]);
  return ok({
    user,
    users,
    permissionsByRole,
    databaseMode: databaseMode()
  });
}
