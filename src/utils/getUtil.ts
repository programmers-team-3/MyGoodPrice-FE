export default function formatPrice(price: number) {
  return `${Intl.NumberFormat('ko-KR').format(price)}원`;
}
