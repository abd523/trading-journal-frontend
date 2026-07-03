"use client";
import React, { useState, useEffect } from 'react';
import api from '../api';

interface Trade {
  id: number;
  symbol: string;
  side: string;
  entry_price: string;
  exit_price: string;
  quantity: string;
  fees: string;
  pnl: string;
  notes: string;
  opened_at: string;
}

export default function JournalPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [side, setSide] = useState('BUY');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  // Fetch all user ledger entries from our local Django server
  const fetchTrades = async () => {
    try {
      const response = await api.get('/trades/');
      setTrades(response.data);
    } catch (err) {
      console.error("Error loading trades ledger:", err);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  // Submit a new logged entry down to the database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/trades/', {
        symbol,
        side,
        entry_price: entryPrice,
        exit_price: exitPrice || null,
        quantity,
        notes,
        opened_at: new Date().toISOString(),
      });
      // Clear out entry states
      setEntryPrice('');
      setExitPrice('');
      setQuantity('');
      setNotes('');
      fetchTrades(); // Refresh list automatically
    } catch (err) {
      alert("Failed to submit trade. Verify backend authentication context.");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-white">Manual Trading Psychology Journal</h2>

      {/* Manual Data Entry Log Form */}
      <form onSubmit={handleSubmit} className="bg-[#161a1e] p-6 rounded-xl border border-[#2b3139] grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">MARKET SYMBOL</label>
          <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} className="w-full bg-[#0b0e11] border border-[#2b3139] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f0b90b]" required />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">DIRECTION SIDE</label>
          <select value={side} onChange={(e) => setSide(e.target.value)} className="w-full bg-[#0b0e11] border border-[#2b3139] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f0b90b]">
            <option value="BUY">Long / Buy</option>
            <option value="SELL">Short / Sell</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">EXECUTION QUANTITY</label>
          <input type="number" step="any" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full bg-[#0b0e11] border border-[#2b3139] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f0b90b]" required />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">ENTRY PRICE (USD)</label>
          <input type="number" step="any" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} className="w-full bg-[#0b0e11] border border-[#2b3139] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f0b90b]" required />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">EXIT PRICE (USD)</label>
          <input type="number" step="any" value={exitPrice} onChange={(e) => setExitPrice(e.target.value)} className="w-full bg-[#0b0e11] border border-[#2b3139] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f0b90b]" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">JOURNAL PSYCHOLOGY NOTES</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Swept liquidity, stable emotions" className="w-full bg-[#0b0e11] border border-[#2b3139] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#f0b90b]" />
        </div>
        <div className="md:col-span-3 pt-2">
          <button type="submit" className="w-full bg-[#f0b90b] hover:bg-[#d4a307] text-black font-bold py-2 rounded text-sm transition">
            Log Executed Record into Ledger
          </button>
        </div>
      </form>

      {/* Historic Journal Ledger Table View */}
      <div className="bg-[#161a1e] rounded-xl border border-[#2b3139] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#2b3139] text-xs text-gray-400 uppercase">
              <th className="px-6 py-3 font-medium">Market</th>
              <th className="px-6 py-3 font-medium">Side</th>
              <th className="px-6 py-3 font-medium">Size</th>
              <th className="px-6 py-3 font-medium">Entry / Exit</th>
              <th className="px-6 py-3 font-medium">Net PnL Return</th>
              <th className="px-6 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2b3139] text-sm text-gray-300">
            {trades.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No trading journal logs found. Submit an execution above!</td>
              </tr>
            ) : (
              trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-[#1f242a] transition">
                  <td className="px-6 py-4 font-bold text-white">{trade.symbol}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${trade.side === 'BUY' ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'}`}>
                      {trade.side}
                    </span>
                  </td>
                  <td className="px-6 py-4">{trade.quantity}</td>
                  <td className="px-6 py-4">${parseFloat(trade.entry_price).toFixed(2)} / ${trade.exit_price ? parseFloat(trade.exit_price).toFixed(2) : 'Open'}</td>
                  <td className={`px-6 py-4 font-bold ${parseFloat(trade.pnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(trade.pnl) >= 0 ? '+' : ''}${parseFloat(trade.pnl).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 italic max-w-xs truncate">{trade.notes || 'No review logged'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}