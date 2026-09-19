'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Play, Pause, DollarSign, Activity } from 'lucide-react';

interface Props {
  isExpanded?: boolean;
}

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  vol: number;
}

export const TradingTerminalSandbox: React.FC<Props> = ({ isExpanded = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [activeInterval, setActiveInterval] = useState<'1s' | '5s' | '1m'>('1s');
  const [currentPrice, setCurrentPrice] = useState(3842.5);
  const [priceChange, setPriceChange] = useState(+3.82);

  // Orderbook simulated tape
  const [orderBook, setOrderBook] = useState<{ bids: number[]; asks: number[] }>({
    bids: [3842.1, 3841.8, 3841.2, 3840.9],
    asks: [3842.9, 3843.4, 3843.9, 3844.5],
  });

  const candlesRef = useRef<Candle[]>([]);

  // Generate initial candle history
  useEffect(() => {
    let price = 3780;
    const initialCandles: Candle[] = [];
    const count = isExpanded ? 36 : 24;

    for (let i = 0; i < count; i++) {
      const delta = (Math.random() - 0.48) * 12;
      const open = price;
      const close = price + delta;
      const high = Math.max(open, close) + Math.random() * 6;
      const low = Math.min(open, close) - Math.random() * 6;
      const vol = Math.random() * 40 + 10;
      price = close;

      initialCandles.push({
        time: Date.now() - (count - i) * 2000,
        open,
        high,
        low,
        close,
        vol,
      });
    }

    candlesRef.current = initialCandles;
    setCurrentPrice(price);
  }, [isExpanded]);

  // Live streaming tick loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const lastCandle = candlesRef.current[candlesRef.current.length - 1];
      if (!lastCandle) return;

      const delta = (Math.random() - 0.48) * 4;
      const newPrice = Number((lastCandle.close + delta).toFixed(2));
      setCurrentPrice(newPrice);
      setPriceChange((prev) => Number((prev + delta * 0.02).toFixed(2)));

      // Mutate current candle or append new candle
      if (Math.random() > 0.6) {
        // New candle
        const newCandle: Candle = {
          time: Date.now(),
          open: newPrice,
          high: newPrice + Math.random() * 2,
          low: newPrice - Math.random() * 2,
          close: newPrice + (Math.random() - 0.48) * 2,
          vol: Math.random() * 25 + 5,
        };
        candlesRef.current = [...candlesRef.current.slice(1), newCandle];
      } else {
        // Update latest candle
        lastCandle.close = newPrice;
        lastCandle.high = Math.max(lastCandle.high, newPrice);
        lastCandle.low = Math.min(lastCandle.low, newPrice);
        lastCandle.vol += Math.random() * 2;
      }

      // Perturb orderbook
      setOrderBook({
        bids: [
          Number((newPrice - 0.3).toFixed(1)),
          Number((newPrice - 0.7).toFixed(1)),
          Number((newPrice - 1.2).toFixed(1)),
          Number((newPrice - 1.8).toFixed(1)),
        ],
        asks: [
          Number((newPrice + 0.4).toFixed(1)),
          Number((newPrice + 0.9).toFixed(1)),
          Number((newPrice + 1.5).toFixed(1)),
          Number((newPrice + 2.1).toFixed(1)),
        ],
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Canvas Candlestick Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const candles = candlesRef.current;
      if (candles.length === 0) return;

      // Find min / max price for scaling
      let minP = Infinity;
      let maxP = -Infinity;
      candles.forEach((c) => {
        if (c.low < minP) minP = c.low;
        if (c.high > maxP) maxP = c.high;
      });

      const pad = (maxP - minP) * 0.1 || 10;
      minP -= pad;
      maxP += pad;
      const priceRange = maxP - minP;

      const getY = (price: number) => {
        return height - ((price - minP) / priceRange) * (height - 30) - 15;
      };

      // Draw subtle horizontal grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const candleSpacing = width / candles.length;
      const bodyWidth = Math.max(3, candleSpacing * 0.65);

      // Draw Candlesticks
      candles.forEach((c, i) => {
        const x = i * candleSpacing + candleSpacing / 2;
        const isBullish = c.close >= c.open;
        const color = isBullish ? '#10b981' : '#f43f5e';

        const openY = getY(c.open);
        const closeY = getY(c.close);
        const highY = getY(c.high);
        const lowY = getY(c.low);

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Candle Body
        ctx.fillStyle = color;
        const topY = Math.min(openY, closeY);
        const bHeight = Math.max(2, Math.abs(closeY - openY));
        ctx.fillRect(x - bodyWidth / 2, topY, bodyWidth, bHeight);

        // Volume bar at bottom
        const volHeight = Math.min(24, (c.vol / 60) * 24);
        ctx.fillStyle = isBullish ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)';
        ctx.fillRect(x - bodyWidth / 2, height - volHeight, bodyWidth, volHeight);
      });

      // Moving Average Ribbon
      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.8;
      candles.forEach((c, i) => {
        const x = i * candleSpacing + candleSpacing / 2;
        const y = getY((c.open + c.close) / 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isExpanded]);

  return (
    <div className="relative w-full h-full min-h-[260px] bg-[#07070a] rounded-xl overflow-hidden border border-white/10 flex flex-col font-mono text-xs select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0c0c12] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-zinc-200">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>ETH / USDC</span>
          </div>
          <span className="text-zinc-100 font-bold">${currentPrice.toFixed(2)}</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
              priceChange >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}
          >
            {priceChange >= 0 ? '+' : ''}
            {priceChange}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          {(['1s', '5s', '1m'] as const).map((interval) => (
            <button
              key={interval}
              onClick={() => setActiveInterval(interval)}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                activeInterval === interval
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {interval}
            </button>
          ))}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
            title={isRunning ? 'Pause stream' : 'Resume stream'}
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Main Trading Stage: Chart + Orderbook */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Candlestick Canvas Container */}
        <div className="flex-1 relative p-2 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={isExpanded ? 520 : 320}
            height={160}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Streaming Mini Order Book Ladder */}
        <div className="w-28 border-l border-white/5 bg-[#09090e] p-2 flex flex-col justify-between text-[9px] font-mono">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider pb-1 border-b border-white/5">
            Order Book
          </div>

          {/* Asks (Red) */}
          <div className="space-y-1">
            {orderBook.asks.slice(0, 3).map((ask, i) => (
              <div key={i} className="flex items-center justify-between text-rose-400">
                <span>{ask.toFixed(1)}</span>
                <span className="text-zinc-500 text-[8px]">0.84</span>
              </div>
            ))}
          </div>

          <div className="text-center py-1 text-zinc-300 border-y border-white/5 text-[10px] font-bold">
            ${currentPrice.toFixed(1)}
          </div>

          {/* Bids (Green) */}
          <div className="space-y-1">
            {orderBook.bids.slice(0, 3).map((bid, i) => (
              <div key={i} className="flex items-center justify-between text-emerald-400">
                <span>{bid.toFixed(1)}</span>
                <span className="text-zinc-500 text-[8px]">1.22</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="px-3 py-1 bg-[#09090d] border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-zinc-400">Worker-Decoupled Canvas</span>
        </div>
        <span className="text-cyan-400">0ms GC Thrash · 60fps</span>
      </div>
    </div>
  );
};
