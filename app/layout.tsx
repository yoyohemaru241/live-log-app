import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIVE×LIFE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-black text-white">
        {/* ページ本体 */}
        <div className="pb-24">{children}</div>

        {/* 固定フッターナビ */}
        <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-black/80 backdrop-blur">
          <div className="mx-auto max-w-md grid grid-cols-3">
            <Link
              href="/"
              className="py-4 text-center font-black tracking-widest hover:text-lime-400 transition"
            >
              HOME
            </Link>

            <Link
              href="/history"
              className="py-4 text-center font-black tracking-widest hover:text-lime-400 transition"
            >
              HISTORY
            </Link>

            <form action="/logout" method="post">
              <button className="w-full py-4 text-center font-black tracking-widest hover:text-lime-400 transition">
                LOGOUT
              </button>
            </form>
          </div>
        </nav>
      </body>
    </html>
  );
}
