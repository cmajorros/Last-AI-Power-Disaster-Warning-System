import { cookies } from "next/headers";
import { getUserById, listUsers } from "./store";
import type { Role, User } from "./types";

export type Permission =
  | "view_dashboard"
  | "create_alert"
  | "draft_with_ai"
  | "review_alert"
  | "approve_alert"
  | "publish_alert"
  | "view_delivery"
  | "manage_volunteers"
  | "acknowledge_alert"
  | "view_reports"
  | "add_response_note";

export const permissionsByRole: Record<Role, Permission[]> = {
  meteorological_officer: [
    "view_dashboard",
    "create_alert",
    "draft_with_ai",
    "review_alert",
    "approve_alert",
    "publish_alert",
    "view_delivery",
    "view_reports",
    "add_response_note"
  ],
  emergency_response: ["view_dashboard", "view_delivery", "view_reports", "add_response_note"],
  cso_coordinator: [
    "view_dashboard",
    "view_delivery",
    "manage_volunteers",
    "acknowledge_alert",
    "view_reports",
    "add_response_note"
  ],
  volunteer: ["view_dashboard", "acknowledge_alert"],
  community_member: ["view_dashboard"]
};

export function can(role: Role, permission: Permission) {
  return permissionsByRole[role].includes(permission);
}

export async function currentUser(): Promise<User> {
  const cookieStore = cookies();
  const userId = cookieStore.get("laos_alert_user_id")?.value;
  if (userId) {
    const user = await getUserById(userId);
    if (user) return user;
  }

  const users = await listUsers();
  return users.find((user) => user.role === "meteorological_officer") ?? users[0];
}

export async function ensurePermission(permission: Permission) {
  const user = await currentUser();
  return { user, allowed: can(user.role, permission) };
}

export function officialMfaCode() {
  return process.env.OFFICIAL_MFA_DEMO_CODE || "246810";
}
