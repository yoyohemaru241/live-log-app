import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import type { Live } from "@/lib/lives";

export default async function LiveDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("lives")
    .select("id, artist, live_date, venue, open_time, start_time")
    .eq("id", id)
    .single();

  if (error) return <div className="p-4">エラー: {error.message}</div>;
  const live = data as Live;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Link href="/" className="text-zinc-400 underline">
        ← HOME
      </Link>

      <div className="mt-4">
        <div className="text-zinc-400">{live.live_date}</div>
        <div className="text-4xl font-black">{live.artist}</div>
        <div className="mt-4 text-xl">{live.venue ?? "未入力"}</div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <div className="text-lime-400 font-black">OPEN</div>
            <div className="text-2xl font-black">{live.open_time ?? "-"}</div>
          </div>
          <div>
            <div className="text-lime-400 font-black">START</div>
            <div className="text-2xl font-black">{live.start_time ?? "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
