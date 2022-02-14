export function generateSku(productName: string, color: string, size: string) {
  return `${productName
    .split(' ')
    .map((w) => w[0].toUpperCase())
    .join('')}-${color.substring(0, 3).toUpperCase()}-${size
    .substring(0, 3)
    .toUpperCase()}-${Math.floor(Math.random() * 100)}`;
}
