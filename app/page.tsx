'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

// Mock data for CPI - last five years
const cpiData = [
  { date: '2020-01', value: 257.971 },
  { date: '2020-04', value: 256.389 },
  { date: '2020-07', value: 259.101 },
  { date: '2020-10', value: 260.388 },
  { date: '2021-01', value: 261.582 },
  { date: '2021-04', value: 267.054 },
  { date: '2021-07', value: 272.789 },
  { date: '2021-10', value: 277.948 },
  { date: '2022-01', value: 281.933 },
  { date: '2022-04', value: 289.109 },
  { date: '2022-07', value: 296.276 },
  { date: '2022-10', value: 298.012 },
  { date: '2023-01', value: 300.536 },
  { date: '2023-04', value: 304.127 },
  { date: '2023-07', value: 307.026 },
  { date: '2023-10', value: 307.671 },
  { date: '2024-01', value: 310.326 },
  { date: '2024-04', value: 313.548 },
  { date: '2024-07', value: 314.540 },
  { date: '2024-10', value: 315.625 },
];

// Mock data for Labor Statistics - Unemployment Rate
const laborData = [
  { date: '2020-01', value: 3.5 },
  { date: '2020-04', value: 14.7 },
  { date: '2020-07', value: 10.2 },
  { date: '2020-10', value: 6.9 },
  { date: '2021-01', value: 6.3 },
  { date: '2021-04', value: 6.1 },
  { date: '2021-07', value: 5.4 },
  { date: '2021-10', value: 4.6 },
  { date: '2022-01', value: 4.0 },
  { date: '2022-04', value: 3.6 },
  { date: '2022-07', value: 3.5 },
  { date: '2022-10', value: 3.7 },
  { date: '2023-01', value: 3.4 },
  { date: '2023-04', value: 3.4 },
  { date: '2023-07', value: 3.8 },
  { date: '2023-10', value: 3.7 },
  { date: '2024-01', value: 3.7 },
  { date: '2024-04', value: 3.9 },
  { date: '2024-07', value: 4.3 },
  { date: '2024-10', value: 4.1 },
];

// Mock data for Interest Rates - 10-Year
const interestRates10Year = [
  { date: '2020-01', value: 1.64 },
  { date: '2020-04', value: 0.64 },
  { date: '2020-07', value: 0.55 },
  { date: '2020-10', value: 0.88 },
  { date: '2021-01', value: 1.11 },
  { date: '2021-04', value: 1.63 },
  { date: '2021-07', value: 1.25 },
  { date: '2021-10', value: 1.55 },
  { date: '2022-01', value: 1.78 },
  { date: '2022-04', value: 2.89 },
  { date: '2022-07', value: 2.65 },
  { date: '2022-10', value: 4.05 },
  { date: '2023-01', value: 3.51 },
  { date: '2023-04', value: 3.47 },
  { date: '2023-07', value: 3.96 },
  { date: '2023-10', value: 4.93 },
  { date: '2024-01', value: 4.14 },
  { date: '2024-04', value: 4.62 },
  { date: '2024-07', value: 4.24 },
  { date: '2024-10', value: 4.28 },
];

// Mock data for Interest Rates - 3-Month
const interestRates3Month = [
  { date: '2020-01', value: 1.57 },
  { date: '2020-04', value: 0.12 },
  { date: '2020-07', value: 0.10 },
  { date: '2020-10', value: 0.09 },
  { date: '2021-01', value: 0.07 },
  { date: '2021-04', value: 0.02 },
  { date: '2021-07', value: 0.05 },
  { date: '2021-10', value: 0.05 },
  { date: '2022-01', value: 0.21 },
  { date: '2022-04', value: 0.89 },
  { date: '2022-07', value: 2.18 },
  { date: '2022-10', value: 4.02 },
  { date: '2023-01', value: 4.64 },
  { date: '2023-04', value: 5.07 },
  { date: '2023-07', value: 5.50 },
  { date: '2023-10', value: 5.50 },
  { date: '2024-01', value: 5.42 },
  { date: '2024-04', value: 5.36 },
  { date: '2024-07', value: 5.27 },
  { date: '2024-10', value: 4.64 },
];

interface ChartCardProps {
  title: string;
  data: Array<{ date: string; value: number }>;
  color: string;
  subtitle: string;
}

function ChartCard({ title, data, color, subtitle }: ChartCardProps) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="text-sm font-bold mb-1">{title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-xs">FRED</span>
          <span className="text-xs text-gray-600">{subtitle}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6B7280', fontSize: 10 }}
            stroke="#E5E7EB"
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6B7280', fontSize: 10 }}
            stroke="#E5E7EB"
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 text-xs text-gray-500">
        <p>Source: Organization for Economic Co-operation and Development via FRED®</p>
        <p className="text-blue-600 italic">Shaded areas indicate U.S. recessions.</p>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <span className="text-xs text-gray-600">fred.stlouisfed.org</span>
        <button className="text-xs text-blue-600 border border-blue-600 px-2 py-1 rounded">
          Fullscreen ⛶
        </button>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
}

function NavItem({ icon, label, isActive = false, hasDropdown = false }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      {hasDropdown && (
        <span className="text-sm">{isActive ? '⌄' : '›'}</span>
      )}
    </button>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">FRED Indicators</h1>
          <p className="text-sm text-gray-600 mt-1">Economic Data Dashboard</p>
        </div>

        <nav className="flex-1">
          <NavItem icon="📊" label="Key Indicators" isActive={true} hasDropdown={true} />
          <NavItem icon="📈" label="Inflation" hasDropdown={true} />
          <NavItem icon="💼" label="Employment" hasDropdown={true} />
          <NavItem icon="📉" label="Interest Rates" hasDropdown={true} />
          <NavItem icon="📈" label="Economic Growth" hasDropdown={true} />
          <NavItem icon="🌐" label="Exchange Rates" hasDropdown={true} />
          <NavItem icon="🏠" label="Housing" hasDropdown={true} />
          <NavItem icon="🛒" label="Consumer Spending" hasDropdown={true} />
        </nav>

        <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
          Data provided by Federal Reserve Economic Data (FRED)
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Economic Indicators Dashboard
            </h1>
            <p className="text-gray-600">
              Real-time economic data from the Federal Reserve Economic Data (FRED) system
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <ChartCard
              title="CPI - last five years"
              subtitle="Consumer Price Index: All Items: Total for United States"
              data={cpiData}
              color="#1E40AF"
            />
            <ChartCard
              title="Infra-Annual Labor Statistics: Unemployment Rate Total"
              subtitle="Infra-Annual Labor Statistics: Unemployment Rate Total: From 15 to 64 Years for United States"
              data={laborData}
              color="#1E40AF"
            />
            <ChartCard
              title="Interest Rates: Long-Term Government Bond Yields: 10-Year"
              subtitle="Interest Rates: Long-Term Government Bond Yields: 10-Year: Main (Including Benchmark) for United States"
              data={interestRates10Year}
              color="#1E40AF"
            />
            <ChartCard
              title="Interest Rates: 3-Month or 90-Day Rates and Yields"
              subtitle="Interest Rates: 3-Month or 90-Day Rates and Yields: Interbank Rates: Total for United States"
              data={interestRates3Month}
              color="#1E40AF"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
