import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coin Market Manager Clone",
  description: "Track your crypto balances and trading psychology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen overflow-hidden">
        {/* SIDEBAR NAVIGATION PANEL */}
        <aside className="w-64 bg-[#161a1e] border-r border-[#2b3139] flex flex-col justify-between p-4">
          <div>
            <div className="text-xl font-bold text-[#f0b90b] tracking-wide mb-8 px-2">
              🪙 COINMARKET
            </div>
            <nav className="space-y-2">
              <a href="/" className="block px-4 py-2.5 rounded-lg bg-[#2b3139] text-white font-medium transition">
                📈 Dashboard Overview
              </a>
              <a href="/journal" className="block px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#2b3139] hover:text-white transition">
                📓 Trade Journal
              </a>
              <a href="/exchanges" className="block px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#2b3139] hover:text-white transition">
                🔑 API Keys Manager
              </a>
            </nav>
          </div>
          <div className="border-t border-[#2b3139] pt-4 px-2 text-xs text-gray-500">
            Status: Connected (Local)
          </div>
        </aside>

        {/* MAIN DISPLAY HUB */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#0b0e11]">
          {/* Top Metric Header Strip */}
          <header className="h-16 border-b border-[#2b3139] bg-[#161a1e] flex items-center justify-between px-8">
            <div className="flex space-x-8">
              <div>
                <span className="text-xs text-gray-400 block">TOTAL VALUE</span>
                <span className="text-sm font-bold text-green-400">$53,420.00</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">BTC EQUITY</span>
                <span className="text-sm font-bold text-white">0.8942 BTC</span>
              </div>
            </div>
            <button className="bg-[#f0b90b] hover:bg-[#d4a307] text-black font-bold px-4 py-1.5 rounded text-sm transition">
              Sync Exchanges
            </button>
          </header>

          {/* Interactive Content Area */}
          <div className="p-8 flex-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}