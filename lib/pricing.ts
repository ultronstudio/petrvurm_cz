export const BASE_HOURLY_RATE = 800;

export function calculateLocalServicePrice(basePrice: number, distanceCoefficient = 1): number {
  return Math.round((basePrice * distanceCoefficient) / 100) * 100;
}

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat('cs-CZ').format(value)} Kč`;
}

export function formatFromPrice(value: number): string {
  return `od ${formatPrice(value)}`;
}
