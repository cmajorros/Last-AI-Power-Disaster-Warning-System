import { NextResponse } from "next/server";
import { ensurePermission, type Permission } from "./auth";
import type { User } from "./types";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function parseBody<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    return {} as T;
  }
}

export async function requirePermission(permission: Permission): Promise<
  | {
      allowed: true;
      user: User;
    }
  | {
      allowed: false;
      response: NextResponse;
    }
> {
  const { user, allowed } = await ensurePermission(permission);
  if (!allowed) {
    return {
      allowed: false,
      response: error(`Role ${user.role} cannot perform ${permission}`, 403)
    };
  }
  return { allowed: true, user };
}
