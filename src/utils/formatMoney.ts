export function formatMoney(value: number): string {
  const formatter = new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
}
