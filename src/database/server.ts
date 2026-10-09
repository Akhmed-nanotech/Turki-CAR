import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function readServerCredential(name: "SUPABASE_URL" | "SUPABASE_SECRET_KEY") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

/**
 * Privileged server client. Call it from server code only.
 * The secret key bypasses row-level security, so this module must not be imported
 * from Client Components or any browser bundle.
 */
export function createSupabaseServerClient(): SupabaseClient {
  return createClient(readServerCredential("SUPABASE_URL"), readServerCredential("SUPABASE_SECRET_KEY"), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
