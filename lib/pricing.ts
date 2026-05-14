export const GLOBAL_PRICE_COEFFICIENT = 1.05;

export const BASE_HOURLY_RATE = 350;
export const BASE_PROJECT_RATES = {
  simpleWeb: 3500,
  standardWeb: 8000,
  shop: 15000,
  webApp: 30000,
};

export const DEFAULT_DISTANCE_COEFFICIENT = 1.1;

export function calculatePrice(basePrice: number, distanceCoefficient = 1): number {
  return Math.round(basePrice * GLOBAL_PRICE_COEFFICIENT * distanceCoefficient);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('cs-CZ').format(value) + ' Kč';
}
