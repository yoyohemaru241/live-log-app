import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import type { Live } from "@/lib/lives";

function toLocalDate(yyyy_mm_dd: string) {
  const [y, m, d] = yyyy_mm_dd.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export default async function HistoryPage() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("lives")
    .select("id, artist, live_date, venue, open_time, start_time")
    .order("live_date", { ascending: false });

  if (error) return <div className="p-4">エラー: {error.message}</div>;

  const lives = (data ?? []) as Live[];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pastLives = lives.filter((l) => toLocalDate(l.live_date) < today);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-black">HISTORY</div>
        <Link href="/" className="text-zinc-400 underline">
          HOME
        </Link>
      </div>

      <div className="mt-6 grid gap-3">
        {pastLives.length === 0 ? (
          <div className="text-zinc-400 border border-zinc-800 rounded-2xl p-4">
            まだ履歴はない。
          </div>
        ) : (
          pastLives.map((live) => (
            <Link key={live.id} href={`/lives/${live.id}`}>
              <div className="border border-zinc-800 rounded-2xl p-4 hover:border-lime-400 transition">
                <div className="text-zinc-400">{live.live_date}</div>
                <div className="text-2xl font-black">{live.artist}</div>
                <div className="text-zinc-300">{live.venue ?? ""}</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
