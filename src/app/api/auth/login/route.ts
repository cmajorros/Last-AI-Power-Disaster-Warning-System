import { NextRequest, NextResponse } from "next/server";
import { officialMfaCode } from "@/lib/auth";
import { error, parseBody } from "@/lib/api";
import { getUserById } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await parseBody<{ userId?: string; mfaCode?: string }>(request);
  if (!body.userId) return error("Missing userId");

  const user = await getUserById(body.userId);
  if (!user) return error("Unknown user", 404);

  if (user.twoFactorEnabled && body.mfaCode !== officialMfaCode()) {
    return error("Invalid MFA code for official account", 401);
  }

  const response = NextResponse.json({ user });
  response.cookies.set("laos_alert_user_id", user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
  response.cookies.set("laos_alert_language", user.languagePreference, {
    sameSite: "lax",
    path: "/"
  });
  return response;
}
