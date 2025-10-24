export const FRED_SERIES_IDS = {
  CPI: 'CPIAUCSL', // Consumer Price Index for All Urban Consumers: All Items
  UNEMPLOYMENT: 'LRUNTTTTUSQ156S', // Infra-Annual Labor Statistics: Unemployment Rate Total
  TREASURY_10Y: 'IRLTLT01USM156N', // Interest Rates: Long-Term Government Bond Yields: 10-Year
  TREASURY_3M: 'IR3TIB01USM156N', // Interest Rates: 3-Month or 90-Day Rates and Yields
} as const;

export interface FredObservation {
  date: string;
  value: number;
}

export interface FredResponse {
  observations: FredObservation[];
}

export async function fetchFredData(
  seriesId: string,
  startDate?: string,
  endDate?: string
): Promise<FredObservation[]> {
  const params = new URLSearchParams({
    series_id: seriesId,
  });

  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);

  try {
    const response = await fetch(`/api/fred?${params}`);

    if (!response.ok) {
      console.error('FRED API error:', response.status);
      return getMockData(seriesId);
    }

    const data: FredResponse = await response.json();
    return data.observations;
  } catch (error) {
    console.error('Error fetching FRED data:', error);
    return getMockData(seriesId);
  }
}

// Mock data fallback for development
function getMockData(seriesId: string): FredObservation[] {
  const mockDataMap: Record<string, FredObservation[]> = {
    [FRED_SERIES_IDS.CPI]: [
      { date: '2020-01-01', value: 257.971 },
      { date: '2020-04-01', value: 256.389 },
      { date: '2020-07-01', value: 259.101 },
      { date: '2020-10-01', value: 260.388 },
      { date: '2021-01-01', value: 261.582 },
      { date: '2021-04-01', value: 267.054 },
      { date: '2021-07-01', value: 272.789 },
      { date: '2021-10-01', value: 277.948 },
      { date: '2022-01-01', value: 281.933 },
      { date: '2022-04-01', value: 289.109 },
      { date: '2022-07-01', value: 296.276 },
      { date: '2022-10-01', value: 298.012 },
      { date: '2023-01-01', value: 300.536 },
      { date: '2023-04-01', value: 304.127 },
      { date: '2023-07-01', value: 307.026 },
      { date: '2023-10-01', value: 307.671 },
      { date: '2024-01-01', value: 310.326 },
      { date: '2024-04-01', value: 313.548 },
      { date: '2024-07-01', value: 314.540 },
      { date: '2024-10-01', value: 315.625 },
    ],
    [FRED_SERIES_IDS.UNEMPLOYMENT]: [
      { date: '2020-01-01', value: 3.5 },
      { date: '2020-04-01', value: 14.7 },
      { date: '2020-07-01', value: 10.2 },
      { date: '2020-10-01', value: 6.9 },
      { date: '2021-01-01', value: 6.3 },
      { date: '2021-04-01', value: 6.1 },
      { date: '2021-07-01', value: 5.4 },
      { date: '2021-10-01', value: 4.6 },
      { date: '2022-01-01', value: 4.0 },
      { date: '2022-04-01', value: 3.6 },
      { date: '2022-07-01', value: 3.5 },
      { date: '2022-10-01', value: 3.7 },
      { date: '2023-01-01', value: 3.4 },
      { date: '2023-04-01', value: 3.4 },
      { date: '2023-07-01', value: 3.8 },
      { date: '2023-10-01', value: 3.7 },
      { date: '2024-01-01', value: 3.7 },
      { date: '2024-04-01', value: 3.9 },
      { date: '2024-07-01', value: 4.3 },
      { date: '2024-10-01', value: 4.1 },
    ],
    [FRED_SERIES_IDS.TREASURY_10Y]: [
      { date: '2020-01-01', value: 1.64 },
      { date: '2020-04-01', value: 0.64 },
      { date: '2020-07-01', value: 0.55 },
      { date: '2020-10-01', value: 0.88 },
      { date: '2021-01-01', value: 1.11 },
      { date: '2021-04-01', value: 1.63 },
      { date: '2021-07-01', value: 1.25 },
      { date: '2021-10-01', value: 1.55 },
      { date: '2022-01-01', value: 1.78 },
      { date: '2022-04-01', value: 2.89 },
      { date: '2022-07-01', value: 2.65 },
      { date: '2022-10-01', value: 4.05 },
      { date: '2023-01-01', value: 3.51 },
      { date: '2023-04-01', value: 3.47 },
      { date: '2023-07-01', value: 3.96 },
      { date: '2023-10-01', value: 4.93 },
      { date: '2024-01-01', value: 4.14 },
      { date: '2024-04-01', value: 4.62 },
      { date: '2024-07-01', value: 4.24 },
      { date: '2024-10-01', value: 4.28 },
    ],
    [FRED_SERIES_IDS.TREASURY_3M]: [
      { date: '2020-01-01', value: 1.57 },
      { date: '2020-04-01', value: 0.12 },
      { date: '2020-07-01', value: 0.10 },
      { date: '2020-10-01', value: 0.09 },
      { date: '2021-01-01', value: 0.07 },
      { date: '2021-04-01', value: 0.02 },
      { date: '2021-07-01', value: 0.05 },
      { date: '2021-10-01', value: 0.05 },
      { date: '2022-01-01', value: 0.21 },
      { date: '2022-04-01', value: 0.89 },
      { date: '2022-07-01', value: 2.18 },
      { date: '2022-10-01', value: 4.02 },
      { date: '2023-01-01', value: 4.64 },
      { date: '2023-04-01', value: 5.07 },
      { date: '2023-07-01', value: 5.50 },
      { date: '2023-10-01', value: 5.50 },
      { date: '2024-01-01', value: 5.42 },
      { date: '2024-04-01', value: 5.36 },
      { date: '2024-07-01', value: 5.27 },
      { date: '2024-10-01', value: 4.64 },
    ],
  };

  return mockDataMap[seriesId] || [];
}
