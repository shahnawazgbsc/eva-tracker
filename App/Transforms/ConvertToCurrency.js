export default function (amount: number) {
  const format = new Intl.NumberFormat('en-US', {
    currency: 'PKR',
    style: 'currency',
    minimumFractionDigits: 2
  })
  return format.format(amount)
}
