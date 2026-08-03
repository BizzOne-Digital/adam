export const COOKIE_NAME = "a1_admin_session";
export const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return toHex(sig);
}

export async function createSessionToken(email: string) {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = `${email}|${exp}`;
  const sig = await sign(payload);
  return `${payload}|${sig}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<string | null> {
  if (!token) return null;
  const parts = token.split("|");
  if (parts.length !== 3) return null;
  const [email, expStr, sig] = parts;
  const payload = `${email}|${expStr}`;
  const expected = await sign(payload);
  if (sig.length !== expected.length || sig !== expected) return null;
  if (Date.now() > Number(expStr)) return null;
  return email;
}

export function validateAdminCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL || "admin@a1fitness.com";
  const expectedPassword = process.env.ADMIN_PASSWORD || "A1Admin@2026";
  return email === expectedEmail && password === expectedPassword;
}
