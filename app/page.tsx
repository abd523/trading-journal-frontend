"use html";

export default function DashboardHome() {
  // Mock asset balance allocations matching our data structures
  const assets = [
    { name: "Bitcoin", ticker: "BTC", type: "SPOT", amount: "0.523", value: 31380.00, allocation: "58.7%" },
    { name: "Ethereum", ticker: "ETH", type: "SPOT", amount: "4.500", value: 12040.00, allocation: "22.5%" },
    { name: "Solana Perps", ticker: "SOL", type: "FUTURES", amount: "75.0", value: 10000.00, allocation: "18.8%" },
  ];

  return (
    <div className="space-y-6">
      {/* Upper Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#161a1e] p-6 rounded-xl border border-[#2b3139] col-span-2">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Portfolio Allocation</h3>
          <div className="h-40 flex items-center justify-center border border-dashed border-[#2b3139] rounded-lg bg-[#0b0e11]">
            <span className="text-xs text-gray-500">[Allocation Chart Donut - Spot (81.2%) vs Futures (18.8%)]</span>
          </div>
        </div>

        <div className="bg-[#161a1e] p-6 rounded-xl border border-[#2b3139] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Performance Account Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Deposits:</span><span className="font-semibold text-gray-300">$18,500</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Withdrawals:</span><span className="font-semibold text-gray-300">$3,500</span></div>
            </div>
          </div>
          <div className="border-t border-[#2b3139] pt-4 mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-400">Net Return PnL:</span>
            <span className="text-xl font-bold text-green-400">+$38,420.00</span>
          </div>
        </div>
      </div>

      {/* Main Balances Data Grid Table */}
      <div className="bg-[#161a1e] rounded-xl border border-[#2b3139] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2b3139]">
          <h3 className="text-sm font-semibold text-white">Balances Ledger Data Grid</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#2b3139] text-xs text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3 font-medium">Asset Name</th>
              <th className="px-6 py-3 font-medium">Wallet Type</th>
              <th className="px-6 py-3 font-medium">Units</th>
              <th className="px-6 py-3 font-medium">Net Value (USD)</th>
              <th className="px-6 py-3 font-medium">Allocation %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2b3139] text-sm text-gray-300">
            {assets.map((asset, index) => (
              <tr key={index} className="hover:bg-[#1f242a] transition">
                <td className="px-6 py-4 font-bold text-white">{asset.name} ({asset.ticker})</td>
                <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded text-xs ${asset.type === 'SPOT' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}`}>{asset.type}</span></td>
                <td className="px-6 py-4">{asset.amount}</td>
                <td className="px-6 py-4 font-medium text-white">${asset.value.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="px-6 py-4 text-[#f0b90b] font-medium">{asset.allocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}