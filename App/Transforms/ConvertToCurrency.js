export default function (amount: number) {
  return Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(amount)
}
