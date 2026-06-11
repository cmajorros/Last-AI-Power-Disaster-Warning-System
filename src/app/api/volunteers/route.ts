import { ok, parseBody, requirePermission } from "@/lib/api";
import { addVolunteer, listVolunteers } from "@/lib/store";
import type { VolunteerInput } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const volunteers = await listVolunteers();
  return ok({ volunteers });
}

export async function POST(request: Request) {
  const auth = await requirePermission("manage_volunteers");
  if (!auth.allowed) return auth.response;

  const body = await parseBody<VolunteerInput>(request);
  const volunteer = await addVolunteer(
    {
      name: body.name || "New volunteer",
      phone: body.phone || "+8562000000000",
      whatsappEnabled: Boolean(body.whatsappEnabled),
      village: body.village || "Unassigned",
      district: body.district || "Unassigned",
      province: body.province || "Unassigned",
      languagePreference: body.languagePreference || "lo"
    },
    auth.user.id
  );
  return ok({ volunteer }, { status: 201 });
}
