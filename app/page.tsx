'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFredData } from '@/hooks/useFredData';
import { FRED_SERIES_IDS } from '@/lib/fred-api';

interface ChartCardProps {
  title: string;
  data: Array<{ date: string; value: number }>;
  color: string;
  subtitle: string;
  loading?: boolean;
}

function ChartCard({ title, data, color, subtitle, loading = false }: ChartCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="text-sm font-bold mb-1">{title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-xs">FRED</span>
          <span className="text-xs text-gray-600">{subtitle}</span>
        </div>
      </div>

      {loading ? (
        <div className="h-[180px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6B7280', fontSize: 10 }}
              stroke="#E5E7EB"
              tickLine={false}
              tickFormatter={formatDate}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 10 }}
              stroke="#E5E7EB"
              tickLine={false}
            />
            <Tooltip
              labelFormatter={formatDate}
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
      )}

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
  // Calculate date range for last 5 years
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 5);

  const dateRange = {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0]
  };

  // Fetch real FRED data
  const { data: cpiData, loading: cpiLoading } = useFredData(
    FRED_SERIES_IDS.CPI,
    dateRange.start,
    dateRange.end
  );

  const { data: laborData, loading: laborLoading } = useFredData(
    FRED_SERIES_IDS.UNEMPLOYMENT,
    dateRange.start,
    dateRange.end
  );

  const { data: interestRates10YearData, loading: rates10YLoading } = useFredData(
    FRED_SERIES_IDS.TREASURY_10Y,
    dateRange.start,
    dateRange.end
  );

  const { data: interestRates3MonthData, loading: rates3MLoading } = useFredData(
    FRED_SERIES_IDS.TREASURY_3M,
    dateRange.start,
    dateRange.end
  );

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
              loading={cpiLoading}
            />
            <ChartCard
              title="Infra-Annual Labor Statistics: Unemployment Rate Total"
              subtitle="Infra-Annual Labor Statistics: Unemployment Rate Total: From 15 to 64 Years for United States"
              data={laborData}
              color="#1E40AF"
              loading={laborLoading}
            />
            <ChartCard
              title="Interest Rates: Long-Term Government Bond Yields: 10-Year"
              subtitle="Interest Rates: Long-Term Government Bond Yields: 10-Year: Main (Including Benchmark) for United States"
              data={interestRates10YearData}
              color="#1E40AF"
              loading={rates10YLoading}
            />
            <ChartCard
              title="Interest Rates: 3-Month or 90-Day Rates and Yields"
              subtitle="Interest Rates: 3-Month or 90-Day Rates and Yields: Interbank Rates: Total for United States"
              data={interestRates3MonthData}
              color="#1E40AF"
              loading={rates3MLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
