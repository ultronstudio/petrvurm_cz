export const BASE_HOURLY_RATE = 800;

export const BASE_PROJECT_RATES = {
  webStart: 15_000,
  businessWeb: 25_000,
  cmsWeb: 35_000,
  shop: 40_000,
  webApp: 60_000,
} as const;

export function calculateLocalServicePrice(basePrice: number, distanceCoefficient = 1): number {
  return Math.round((basePrice * distanceCoefficient) / 100) * 100;
}

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat('cs-CZ').format(value)} Kč`;
}

export function formatFromPrice(value: number): string {
  return `od ${formatPrice(value)}`;
}
