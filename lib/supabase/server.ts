import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createSupabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Next 16 の cookieStore には getAll がある前提
        getAll() {
          return cookieStore.getAll();
        },
        // Server Component では書き込み不可なので no-op
        setAll() {},
      },
    },
  );
}
