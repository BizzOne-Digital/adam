import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  MAX_AGE,
  createSessionToken,
  verifySessionToken,
  validateAdminCredentials,
} from "@/lib/auth-token";

export {
  COOKIE_NAME,
  createSessionToken,
  verifySessionToken,
  validateAdminCredentials,
};

export async function setAdminSession(email: string) {
  const token = await createSessionToken(email);
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<string | null> {
  const jar = await cookies();
  return verifySessionToken(jar.get(COOKIE_NAME)?.value);
}
